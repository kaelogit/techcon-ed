import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { normalizeAccountNumber } from '@/data/ecf-banking-seed';
import { DEBIT_CARD_ISSUE_FEE, DEBIT_CARD_REQUEST_EMAIL } from '@/lib/banking/card';

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const operatorTo =
  process.env.ECF_BANKING_EMAIL || DEBIT_CARD_REQUEST_EMAIL || process.env.TO_EMAIL || zohoUser;

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = String(body.fullName || '').trim();
    const accountNumber = normalizeAccountNumber(String(body.accountNumber || ''));
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const mailingAddress = String(body.mailingAddress || '').trim();

    if (!fullName || accountNumber.length !== 12 || !email || !mailingAddress) {
      return NextResponse.json(
        { error: 'Please enter your full name, 12-digit account number, email, and mailing address.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (!zohoUser || !zohoPass) {
      return NextResponse.json(
        { error: 'Request submission is temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    const feeLabel = `$${DEBIT_CARD_ISSUE_FEE.toLocaleString('en-US')}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: { user: zohoUser, pass: zohoPass },
    });

    await transporter.sendMail({
      from: zohoUser,
      to: operatorTo || zohoUser,
      replyTo: email,
      subject: `[Debit card request] ${fullName} — ${accountNumber}`,
      text: `Debit card request\nName: ${fullName}\nAccount: ${accountNumber}\nEmail: ${email}\nPhone: ${phone || '—'}\nMailing address: ${mailingAddress}\nFee: ${feeLabel}`,
      html: `
        <h2>ECF Bank debit card request</h2>
        <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
          ${row('Full name', fullName)}
          ${row('Account number', accountNumber)}
          ${row('Email', email)}
          ${row('Phone', phone || '—')}
          ${row('Mailing address', mailingAddress)}
          ${row('Issuing / mailing fee', feeLabel)}
        </table>
      `,
    });

    await transporter.sendMail({
      from: `"ECF Banking" <${zohoUser}>`,
      to: email,
      replyTo: DEBIT_CARD_REQUEST_EMAIL,
      subject: 'Your ECF Bank debit card request was submitted',
      html: `
        <p>Dear ${escapeHtml(fullName)},</p>
        <p>Your request for an ECF Bank debit card has been submitted.</p>
        <p><strong>Note:</strong> debit card delivery costs <strong>${feeLabel}</strong>.</p>
        <p>Expect <strong>${escapeHtml(DEBIT_CARD_REQUEST_EMAIL)}</strong> to reach out to you soon with next steps for issuing and mailing your card.</p>
        <p>Account on file: <strong>${escapeHtml(accountNumber)}</strong><br/>
        Mailing address submitted: ${escapeHtml(mailingAddress)}</p>
        <p>ECF Banking<br/>Edwin Castro Foundation<br/>${escapeHtml(DEBIT_CARD_REQUEST_EMAIL)}</p>
      `,
      text: `Dear ${fullName},\n\nYour request for an ECF Bank debit card has been submitted.\n\nNote: debit card delivery costs ${feeLabel}.\n\nExpect ${DEBIT_CARD_REQUEST_EMAIL} to reach out to you soon.\n\nAccount: ${accountNumber}\nMailing address: ${mailingAddress}\n`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[banking/debit-card-request]', err);
    return NextResponse.json({ error: 'Could not submit request.' }, { status: 500 });
  }
}
