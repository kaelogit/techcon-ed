import Link from 'next/link';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--deep-charcoal)] text-white">
      <div className="brand-topbar" />
      <div className="container-page grid gap-10 pt-14 pb-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-display inline-block text-2xl font-semibold text-white">
            Edwin Castro
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            Direct, debt-free funding for recovery, growth, and ambition — a personal commitment to
            people building their next chapter.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck className="h-4 w-4 text-[var(--accent-gold)]" />
            100% debt-free funding
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold tracking-wider text-[var(--accent-gold)] uppercase">
            Platform
          </h4>
          <nav className="flex flex-col gap-2.5">
            {[
              ['/', 'Home'],
              ['/story', 'The Vision'],
              ['/areas', 'Funding Areas'],
              ['/impact', 'Real Stories'],
              ['/apply', 'Apply now'],
              ['/#faq', 'Common Questions'],
              ['/verify', 'Is this email real?'],
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
          <h4 className="mb-4 text-xs font-bold tracking-wider text-[var(--accent-gold)] uppercase">
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
            Responses typically sent within minutes during active review hours.
          </p>
          <nav className="mt-5 flex flex-col gap-2">
            <Link href="/privacy" className="text-sm text-white/75 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/75 hover:text-white">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>

      <p className="container-page border-t border-white/10 py-6 text-sm text-white/50">
        © {currentYear} Edwin Castro · The Uplift Program
      </p>
    </footer>
  );
}
