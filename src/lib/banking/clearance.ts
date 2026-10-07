import { normalizeAccountNumber } from '@/data/ecf-banking-seed';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export const CLEARANCE_STEPS = ['insurance', 'tax', 'completion'] as const;
export type ClearanceStepId = (typeof CLEARANCE_STEPS)[number];
export type ClearanceStatus = 'locked' | 'open' | 'pending' | 'verified' | 'rejected';

export const CLEARANCE_STEP_LABELS: Record<ClearanceStepId, string> = {
  insurance: 'Insurance',
  tax: 'Tax',
  completion: 'Certificate of Completion',
};

export const CLEARANCE_BUCKET = 'ecf-bank-clearance';
export const CLEARANCE_MAX_BYTES = 10 * 1024 * 1024;

export type ClearanceStep = {
  step: ClearanceStepId;
  label: string;
  status: ClearanceStatus;
  originalFilename?: string | null;
  uploadedAt?: string | null;
  verifiedAt?: string | null;
  hasDocument: boolean;
};

type ClearanceRow = {
  account_number: string;
  step: ClearanceStepId;
  status: ClearanceStatus;
  document_path: string | null;
  original_filename: string | null;
  uploaded_at: string | null;
  verified_at: string | null;
  verified_by: string | null;
};

function nextStep(step: ClearanceStepId): ClearanceStepId | null {
  const i = CLEARANCE_STEPS.indexOf(step);
  if (i < 0 || i >= CLEARANCE_STEPS.length - 1) return null;
  return CLEARANCE_STEPS[i + 1];
}

function priorSteps(step: ClearanceStepId): ClearanceStepId[] {
  const i = CLEARANCE_STEPS.indexOf(step);
  if (i <= 0) return [];
  return CLEARANCE_STEPS.slice(0, i);
}

async function assertPriorStepsVerified(accountNumber: string, step: ClearanceStepId): Promise<void> {
  for (const prior of priorSteps(step)) {
    const row = await getRow(accountNumber, prior);
    if (!row || row.status !== 'verified') {
      throw new Error('Complete the previous clearance step first.');
    }
  }
}

function isPdfUpload(filename: string, contentType: string): boolean {
  const type = (contentType || '').toLowerCase();
  const name = filename.toLowerCase();
  if (name.endsWith('.pdf')) return true;
  return type === 'application/pdf' || type === 'application/x-pdf';
}

function rowToStep(row: ClearanceRow): ClearanceStep {
  return {
    step: row.step,
    label: CLEARANCE_STEP_LABELS[row.step],
    status: row.status,
    originalFilename: row.original_filename,
    uploadedAt: row.uploaded_at,
    verifiedAt: row.verified_at,
    hasDocument: Boolean(row.document_path),
  };
}

export async function ensureClearanceSteps(accountNumber: string): Promise<void> {
  const normalized = normalizeAccountNumber(accountNumber);
  if (!normalized) return;
  const sb = getSupabaseAdmin();
  const { error } = await sb.from('ecf_bank_clearance_steps').upsert(
    [
      { account_number: normalized, step: 'insurance', status: 'open' },
      { account_number: normalized, step: 'tax', status: 'locked' },
      { account_number: normalized, step: 'completion', status: 'locked' },
    ],
    { onConflict: 'account_number,step', ignoreDuplicates: true }
  );
  if (error) throw error;
}

export async function getClearanceSteps(accountNumber: string): Promise<ClearanceStep[]> {
  const normalized = normalizeAccountNumber(accountNumber);
  await ensureClearanceSteps(normalized);
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_clearance_steps')
    .select('*')
    .eq('account_number', normalized);
  if (error) throw error;
  const rows = (data || []) as ClearanceRow[];
  const byStep = new Map(rows.map((r) => [r.step, r]));
  return CLEARANCE_STEPS.map((step) => {
    const row = byStep.get(step);
    if (!row) {
      return {
        step,
        label: CLEARANCE_STEP_LABELS[step],
        status: step === 'insurance' ? 'open' : 'locked',
        hasDocument: false,
      } satisfies ClearanceStep;
    }
    return rowToStep(row);
  });
}

export async function isClearanceComplete(accountNumber: string): Promise<boolean> {
  const steps = await getClearanceSteps(accountNumber);
  return steps.every((s) => s.status === 'verified');
}

export async function getClearanceSummary(accountNumber: string) {
  const steps = await getClearanceSteps(accountNumber);
  return {
    steps,
    complete: steps.every((s) => s.status === 'verified'),
  };
}

async function getRow(accountNumber: string, step: ClearanceStepId): Promise<ClearanceRow | null> {
  const normalized = normalizeAccountNumber(accountNumber);
  const { data, error } = await getSupabaseAdmin()
    .from('ecf_bank_clearance_steps')
    .select('*')
    .eq('account_number', normalized)
    .eq('step', step)
    .maybeSingle();
  if (error) throw error;
  return (data as ClearanceRow | null) || null;
}

