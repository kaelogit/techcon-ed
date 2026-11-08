import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DonateForm } from '@/components/donate/DonateForm';
import { DonateTicker } from '@/components/home/DonateTicker';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Donate to the Edwin Castro Foundation',
  description:
    'Support the Edwin Castro Foundation. Donations help keep debt-free funding going for housing, education, health, business, family, and community goals.',
  path: '/donate',
});

const impactStats = [
  { value: 'Debt-free', label: 'Support awards with no repayment' },
  { value: '6 areas', label: 'Housing, education, health, business, family, community' },
  { value: 'Global', label: 'Individuals and companies giving worldwide' },
  { value: 'Direct path', label: 'Human review. Official follow-up from Support' },
];

const lanes = [
  {
    title: 'Crisis & recovery',
    text: 'When something breaks and speed matters. Your gift helps us meet urgent need without treating people like case numbers.',
  },
  {
    title: 'Growth & stability',
    text: 'Clear next steps for professionals, families, and owners. Education, career, home, and care that should not stall for lack of money.',
  },
  {
    title: 'Ambition & scale',
    text: 'Expansion capital, property projects, legacy gifts, and ventures with real upside. Fuel for people who are ready for the next chapter.',
  },
];

const supportAreas = [
  {
    title: 'Housing & property',
    text: 'Crisis housing, rebuilds after fire and loss, upgrades, transitions, mortgage stability, and property goals that raise quality of life.',
  },
  {
    title: 'Education & career',
    text: 'Tuition, trade programs, certifications, STEM paths, books, tools, and the runway that makes completion realistic.',
  },
  {
    title: 'Health & care',
    text: 'Medical gaps, specialized treatment, recovery support, veteran home modifications, and care that should not stall on paperwork alone.',
  },
  {
    title: 'Business & enterprise',
    text: 'Launch, stabilization, equipment, inventory, marketing relaunch, and expansion for owners ready to grow and keep staff paid.',
  },
  {
    title: 'Family & longevity',
    text: 'Support for seniors, multigenerational households, single parents advancing, and dignity in care decisions.',
  },
  {
    title: 'Community & legacy',
    text: 'Youth programs, neighborhood centers, sports and mentorship spaces, schools, and projects that leave something lasting.',
  },
];

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
  {
    title: 'Healing that can continue',
    text: 'Households facing medical bills and recovery costs have been able to focus on care instead of collapse.',
  },
  {
    title: 'Programs that keep doors open',
    text: 'Youth centers, coaches, and neighborhood leaders have gained the space, tools, and staffing to serve more people.',
  },
  {
    title: 'Farms and work that endure',
    text: 'Agricultural recovery, trade paths, and steady work have been protected when one hard season could have ended them.',
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
            lives. Your gift helps it reach the next family, the next student, the next owner, the
            next neighbor who is ready.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-10 md:py-12">
        <div className="container-wide grid gap-0 border border-[var(--edwin-line)] bg-white sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <article
              key={stat.label}
              className={`p-6 md:p-8 ${i > 0 ? 'border-t border-[var(--edwin-line)] sm:border-t-0' : ''} ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i >= 2 ? 'lg:border-t-0 sm:border-t lg:border-l' : ''} border-[var(--edwin-line)]`}
            >
              <p className="font-display text-2xl text-[var(--trust)] md:text-3xl">{stat.value}</p>
              <p
                className="mt-2 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {stat.label}
              </p>
            </article>
          ))}
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
            Human review. No endless maze.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            That was the beginning. The Foundation has kept going across every lane of real need and
            real ambition: housing and property, education and career, health and care, business and
            enterprise, family and longevity, and community and legacy. Recovery. Growth. Ambition.
            People who needed a door, and people who already had stability but needed fuel for what
            comes next.
          </p>
          <p
            className="mt-4 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Donations from individuals and companies around the world have helped us do even more.
            We are open to more gifts so this work does not slow down. One hundred twenty dollars.
            Twenty-five thousand. Five million. Every amount keeps another file moving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/story" className="btn-outline">
              Read the full vision
            </Link>
            <Link href="/areas" className="btn-outline">
              See funding areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
          <p className="section-label">Where gifts go</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">
            Every lane
            <br />
            your gift can reach
          </h2>
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Donations are not locked to one story. They move through the same funding areas we open
            to applicants. Crisis recovery stays open, and so do growth and scale.
          </p>
          <div className="mt-10 grid gap-0 border border-[var(--edwin-line)] bg-white md:grid-cols-3">
            {lanes.map((lane, i) => (
              <article
                key={lane.title}
                className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
              >
                <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-2xl text-[var(--trust)]">{lane.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                  style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                >
                  {lane.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-16 md:py-24">
        <p className="section-label">Funding areas</p>
        <h2 className="headline-lg mt-4 text-[var(--trust)]">
          Places your
          <br />
          donation can go
        </h2>
        <div className="accent-bar mt-5" />
        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
          style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
        >
          When you give, you help keep debt-free support moving across all six areas below. That is
          the full map of where Foundation funding can go.
        </p>
        <div className="mt-10 grid gap-0 border border-[var(--edwin-line)] sm:grid-cols-2">
          {supportAreas.map((area, i) => (
            <article
              key={area.title}
              className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)]' : ''} ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i >= 2 ? 'sm:border-t' : ''} border-[var(--edwin-line)]`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-xl text-[var(--trust)]">{area.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {area.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/areas" className="btn-outline">
            Read every funding area
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--edwin-line)] bg-[var(--edwin-paper)] py-16 md:py-20">
        <div className="container-wide">
          <p className="section-label">What your gift continues</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">This is the work you join</h2>
          <div className="mt-10 grid gap-0 border border-[var(--edwin-line)] bg-white md:grid-cols-3">
            {outcomes.map((item, i) => (
              <article
                key={item.title}
                className={`p-8 md:p-10 ${
                  i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0' : ''
                } ${i % 3 !== 0 ? 'md:border-l border-[var(--edwin-line)]' : ''} ${
                  i >= 3 ? 'md:border-t border-[var(--edwin-line)]' : ''
                }`}
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

      <section className="container-wide py-16 md:py-20">
        <p className="section-label">How giving works</p>
        <h2 className="headline-lg mt-4 text-[var(--trust)]">
          Simple steps
          <br />
          from inquiry to gift
        </h2>
        <div className="accent-bar mt-5" />
        <div className="mt-10 grid gap-0 border border-[var(--edwin-line)] md:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Send your inquiry',
              text: 'Share your name, amount, and why this work matters. Name a funding area if you want your gift aimed somewhere specific.',
            },
            {
              step: '02',
              title: 'Hear from Support',
              text: 'Official next steps come only from support@edwinmega.com. Check inbox and spam so you do not miss the reply.',
            },
            {
              step: '03',
              title: 'Keep the work moving',
              text: 'Your gift helps the next housing, education, health, business, family, or community file keep moving.',
            },
          ].map((item, i) => (
            <article
              key={item.step}
              className={`p-8 md:p-10 ${i > 0 ? 'border-t border-[var(--edwin-line)] md:border-t-0 md:border-l' : ''}`}
            >
              <p className="font-display text-xs tracking-[0.16em] text-[var(--edwin-coral)]">
                {item.step}
              </p>
              <h3 className="mt-3 text-xl text-[var(--trust)]">{item.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-12 border-t border-[var(--edwin-line)] py-16 md:py-20">
        <div>
          <p className="section-label">Give</p>
          <h2 className="headline-lg mt-4 text-[var(--trust)]">Make a donation</h2>
          <p
            className="mt-5 text-base leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Tell us your name, the amount you want to give, and a few words about why this work
            matters to you. If you want your gift aimed at a specific area, say that in the message.
            We will send the official next step from support@edwinmega.com.
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
