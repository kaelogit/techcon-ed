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

function validate(body: unknown): AffidavitPayload | null {
  if (!body || typeof body !== 'object') return null;
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
    electronicSignConfirm: o.electronicSignConfirm === true,
  };

  const required = [
    payload.supportAmount,
    payload.applicationDate,
    payload.fullName,
    payload.addressStreet,
    payload.addressCity,
    payload.addressCountry,
    payload.phone,
    payload.email,
    payload.signature,
    payload.signDate,
    payload.printName,
  ];

  if (required.some((v) => !v) || !payload.electronicSignConfirm) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;
  return payload;
}

export async function POST(request: NextRequest) {
  const parsed = validate(await request.json());
  if (!parsed) {
    return NextResponse.json(
      { error: 'Please complete every field, sign electronically, and confirm the agreement box.' },
      { status: 400 }
    );
  }

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
      ${row('Support amount', parsed.supportAmount)}
      ${row('Admin fee already paid', parsed.adminPaid ? 'Yes' : 'No')}
      ${row('Application date', parsed.applicationDate)}
      ${row('Full name', parsed.fullName)}
      ${row('Street', parsed.addressStreet)}
      ${row('City / State / Postal', parsed.addressCity)}
      ${row('Country', parsed.addressCountry)}
      ${row('Phone', parsed.phone)}
      ${row('Email', parsed.email)}
      ${row('Electronic signature', parsed.signature)}
      ${row('Date signed', parsed.signDate)}
      ${row('Printed name', parsed.printName)}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via https://www.edwinmega.com/documents/affidavit-of-eligibility.html</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: parsed.email,
      subject: `[Affidavit] ${parsed.fullName} — ${parsed.supportAmount}`,
      text: `Affidavit submitted — ${parsed.fullName}\nEmail: ${parsed.email}\nAmount: ${parsed.supportAmount}\nAdmin paid: ${parsed.adminPaid ? 'Yes' : 'No'}\nSignature: ${parsed.signature}`,
      html: operatorHtml,
    });

    await transporter.sendMail({
      from: `"Michael Freedman, Edwin Castro Foundation" <${zohoUser}>`,
      to: parsed.email,
      replyTo: toEmail || zohoUser,
      subject: 'Affidavit received — Edwin Castro Foundation',
      html: `
        <p>Dear ${escapeHtml(parsed.fullName)},</p>
        <p>We have received your Affidavit of Eligibility and Release for the Edwin Castro Foundation.</p>
        <p>Support amount on file: <strong>${escapeHtml(parsed.supportAmount)}</strong><br/>
        Date signed: <strong>${escapeHtml(parsed.signDate)}</strong></p>
        <p>Your affidavit is now with our office for review. Michael Freedman, your Support Coordinator, will email you with the next step.</p>
        <p>This confirmation is not a final funding release.</p>
        <p>Michael Freedman<br/>Support Coordinator<br/>Edwin Castro Foundation<br/>${escapeHtml(toEmail || zohoUser || '')}</p>
      `,
      text: `Dear ${parsed.fullName},\n\nWe have received your Affidavit of Eligibility and Release for ${parsed.supportAmount}. Michael Freedman will email you with the next step.\n\nEdwin Castro Foundation`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Affidavit submit error:', err);
    return NextResponse.json({ error: 'Could not submit your affidavit. Please try again.' }, { status: 500 });
  }
}
