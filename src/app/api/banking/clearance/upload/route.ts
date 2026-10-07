import { NextResponse } from 'next/server';
import { requireSessionAccount } from '@/lib/banking/session';
import {
  CLEARANCE_MAX_BYTES,
  CLEARANCE_STEPS,
  type ClearanceStepId,
  uploadClearancePdf,
} from '@/lib/banking/clearance';

export async function POST(req: Request) {
  try {
    const session = await requireSessionAccount();
    if (!session) {
      return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
    }

    const form = await req.formData();
    const stepRaw = String(form.get('step') || '');
    const file = form.get('file');

    if (!CLEARANCE_STEPS.includes(stepRaw as ClearanceStepId)) {
      return NextResponse.json({ error: 'Invalid step.' }, { status: 400 });
    }
    const step = stepRaw as ClearanceStepId;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'PDF required.' }, { status: 400 });
    }
    if (file.size <= 0 || file.size > CLEARANCE_MAX_BYTES) {
      return NextResponse.json({ error: 'File too large.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const updated = await uploadClearancePdf({
      accountNumber: session.accountNumber,
      step,
      file: buffer,
      filename: file.name || `${step}.pdf`,
      contentType: file.type || 'application/pdf',
    });

    return NextResponse.json({ ok: true, step: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed.';
    console.error('[banking/clearance/upload]', err);
    const status =
      message.includes('not open') || message.includes('PDF') || message.includes('large')
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
