export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="page-hero">
        <div className="container-wide max-w-3xl">
          <p className="section-label">Privacy</p>
          <h1 className="headline-lg mt-4 text-[var(--trust)]">
            How we handle
            <br />
            your information
          </h1>
          <div className="accent-bar mt-5" />
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--edwin-muted)] md:text-lg normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Your story is yours. This page explains what we collect on edwinmega.com and how it is
            used.
          </p>
        </div>
      </section>

      <section className="container-wide max-w-3xl space-y-12 py-16 md:py-20">
        {[
          {
            title: 'What we collect',
            body: 'When you apply, we collect your name, email, location, and the goal or story you choose to share. If you email support, we keep that thread so we can answer you.',
          },
          {
            title: 'How we use it',
            body: 'Application details are used only to review your funding request, contact you, and keep an official file. We do not sell your information or use it for third-party advertising.',
          },
          {
            title: 'Public stories',
            body: 'Stories shown on this site are shared only with explicit permission. We will never publish your name or details without asking you first.',
          },
          {
            title: 'Verification data',
            body: 'If a request moves forward, we may ask for standard identification so funds reach the right person. Sensitive details are handled through secure channels and kept only as long as needed.',
          },
          {
            title: 'Your rights',
            body: 'You may request access, correction, or deletion of your personal information by emailing support@edwinmega.com.',
          },
          {
            title: 'Questions',
            body: 'Write support@edwinmega.com with any privacy question. If a message feels off, use the Verify page before you reply.',
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

        <div className="border border-[var(--edwin-line)] bg-[var(--trust)] p-8 text-white md:p-10">
          <p className="section-label-light">Privacy contact</p>
          <p
            className="mt-4 text-base leading-relaxed text-white/80 normal-case tracking-normal"
            style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
          >
            Questions about your data or a deletion request? Contact us directly.
          </p>
          <a
            href="mailto:support@edwinmega.com"
            className="mt-6 inline-block text-lg font-semibold text-white underline decoration-[var(--accent-gold)] underline-offset-4"
          >
            support@edwinmega.com
          </a>
        </div>
      </section>
    </div>
  );
}
