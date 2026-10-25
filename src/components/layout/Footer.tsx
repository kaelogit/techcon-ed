import Link from 'next/link';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--edwin-line)] bg-[var(--trust)] text-white">
      <div className="container-wide grid gap-10 pt-14 pb-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-display inline-block text-3xl tracking-[0.04em] text-white">
            Edwin Castro
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            Official site for Edwin Castro funding. Debt-free support for people building their next
            chapter — and the place to verify every contact before you reply.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="h-4 w-4 text-[var(--accent-gold)]" />
            Grants — not loans
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-[0.16em] text-[var(--edwin-coral)] uppercase">
            Explore
          </h4>
          <nav className="flex flex-col gap-2.5">
            {[
              ['/', 'Home'],
              ['/story', 'Vision'],
              ['/areas', 'Funding areas'],
              ['/impact', 'Stories'],
              ['/apply', 'Apply'],
              ['/donate', 'Donate'],
              ['/#faq', 'FAQ'],
              ['/verify', 'Verify contact'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-[0.16em] text-[var(--edwin-coral)] uppercase">
            Contact
          </h4>
          <a
            href="mailto:support@edwinmega.com"
            className="flex items-center gap-2 text-sm text-white/85 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            support@edwinmega.com
          </a>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/55">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            Email only. Official follow-up comes from your assigned coordinator thread.
          </p>
          <nav className="mt-5 flex flex-col gap-2">
            <Link href="/privacy" className="text-sm text-white/75 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-white/75 hover:text-white">
              Terms
            </Link>
            <Link href="/security" className="text-sm text-white/75 hover:text-white">
              Security
            </Link>
          </nav>
        </div>
      </div>

      <p className="container-wide border-t border-white/15 py-6 text-sm text-white/50">
        © {currentYear} Edwin Castro Foundation · edwinmega.com
      </p>
    </footer>
  );
}
