import type { Metadata } from 'next';
import Link from 'next/link';
import { DonateForm } from '@/components/donate/DonateForm';
import { DonateTicker } from '@/components/home/DonateTicker';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Donate to the Edwin Castro Foundation',
  description:
    'Support the Edwin Castro Foundation. Donations help keep debt-free funding going for housing, education, health, business, and community goals.',
  path: '/donate',
});

const outcomes = [
  {
    title: 'Homes that stand again',
    text: 'Families who lost everything in fire and hard seasons have rebuilt on the lots they loved.',
  },
  {
    title: 'School that actually finishes',
    text: 'Students and tradespeople have completed programs they almost walked away from for lack of money.',
  },
  {
    title: 'Businesses that stay open',
    text: 'Owners have kept staff paid, replaced equipment, and opened the next chapter without a loan hanging over them.',
  },
];

export default function DonatePage() {
  return (
    <div className="bg-white">
      <DonateTicker />

      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Donate</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Help us keep
            <br />
            the good work going
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            If you are here to give, you already understand something simple. This work changes
            lives. Your gift helps it reach the next family, the next student, the next owner who is
            ready.
          </p>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="section-label">The story</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">
            How Edwin
            <br />
            started this
          </h2>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Edwin Castro is the record-breaking lottery winner who looked past the numbers to the
            people. After the California wildfires, he saw families standing in ash with nowhere to
            turn that moved at the speed of real life. He opened a direct path. Debt-free support.
            Human review. No endless queue.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            That was the beginning. The Foundation has kept going for housing, education, health,
            business, and community goals. Recovery. Growth. Ambition. People who needed a door, and
            people who already had stability but needed fuel for what comes next.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Donations from individuals and companies around the world have helped us do even more.
            We are open to more gifts so this work does not slow down. One hundred twenty dollars.
            Twenty-five thousand. Five million. Every amount keeps another file moving.
          </p>
          <Link href="/story" className="btn-outline mt-8">
            Read the full vision
          </Link>
        </div>
        <aside className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8 md:p-10">
          <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">Quote</p>
          <blockquote
            className="mt-4 text-xl leading-relaxed text-[var(--trust)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            My goal is not only to meet urgent need. It is to invest in people who are ready for
            their next chapter, and who will someday open a door for someone else.
          </blockquote>
          <p className="mt-6 text-sm font-bold tracking-[0.14em] text-[var(--edwin-muted)] uppercase">
            Edwin Castro
          </p>
        </aside>
      </section>

      <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-16 md:py-20">
        <div className="container-wide">
          <p className="section-label">What your gift continues</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">This is the work you join</h2>
          <div className="mt-10 grid gap-0 border border-[var(--edwin-line)] bg-white md:grid-cols-3">
            {outcomes.map((item, i) => (
              <article
                key={item.title}
                className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
              >
                <h3 className="text-xl text-[var(--trust)]">{item.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                  style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                >
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-12 py-16 md:py-20">
        <div>
          <h2 className="headline-lg text-[var(--trust)]">Make a donation</h2>
          <p
            className="mt-5 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Tell us your name, the amount you want to give, and a few words about why this work
            matters to you. We will send the official next step from support@edwinmega.com.
          </p>
          <DonateForm />
        </div>

        <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8">
          <p className="section-label">Questions</p>
          <a
            href="mailto:support@edwinmega.com?subject=I%20want%20to%20donate"
            className="mt-3 block font-display text-2xl text-[var(--trust)]"
          >
            support@edwinmega.com
          </a>
          <p
            className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Official donation follow-up uses this address only.
          </p>
        </div>
      </section>
    </div>
  );
}
