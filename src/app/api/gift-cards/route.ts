import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const maxDuration = 60;

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
]);

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB per file
const MAX_FILES = 20;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  if (!zohoUser || !zohoPass) {
    console.error('ZOHO_USER or ZOHO_PASS not set');
    return NextResponse.json(
      { error: 'Upload is temporarily unavailable. Please try again later.' },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const fullName = String(form.get('fullName') || '').trim();
  const email = String(form.get('email') || '').trim();
  const claimRef = String(form.get('claimRef') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const notes = String(form.get('notes') || '').trim();
  const cardTypesRaw = String(form.get('cardTypes') || '').trim();
  const cardTypes = cardTypesRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  if (!fullName || !email || cardTypes.length === 0) {
    return NextResponse.json(
      { error: 'Name, email, and at least one gift card type are required.' },
      { status: 400 }
    );
  }

  const cardFiles = form.getAll('cardImages').filter((f): f is File => f instanceof File && f.size > 0);
  const receiptFiles = form.getAll('receiptImages').filter((f): f is File => f instanceof File && f.size > 0);

  if (cardFiles.length === 0) {
    return NextResponse.json(
      { error: 'Please upload or take a photo of at least one gift card.' },
      { status: 400 }
    );
  }
  if (receiptFiles.length === 0) {
    return NextResponse.json(
      { error: 'Please upload or take a photo of your purchase receipt.' },
      { status: 400 }
    );
  }

  const allFiles = [...cardFiles, ...receiptFiles];
  if (allFiles.length > MAX_FILES) {
    return NextResponse.json({ error: `Too many files (max ${MAX_FILES}).` }, { status: 400 });
  }

  for (const file of allFiles) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is too large (max 8MB per file).` },
        { status: 400 }
      );
    }
    const type = (file.type || '').toLowerCase();
    if (type && !ALLOWED_TYPES.has(type)) {
      return NextResponse.json(
        { error: `"${file.name}" type is not allowed. Use JPG, PNG, WEBP, or PDF.` },
        { status: 400 }
      );
    }
  }

  const attachments = await Promise.all(
    allFiles.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const isReceipt = index >= cardFiles.length;
      const prefix = isReceipt ? 'receipt' : 'gift-card';
      const safeName = file.name.replace(/[^\w.\-]+/g, '_').slice(0, 80) || `${prefix}.jpg`;
      return {
        filename: `${prefix}-${index + 1}-${safeName}`,
        content: buffer,
        contentType: file.type || 'application/octet-stream',
      };
    })
  );

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user: zohoUser, pass: zohoPass },
  });

  const subjectRef = claimRef || fullName;
  const html = `
    <h2>Gift card upload — claimant submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Claim / Ref:</strong> ${escapeHtml(claimRef || '—')}</p>
    <p><strong>Gift card types:</strong> ${escapeHtml(cardTypes.join(', '))}</p>
    <p><strong>Gift card photos:</strong> ${cardFiles.length}</p>
    <p><strong>Receipt photos:</strong> ${receiptFiles.length}</p>
    ${notes ? `<p><strong>Notes:</strong></p><p>${escapeHtml(notes)}</p>` : ''}
    <hr />
    <p style="color:#666;font-size:12px;">Submitted via edwinmega.com/upload-gift-cards — images attached.</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: email,
      subject: `[Gift Cards] ${cardTypes.join(' + ')} — ${subjectRef}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nRef: ${claimRef}\nTypes: ${cardTypes.join(', ')}\nCards: ${cardFiles.length}\nReceipts: ${receiptFiles.length}\n\n${notes}`,
      html,
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Gift card upload send error:', err);
    return NextResponse.json(
      { error: 'Could not submit your upload. Please try again.' },
      { status: 500 }
    );
  }
}
