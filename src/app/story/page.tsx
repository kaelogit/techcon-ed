'use client';

import Link from 'next/link';
import { Quote, Target, Zap, Shield, ArrowRight } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* SECTION 1: HERO */}
      <section className="bg-[var(--warm-cream)] pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Our Purpose
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
            Success is only meaningful <br className="hidden md:block" />
            when it is <span className="text-[var(--accent-gold)]">shared</span>.
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Edwin Castro believes that great fortune comes with a great responsibility: to strengthen the neighborhoods we live in and the people who make them special.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE TURNING POINT */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="w-16 h-1 bg-[var(--trust)]" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              A personal commitment to real change.
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                After experiencing a life-changing event, Edwin didn't just want to look at the numbers—he wanted to look at the people. He saw families struggling to rebuild after disasters, talented students unable to finish school, and small business owners fighting to keep their doors open.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                He realized that the fastest way to help was to remove the middleman. No long waits, no complicated rules, and no unnecessary paperwork. Just direct support, given freely to those who are ready to take their next step.
              </p>
            </div>
          </div>
          
          {/* Quote Block */}
          <div className="relative p-10 md:p-14 bg-[var(--warm-cream)] rounded-3xl">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[var(--accent-gold)]/30" />
            <blockquote className="relative z-10 text-xl md:text-2xl font-serif italic text-gray-900 leading-relaxed mb-8">
              My goal isn't just to provide a one-time gift. It's to provide a foundation so that people can rebuild their own lives and eventually help someone else.
            </blockquote>
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Edwin Castro</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THREE CORE BELIEFS */}
      <section className="py-24 md:py-32 px-6 bg-[var(--trust)] relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
              <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">How We Operate</p>
              <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Three Core Beliefs
            </h2>
          </div>
          
          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <PhilosophyBlock 
              icon={<Target className="w-6 h-6" />}
              title="Radical Trust"
              desc="We believe in the honesty of our neighbors. When you share your story, we listen with an open mind and a desire to help."
            />
            <PhilosophyBlock 
              icon={<Zap className="w-6 h-6" />}
              title="Extreme Speed"
              desc="Waiting weeks for help can be the difference between a new start and a total collapse. We aim for 24-hour funding."
            />
            <PhilosophyBlock 
              icon={<Shield className="w-6 h-6" />}
              title="Pure Privacy"
              desc="Your struggle is personal. We keep your request strictly confidential, treating your story with the respect it deserves."
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="py-24 md:py-32 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Ready to start <br />
            your next chapter?
          </h2>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            The Vision is simple: A community where no one has to face a crisis alone. If you have a story to share and a need that can be met, we are waiting to hear from you.
          </p>
          <Link 
            href="/apply" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--trust)] text-white text-lg font-semibold rounded-full hover:bg-[var(--trust-light)] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            Submit Your Request
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function PhilosophyBlock({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-6 group">
      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-serif font-semibold text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-lg">{desc}</p>
    </div>
  );
}
