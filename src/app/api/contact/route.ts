import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

type Payload = {
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  category: string;
  lane: string;
  amount: string;
  story: string;
  ageConfirm: boolean;
  grantConfirm: boolean;
};

function str(o: Record<string, unknown>, k: string): string {
  return typeof o[k] === "string" ? (o[k] as string).trim() : "";
}

function validate(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const payload: Payload = {
    name: str(o, "name"),
    email: str(o, "email"),
    phone: str(o, "phone"),
    country: str(o, "country"),
    state: str(o, "state"),
    city: str(o, "city"),
    address: str(o, "address"),
    postalCode: str(o, "postalCode"),
    category: str(o, "category"),
    lane: str(o, "lane"),
    amount: str(o, "amount"),
    story: str(o, "story") || str(o, "message"),
    ageConfirm: o.ageConfirm === true,
    grantConfirm: o.grantConfirm === true,
  };

  if (
    !payload.name ||
    !payload.email ||
    !payload.phone ||
    !payload.country ||
    !payload.state ||
    !payload.city ||
    !payload.address ||
    !payload.postalCode ||
    !payload.category ||
    !payload.lane ||
    !payload.amount ||
    !payload.story ||
    !payload.ageConfirm ||
    !payload.grantConfirm
  ) {
    return null;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return null;
  const emailConfirm = str(o, "emailConfirm").toLowerCase();
  if (!emailConfirm || emailConfirm !== payload.email.toLowerCase()) return null;
  return payload;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top;color:#555;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: NextRequest) {
  const parsed = validate(await request.json());
  if (!parsed) {
    return NextResponse.json(
      { error: "Please complete every field and confirm you are 18 or older." },
      { status: 400 }
    );
  }

  if (!zohoUser || !zohoPass) {
    console.error("ZOHO_USER or ZOHO_PASS not set");
    return NextResponse.json(
      { error: "Server is not configured to send email. Please try again later." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: zohoUser,
      pass: zohoPass,
    },
  });

  const operatorHtml = `
    <h2>New support request from edwinmega.com</h2>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.5;">
      ${row("Name", parsed.name)}
      ${row("Email", parsed.email)}
      ${row("Phone", parsed.phone)}
      ${row("Country", parsed.country)}
      ${row("State / Region", parsed.state)}
      ${row("City", parsed.city)}
      ${row("Mailing address", parsed.address)}
      ${row("Postal / ZIP", parsed.postalCode)}
      ${row("Funding lane", parsed.lane)}
      ${row("Category", parsed.category)}
      ${row("Amount requested", parsed.amount)}
      ${row("Message", parsed.story)}
    </table>
    <hr />
    <p style="color:#666;font-size:12px;">Sent from the Edwin Castro Foundation apply form.</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: parsed.email,
      subject: `[EdwinMega] Support request: ${parsed.category} — ${parsed.name} (${parsed.state})`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\nPhone: ${parsed.phone}\nCountry: ${parsed.country}\nState: ${parsed.state}\nCity: ${parsed.city}\nAddress: ${parsed.address}\nPostal: ${parsed.postalCode}\nLane: ${parsed.lane}\nCategory: ${parsed.category}\nAmount: ${parsed.amount}\n\n${parsed.story}`,
      html: operatorHtml,
    });

    await transporter.sendMail({
      from: `"Edwin Castro Foundation" <${zohoUser}>`,
      to: parsed.email,
      replyTo: toEmail || zohoUser,
      subject: "We received your support application — Edwin Castro Foundation",
      html: `
        <p>Dear ${escapeHtml(parsed.name)},</p>
        <p>Thank you for submitting your support application through edwinmega.com. We have received it.</p>
        <p>Category on file: <strong>${escapeHtml(parsed.category)}</strong><br/>
        Amount requested: <strong>${escapeHtml(parsed.amount)}</strong></p>
        <p>Support from the Edwin Castro Foundation is debt-free and not a loan. Applying does not guarantee an award.</p>
        <p>A Support Coordinator will email you from an @edwinmega.com address within about 24 hours. Please check your inbox and spam folder, then reply on that thread.</p>
        <p>Edwin Castro Foundation<br/>edwinmega.com</p>
      `,
      text: `Dear ${parsed.name},\n\nThank you for submitting your support application. We have received it for ${parsed.category} / ${parsed.amount}. A Support Coordinator will email you within about 24 hours.\n\nEdwin Castro Foundation`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 500 }
    );
  }
}
