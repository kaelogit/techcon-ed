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

interface AffidavitPayload {
  supportAmount: string;
  adminPaid: boolean;
  applicationDate: string;
  fullName: string;
  addressStreet: string;
  addressCity: string;
  addressCountry: string;
  phone: string;
  email: string;
  signature: string;
  signDate: string;
  printName: string;
  electronicSignConfirm: boolean;
}

function validate(body: unknown): { payload: AffidavitPayload } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Please complete every field, sign electronically, and confirm the agreement box.' };
  }
  const o = body as Record<string, unknown>;
  const payload: AffidavitPayload = {
    supportAmount: str(o.supportAmount),
    adminPaid: o.adminPaid === true,
    applicationDate: str(o.applicationDate),
    fullName: str(o.fullName),
    addressStreet: str(o.addressStreet),
    addressCity: str(o.addressCity),
    addressCountry: str(o.addressCountry),
    phone: str(o.phone),
    email: str(o.email),
    signature: str(o.signature),
    signDate: str(o.signDate),
    printName: str(o.printName),
    electronicSignConfirm: o.electronicSignConfirm === true || o.electronicSignConfirm === 'on' || o.electronicSignConfirm === 'true',
  };

  const missing: string[] = [];
  if (!payload.applicationDate) missing.push('application date');
  if (!payload.fullName) missing.push('full name');
  if (!payload.addressStreet) missing.push('street address');
  if (!payload.addressCity) missing.push('city / state / postal code');
  if (!payload.addressCountry) missing.push('country');
  if (!payload.phone) missing.push('telephone');
  if (!payload.email) missing.push('email');
  if (!payload.signature) missing.push('electronic signature');
  if (!payload.signDate) missing.push('date signed');
  if (!payload.printName) missing.push('printed name');
  if (!payload.electronicSignConfirm) missing.push('the confirmation checkbox at the bottom');
  if (!payload.supportAmount) payload.supportAmount = 'To be confirmed';

  if (missing.length) {
    return { error: `Please complete: ${missing.join(', ')}.` };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { error: 'Please enter a valid email address.' };
  }
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
    <h2>Affidavit of Eligibility — Submitted Online</h2>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      ${row('Support amount', payload.supportAmount)}
      ${row('Admin fee already paid', payload.adminPaid ? 'Yes' : 'No')}
      ${row('Application date', payload.applicationDate)}
      ${row('Full name', payload.fullName)}
      ${row('Street', payload.addressStreet)}
      ${row('City / State / Postal', payload.addressCity)}
      ${row('Country', payload.addressCountry)}
      ${row('Phone', payload.phone)}
      ${row('Email', payload.email)}
      ${row('Electronic signature', payload.signature)}
      ${row('Date signed', payload.signDate)}
      ${row('Printed name', payload.printName)}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via https://www.edwinmega.com/documents/affidavit-of-eligibility.html</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: payload.email,
      subject: `[Affidavit] ${payload.fullName} — ${payload.supportAmount}`,
      text: `Affidavit submitted — ${payload.fullName}\nEmail: ${payload.email}\nAmount: ${payload.supportAmount}\nAdmin paid: ${payload.adminPaid ? 'Yes' : 'No'}\nSignature: ${payload.signature}`,
      html: operatorHtml,
    });

    await transporter.sendMail({
      from: `"Michael Freedman, Edwin Castro Foundation" <${zohoUser}>`,
      to: payload.email,
      replyTo: toEmail || zohoUser,
      subject: 'Affidavit received — Edwin Castro Foundation',
      html: `
        <p>Dear ${escapeHtml(payload.fullName)},</p>
        <p>We have received your Affidavit of Eligibility and Release for the Edwin Castro Foundation.</p>
        <p>Support amount on file: <strong>${escapeHtml(payload.supportAmount)}</strong><br/>
        Date signed: <strong>${escapeHtml(payload.signDate)}</strong></p>
        <p>Your affidavit is now with our office for review. Michael Freedman, your Support Coordinator, will email you with the next step.</p>
        <p>This confirmation is not a final funding release.</p>
        <p>Michael Freedman<br/>Support Coordinator<br/>Edwin Castro Foundation<br/>${escapeHtml(toEmail || zohoUser || '')}</p>
      `,
      text: `Dear ${payload.fullName},\n\nWe have received your Affidavit of Eligibility and Release for ${payload.supportAmount}. Michael Freedman will email you with the next step.\n\nEdwin Castro Foundation`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Affidavit submit error:', err);
    return NextResponse.json({ error: 'Could not submit your affidavit. Please try again.' }, { status: 500 });
  }
}
