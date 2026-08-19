import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;color:#555;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
}

interface InstallmentPayload {
  documentNo: string;
  supportAmount: string;
  adminFeeTotal: string;
  preDeliveryAmount: string;
  postDeliveryAmount: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  signature: string;
  signDate: string;
  printName: string;
  electronicSignConfirm: boolean;
}

function validate(body: unknown): { payload: InstallmentPayload } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Please complete every field, sign electronically, and confirm the agreement box.' };
  }
  const o = body as Record<string, unknown>;
  const payload: InstallmentPayload = {
    documentNo: str(o.documentNo),
    supportAmount: str(o.supportAmount),
    adminFeeTotal: str(o.adminFeeTotal),
    preDeliveryAmount: str(o.preDeliveryAmount),
    postDeliveryAmount: str(o.postDeliveryAmount),
    fullName: str(o.fullName),
    address: str(o.address),
    phone: str(o.phone),
    email: str(o.email),
    signature: str(o.signature),
    signDate: str(o.signDate),
    printName: str(o.printName),
    electronicSignConfirm:
      o.electronicSignConfirm === true || o.electronicSignConfirm === 'on' || o.electronicSignConfirm === 'true',
  };

  const missing: string[] = [];
  if (!payload.fullName) missing.push('full name');
  if (!payload.phone) missing.push('telephone');
  if (!payload.email) missing.push('email');
  if (!payload.signature) missing.push('electronic signature');
  if (!payload.signDate) missing.push('date signed');
  if (!payload.printName) missing.push('printed name');
  if (!payload.electronicSignConfirm) missing.push('the confirmation checkbox at the bottom');

  if (missing.length) {
    return { error: `Please complete: ${missing.join(', ')}.` };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (payload.signature.toLowerCase() !== payload.fullName.toLowerCase()) {
    return { error: `Electronic signature must match your full legal name: ${payload.fullName}.` };
  }
  if (payload.printName.toLowerCase() !== payload.fullName.toLowerCase()) {
    return { error: `Printed name must match your full legal name: ${payload.fullName}.` };
  }

  if (!payload.documentNo) payload.documentNo = 'ECF-INST';
  if (!payload.supportAmount) payload.supportAmount = 'To be confirmed';
  if (!payload.adminFeeTotal) payload.adminFeeTotal = 'To be confirmed';
  if (!payload.preDeliveryAmount) payload.preDeliveryAmount = 'To be confirmed';
  if (!payload.postDeliveryAmount) payload.postDeliveryAmount = 'To be confirmed';
  if (!payload.address) payload.address = 'On file';

  return { payload };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Could not read the form. Please try again.' }, { status: 400 });
  }

  const parsed = validate(body);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { payload } = parsed;

  if (!zohoUser || !zohoPass) {
    return NextResponse.json({ error: 'Submission is temporarily unavailable. Please try again later.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user: zohoUser, pass: zohoPass },
  });

  const operatorHtml = `
    <h2>Installment Payment Agreement — Submitted Online</h2>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      ${row('Document No.', payload.documentNo)}
      ${row('Support amount', payload.supportAmount)}
      ${row('Total administrative fee', payload.adminFeeTotal)}
      ${row('Pre-delivery installment', payload.preDeliveryAmount)}
      ${row('Post-delivery balance', payload.postDeliveryAmount)}
      ${row('Full name', payload.fullName)}
      ${row('Address', payload.address)}
      ${row('Phone', payload.phone)}
      ${row('Email', payload.email)}
      ${row('Electronic signature', payload.signature)}
      ${row('Date signed', payload.signDate)}
      ${row('Printed name', payload.printName)}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via https://www.edwinmega.com/documents/installment-agreement-donna.html</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: payload.email,
      subject: `[Installment Agreement] ${payload.fullName} — ${payload.supportAmount}`,
      text: `Installment agreement submitted — ${payload.fullName}\nEmail: ${payload.email}\nAmount: ${payload.supportAmount}\nPre-delivery: ${payload.preDeliveryAmount}\nSignature: ${payload.signature}`,
      html: operatorHtml,
    });

    await transporter.sendMail({
      from: `"Michael Freedman, Edwin Castro Foundation" <${zohoUser}>`,
      to: payload.email,
      replyTo: toEmail || zohoUser,
      subject: 'Installment agreement received — Edwin Castro Foundation',
      html: `
        <p>Dear ${escapeHtml(payload.fullName)},</p>
        <p>We have received your signed Installment Payment Agreement for the Edwin Castro Foundation.</p>
        <p>Support amount on file: <strong>${escapeHtml(payload.supportAmount)}</strong><br/>
        Total administrative fee: <strong>${escapeHtml(payload.adminFeeTotal)}</strong><br/>
        Pre-delivery installment: <strong>${escapeHtml(payload.preDeliveryAmount)}</strong><br/>
        Post-delivery balance: <strong>${escapeHtml(payload.postDeliveryAmount)}</strong><br/>
        Date signed: <strong>${escapeHtml(payload.signDate)}</strong></p>
        <p>Michael Freedman, your Support Coordinator, will email you on this thread with pre-delivery payment instructions and your installment schedule options.</p>
        <p>Michael Freedman<br/>Support Coordinator<br/>Edwin Castro Foundation<br/>${escapeHtml(toEmail || zohoUser || '')}</p>
      `,
      text: `Dear ${payload.fullName},\n\nWe have received your Installment Payment Agreement for ${payload.supportAmount}. Michael Freedman will email you with pre-delivery payment instructions.\n\nEdwin Castro Foundation`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Installment agreement submit error:', err);
    return NextResponse.json({ error: 'Could not submit your agreement. Please try again.' }, { status: 500 });
  }
}
