import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl font-semibold text-[var(--foreground)]">
            Edwin Castro
          </Link>
          <Link
            href="#reach-out"
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Reach out for support
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--trust)] to-[var(--trust-light)] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
            Official community support
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            One place for Americans to reach out for funding and support
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            Education, housing, disaster recovery, and more. If you or your community need help, this is the real place to get in touch.
          </p>
          <Link
            href="#reach-out"
            className="mt-10 inline-block rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Apply or reach out
          </Link>
        </div>
      </section>

      {/* Who is Edwin Castro */}
      <section className="px-6 py-16 md:py-24" id="about">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
            Who is Edwin Castro?
          </h2>
          <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
            <p>
              <strong className="text-[var(--foreground)]">Edwin Castro</strong> is from{" "}
              <strong className="text-[var(--foreground)]">Altadena, California</strong>. He became the sole winner of the record-breaking{" "}
              <strong className="text-[var(--foreground)]">$2.04 billion Powerball jackpot</strong> in February 2023, with the winning ticket purchased in Altadena. After taxes and a lump-sum payout, he received approximately $628 million.
            </p>
            <p>
              He grew up in the Los Angeles area, was active in sports and the <strong className="text-[var(--foreground)]">Boy Scouts</strong>, where he earned the rank of <strong className="text-[var(--foreground)]">Eagle Scout</strong>. He studied <strong className="text-[var(--foreground)]">architecture at Woodbury University</strong> and worked as an architecture consultant before winning the jackpot. He has stayed closely tied to the region where he grew up and maintains a grounded, community-focused approach to using his resources.
            </p>
          </div>
        </div>
      </section>

      {/* Community & giving back */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
            Community engagement & giving back
          </h2>
          <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
            <p>
              Edwin has publicly said he wants to use part of his winnings to help others—especially through <strong className="text-[var(--foreground)]">education and charity</strong>. He has donated and directed funding toward <strong className="text-[var(--foreground)]">public education in California</strong> and has stated that he and his family want to spread happiness by supporting people and causes that help the less privileged, orphans, and community groups, and to encourage recipients to <strong className="text-[var(--foreground)]">pay it forward</strong>.
            </p>
            <p>
              After severe wildfires—including the <strong className="text-[var(--foreground)]">Eaton Fire</strong>—devastated parts of Altadena and nearby communities in 2025, Edwin spent around <strong className="text-[var(--foreground)]">$10 million to buy roughly 15 fire-damaged lots in Altadena</strong> with the intention of rebuilding residential properties for families who want to return or settle there. He has said this is meant to benefit families who want to live in the community long term, not outside investors, and his architectural background and personal connection to Altadena inform his approach.
            </p>
          </div>
        </div>
      </section>

      {/* Funding areas */}
      <section className="border-t border-[var(--border)] px-6 py-16 md:py-24" id="funding">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
            How we can help
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            If you’re in the USA and need support in any of these areas, reach out through the form below. Every request is reviewed and goes directly to the team.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Education", desc: "School costs, scholarships, and educational programs." },
              { title: "Housing", desc: "Rebuilding, stability, and safe housing needs." },
              { title: "Disaster & fire recovery", desc: "Recovery after wildfires or other disasters." },
              { title: "Medical & family need", desc: "Medical expenses and family support." },
              { title: "Community & nonprofits", desc: "Local groups and community projects." },
              { title: "Other", desc: "Other ways we might be able to help." },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reach out / Contact form */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-16 md:py-24" id="reach-out">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-[var(--foreground)] md:text-4xl">
            Reach out for support
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Use this form to apply or ask for funding and support. Submissions are sent by email to the team. You’re in the right place—this is the official channel.
          </p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-serif text-lg font-semibold text-[var(--foreground)]">
            Edwin Castro
          </p>
          <p className="text-sm text-[var(--muted)]">
            Official community support · edwinmega.com
          </p>
        </div>
      </footer>
    </div>
  );
}
