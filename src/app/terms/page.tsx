import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Terms</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            Clear rules for the
            <br />
            official funding site
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            These terms explain how Edwin Castro funding works on edwinmega.com — who can apply, how
            review works, and how to stay safe.
          </p>
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-12 py-16 md:py-20">
        {[
          {
            title: 'A personal initiative',
            body: 'This site is a private initiative by Edwin Castro to provide direct, debt-free funding to individuals, families, owners, and organizations. Funding provided is a gift intended to advance a clear goal — not a loan or a debt.',
          },
          {
            title: 'Who can apply',
            body: 'We welcome requests from people at every stage — crisis recovery, steady growth, and ambitious builds. Individuals, families, professionals, business owners, and community organizations with a clear purpose may apply. Income level is not the filter; clarity of goal is.',
          },
          {
            title: 'The review process',
            body: 'We read every request. Submitting does not guarantee funding. Decisions consider purpose, readiness, fit with current capacity, and — when relevant — urgency.',
          },
          {
            title: 'Honesty',
            body: 'Provide accurate information. If any part of a request is misleading or untrue, review stops.',
          },
          {
            title: 'Protecting your safety',
            body: 'We will never ask for bank passwords or confidential financial logins. Official follow-up uses @edwinmega.com addresses. If a message feels suspicious, ignore it and contact support — or use the Verify page first.',
          },
          {
            title: 'Program changes',
            body: 'We may update how review works or pause the initiative when needed to keep the path effective and safe.',
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="text-xl text-[var(--trust)]">{section.title}</h2>
            <p
              className="mt-3 text-sm leading-relaxed text-[var(--edwin-muted)] md:text-base normal-case tracking-normal"
              style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
            >
              {section.body}
            </p>
          </div>
        ))}

        <div className="border border-[var(--edwin-line)] bg-[var(--edwin-paper)] p-8 md:p-10">
          <p
            className="text-sm leading-relaxed text-[var(--edwin-muted)] md:text-base normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            By submitting a request on this site, you agree to these guidelines. We look forward to
            reading your goal.
          </p>
          <Link href="/apply" className="btn-primary mt-6">
            Apply now
          </Link>
        </div>
      </section>
    </div>
  );
}
