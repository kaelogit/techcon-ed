import Link from 'next/link';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';

export default function BankingHomePage() {
  return (
    <BankingPublicShell>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1f33] via-[#12324d] to-[#0f766e] text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(125,211,199,.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.12), transparent 35%)',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7dd3c7]">
              Award disbursement banking
            </p>
            <h1 className="banking-display text-4xl leading-tight sm:text-5xl">
              Your support award, held in a secure ECF account
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              ECF Banking is the portal where approved recipients view their credited support balance,
              review activity, and link an external account when they are ready to transfer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/banking/register"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0b1f33] no-underline hover:bg-[#e8f7f5]"
              >
                Register with account number
              </Link>
              <Link
                href="/banking/login"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.16em] text-[#7dd3c7]">Account preview</p>
            <p className="banking-display mt-3 text-3xl">$300,000.00</p>
            <p className="mt-1 text-sm text-white/70">Available balance · Support Award Checking</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/65">Latest credit</span>
                <span>Support Award Deposit</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/65">Status</span>
                <span className="text-[#7dd3c7]">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/65">Transfers</span>
                <span>To linked external accounts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="banking-display text-center text-2xl text-[#0b1f33] sm:text-3xl">How it works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Receive your account number',
              body: 'After your award is cleared, the Foundation issues your ECF Banking account number with your name and details already on file.',
            },
            {
              step: '02',
              title: 'Register and secure access',
              body: 'Enter your account number, confirm your details, then set your password and security questions.',
            },
            {
              step: '03',
              title: 'View balance and transfer',
              body: 'See your support credit, review activity, add an external bank account, and initiate a transfer when ready.',
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-[#d5dde6] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold tracking-[0.16em] text-[#2f8f84]">{item.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#0b1f33]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </BankingPublicShell>
  );
}
