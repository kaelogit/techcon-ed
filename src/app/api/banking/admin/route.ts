import { NextResponse } from 'next/server';
import { addSeedAccount, generateAccountNumber, listAllSeeds, toPublicView } from '@/lib/banking/store';

function authorize(req: Request): boolean {
  const key = process.env.ECF_BANKING_ADMIN_KEY || 'ecf-admin-demo';
  const header = req.headers.get('x-ecf-admin-key') || '';
  const url = new URL(req.url);
  const q = url.searchParams.get('key') || '';
  return header === key || q === key;
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const seeds = listAllSeeds().map((s) => toPublicView(s));
  return NextResponse.json({ accounts: seeds });
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const fullName = String(body.fullName || '').trim();
    const addressLine1 = String(body.addressLine1 || '').trim();
    const city = String(body.city || '').trim();
    const state = String(body.state || '').trim();
    const postalCode = String(body.postalCode || '').trim();
    const country = String(body.country || 'United States').trim();
    const supportAmount = Number(body.supportAmount);
    const creditDate = String(body.creditDate || new Date().toISOString().slice(0, 10));
    let accountNumber = String(body.accountNumber || '').trim().toUpperCase();

    if (!fullName || !addressLine1 || !city || !state || !postalCode || !Number.isFinite(supportAmount) || supportAmount <= 0) {
      return NextResponse.json({ error: 'Name, address, and support amount are required.' }, { status: 400 });
    }

    if (!accountNumber) {
      accountNumber = generateAccountNumber();
    }

    addSeedAccount({
      accountNumber,
      fullName,
      addressLine1,
      addressLine2: body.addressLine2 ? String(body.addressLine2) : undefined,
      city,
      state,
      postalCode,
      country,
      supportAmount,
      creditDate,
      creditDescription: 'Support Award Deposit — Edwin Castro Foundation',
      accountType: 'Support Award Checking',
    });

    return NextResponse.json({
      ok: true,
      accountNumber,
      message: 'Account issued. Share the account number with the winner to register.',
    });
  } catch {
    return NextResponse.json({ error: 'Could not create account.' }, { status: 400 });
  }
}
