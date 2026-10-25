import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

type Payload = {
  name: string;
  email: string;
  amount: string;
  message: string;
};

function str(o: Record<string, unknown>, k: string): string {
  return typeof o[k] === 'string' ? (o[k] as string).trim() : '';
}

function validate(body: unknown): Payload | null {
  if (!body || typeof body !== 'object') return null;
  const o = body as Record<string, unknown>;
  const payload: Payload = {
    name: str(o, 'name'),
    email: str(o, 'email'),
    amount: str(o, 'amount'),
    message: str(o, 'message'),
  };
  if (!payload.name || !payload.email || !payload.amount || !payload.message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;
  return payload;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  const parsed = validate(await request.json());
  if (!parsed) {
    return NextResponse.json(
      { error: 'Please enter your name, email, amount, and a message about the donation.' },
      { status: 400 }
    );
  }

  if (!zohoUser || !zohoPass) {
    return NextResponse.json(
      { error: 'Server is not configured to send email. Please write support@edwinmega.com.' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user: zohoUser, pass: zohoPass },
  });

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: parsed.email,
      subject: `[EdwinMega] Donation inquiry: ${parsed.name}`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\nAmount: ${parsed.amount || 'not specified'}\n\n${parsed.message}`,
      html: `
        <h2>Donation inquiry from edwinmega.com</h2>
        <p><strong>Name:</strong> ${escapeHtml(parsed.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
        <p><strong>Amount:</strong> ${escapeHtml(parsed.amount || 'not specified')}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(parsed.message || '—')}</p>
      `,
    });

    await transporter.sendMail({
      from: `"Edwin Castro Foundation" <${zohoUser}>`,
      to: parsed.email,
      replyTo: 'support@edwinmega.com',
      subject: 'Donation inquiry received — Edwin Castro Foundation',
      text: `Dear ${parsed.name},\n\nThank you for your interest in supporting the Edwin Castro Foundation.\n\nWe have received your donation inquiry for ${parsed.amount}. Our office will write you from support@edwinmega.com with the next steps for your donation.\n\nPlease check your inbox and spam folder.\n\nWith thanks,\nEdwin Castro Foundation\nsupport@edwinmega.com\nwww.edwinmega.com`,
      html: `
        <p>Dear ${escapeHtml(parsed.name)},</p>
        <p>Thank you for your interest in supporting the Edwin Castro Foundation.</p>
        <p>We have received your donation inquiry for <strong>${escapeHtml(parsed.amount)}</strong>. Our office will write you from <strong>support@edwinmega.com</strong> with the next steps for your donation.</p>
        <p>Please check your inbox and spam folder.</p>
        <p>With thanks,<br/>Edwin Castro Foundation<br/>support@edwinmega.com<br/>www.edwinmega.com</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[donate]', err);
    return NextResponse.json(
      { error: 'Could not send your message. Please email support@edwinmega.com.' },
      { status: 500 }
    );
  }
}