export async function uploadClearancePdf(opts: {
  accountNumber: string;
  step: ClearanceStepId;
  file: Buffer;
  filename: string;
  contentType: string;
}): Promise<ClearanceStep> {
  const normalized = normalizeAccountNumber(opts.accountNumber);
  await ensureClearanceSteps(normalized);

  if (!CLEARANCE_STEPS.includes(opts.step)) {
    throw new Error('Invalid step.');
  }
  if (!isPdfUpload(opts.filename, opts.contentType)) {
    throw new Error('PDF only.');
  }
  if (opts.file.byteLength > CLEARANCE_MAX_BYTES) {
    throw new Error('File too large.');
  }

  await assertPriorStepsVerified(normalized, opts.step);

  const row = await getRow(normalized, opts.step);
  if (!row || (row.status !== 'open' && row.status !== 'rejected')) {
    throw new Error('This step is not open for upload.');
  }

  const safeName = opts.filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'document.pdf';
  const path = `${normalized}/${opts.step}/${Date.now()}-${safeName}`;
  const sb = getSupabaseAdmin();

  const { error: upErr } = await sb.storage.from(CLEARANCE_BUCKET).upload(path, opts.file, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (upErr) throw upErr;

  if (row.document_path && row.document_path !== path) {
    await sb.storage.from(CLEARANCE_BUCKET).remove([row.document_path]).catch(() => undefined);
  }

  const { error: updErr } = await sb
    .from('ecf_bank_clearance_steps')
    .update({
      status: 'pending',
      document_path: path,
      original_filename: safeName,
      uploaded_at: new Date().toISOString(),
      verified_at: null,
      verified_by: null,
      updated_at: new Date().toISOString(),
    })
    .eq('account_number', normalized)
    .eq('step', opts.step);
  if (updErr) throw updErr;

  const updated = await getRow(normalized, opts.step);
  if (!updated) throw new Error('Upload failed.');
  return rowToStep(updated);
}

export async function verifyClearanceStep(
  accountNumber: string,
  step: ClearanceStepId,
  verifiedBy = 'ecf-banking'
): Promise<ClearanceStep[]> {
  const normalized = normalizeAccountNumber(accountNumber);
  await ensureClearanceSteps(normalized);
  const row = await getRow(normalized, step);
  if (!row) throw new Error('Step not found.');
  if (row.status !== 'pending') {
    throw new Error('Step is not pending verification.');
  }
  if (!row.document_path) {
    throw new Error('No document uploaded.');
  }
  await assertPriorStepsVerified(normalized, step);

  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from('ecf_bank_clearance_steps')
    .update({
      status: 'verified',
      verified_at: new Date().toISOString(),
      verified_by: verifiedBy,
      updated_at: new Date().toISOString(),
    })
    .eq('account_number', normalized)
    .eq('step', step);
  if (error) throw error;

  const nxt = nextStep(step);
  if (nxt) {
    const nextRow = await getRow(normalized, nxt);
    if (nextRow && nextRow.status === 'locked') {
      const { error: openErr } = await sb
        .from('ecf_bank_clearance_steps')
        .update({ status: 'open', updated_at: new Date().toISOString() })
        .eq('account_number', normalized)
        .eq('step', nxt);
      if (openErr) throw openErr;
    }
  }

  return getClearanceSteps(normalized);
}

export async function rejectClearanceStep(
  accountNumber: string,
  step: ClearanceStepId
): Promise<ClearanceStep[]> {
  const normalized = normalizeAccountNumber(accountNumber);
  const row = await getRow(normalized, step);
  if (!row) throw new Error('Step not found.');
  if (row.status !== 'pending') {
    throw new Error('Only pending uploads can be rejected.');
  }

  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_clearance_steps')
    .update({
      status: 'rejected',
      verified_at: null,
      verified_by: null,
      updated_at: new Date().toISOString(),
    })
    .eq('account_number', normalized)
    .eq('step', step);
  if (error) throw error;

  return getClearanceSteps(normalized);
}

export async function openClearanceStep(
  accountNumber: string,
  step: ClearanceStepId
): Promise<ClearanceStep[]> {
  const normalized = normalizeAccountNumber(accountNumber);
  await ensureClearanceSteps(normalized);
  await assertPriorStepsVerified(normalized, step);
  const { error } = await getSupabaseAdmin()
    .from('ecf_bank_clearance_steps')
    .update({
      status: 'open',
      updated_at: new Date().toISOString(),
    })
    .eq('account_number', normalized)
    .eq('step', step);
  if (error) throw error;
  return getClearanceSteps(normalized);
}

export async function getClearanceDocumentPath(
  accountNumber: string,
  step: ClearanceStepId
): Promise<{ path: string; filename: string } | null> {
  const row = await getRow(normalizeAccountNumber(accountNumber), step);
  if (!row?.document_path) return null;
  return {
    path: row.document_path,
    filename: row.original_filename || `${step}.pdf`,
  };
}

export async function createSignedClearanceUrl(
  accountNumber: string,
  step: ClearanceStepId,
  expiresIn = 120
): Promise<string | null> {
  const doc = await getClearanceDocumentPath(accountNumber, step);
  if (!doc) return null;
  const { data, error } = await getSupabaseAdmin()
    .storage.from(CLEARANCE_BUCKET)
    .createSignedUrl(doc.path, expiresIn);
  if (error) throw error;
  return data?.signedUrl || null;
}
