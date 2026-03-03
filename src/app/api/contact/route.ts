import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const zohoUser = process.env.ZOHO_USER;
const zohoPass = process.env.ZOHO_PASS;
const toEmail = process.env.TO_EMAIL || process.env.ZOHO_USER;

function validate(body: unknown): { name: string; email: string; state: string; category: string; story?: string } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const state = typeof o.state === "string" ? o.state.trim() : "";
  const category = typeof o.category === "string" ? o.category.trim() : "";
  const story = typeof o.story === "string" ? o.story.trim() : undefined;
  if (!name || !email || !state || !category) return null;
  return { name, email, state, category, story };
}

export async function POST(request: NextRequest) {
  const parsed = validate(await request.json());
  if (!parsed) {
    return NextResponse.json(
      { error: "Missing or invalid fields: name, email, state, and category are required." },
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

  const html = `
    <h2>New support request from edwinmega.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(parsed.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parsed.email)}</p>
    <p><strong>State:</strong> ${escapeHtml(parsed.state)}</p>
    <p><strong>Category:</strong> ${escapeHtml(parsed.category)}</p>
    ${parsed.story ? `<p><strong>Message:</strong></p><p>${escapeHtml(parsed.story)}</p>` : ""}
    <hr />
    <p style="color:#666;font-size:12px;">Sent from the Edwin Castro community support form.</p>
  `;

  try {
    await transporter.sendMail({
      from: zohoUser,
      to: toEmail || zohoUser,
      replyTo: parsed.email,
      subject: `[EdwinMega] Support request: ${parsed.category} — ${parsed.name} (${parsed.state})`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\nState: ${parsed.state}\nCategory: ${parsed.category}\n\n${parsed.story || "(No message)"}`,
      html,
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
