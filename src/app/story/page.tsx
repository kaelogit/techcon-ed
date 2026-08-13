'use client';

import Link from 'next/link';
import { Quote, Target, Zap, Shield, ArrowRight } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-white">
      
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
            Edwin Castro believes great fortune carries a responsibility: put capital behind clear human goals — recovery, growth, and ambition — so more people can build what comes next.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="space-y-8">
            <div className="w-16 h-1 bg-[var(--trust)]" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              A personal commitment to real momentum.
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                After a life-changing win, Edwin looked past the numbers to the people. He saw families rebuilding after disaster, students and professionals blocked by cost, owners ready to expand, and neighbors with ideas that deserved fuel — not another waiting list.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The fastest path was direct capital. No long agency queues. No complicated rules designed to exclude. Just funding for people with a clear purpose — whether they are stabilizing after a crisis or accelerating a goal they already know how to pursue.
              </p>
            </div>
          </div>
          
          <div className="relative p-10 md:p-14 bg-[var(--warm-cream)] rounded-3xl">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[var(--accent-gold)]/30" />
            <blockquote className="relative z-10 text-xl md:text-2xl font-serif italic text-gray-900 leading-relaxed mb-8">
              My goal is not only to meet urgent need. It is to invest in people who are ready for their next chapter — and who will someday open a door for someone else.
            </blockquote>
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Edwin Castro</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-[var(--trust)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-gold)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <PhilosophyBlock 
              icon={<Target className="w-6 h-6" />}
              title="Purpose Over Profile"
              desc="We fund clear goals across income stages — crisis recovery, steady growth, and ambitious builds. Who you are today matters less than what you are building toward."
            />
            <PhilosophyBlock 
              icon={<Zap className="w-6 h-6" />}
              title="Extreme Speed"
              desc="Waiting weeks can stall a recovery or kill momentum on a real opportunity. We aim for rapid review and 24-hour funding when approved."
            />
            <PhilosophyBlock 
              icon={<Shield className="w-6 h-6" />}
              title="Pure Privacy"
              desc="Your request is personal. We keep it confidential and treat every story — urgent or ambitious — with respect."
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
            Ready to start <br />
            your next chapter?
          </h2>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            The vision is simple: capital that meets people where they are — rebuilding, growing, or going bigger. If you have a clear goal, we want to hear it.
          </p>
          <Link 
            href="/apply" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--trust)] text-white text-lg font-semibold rounded-full hover:bg-[var(--trust-light)] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            Share Your Goal
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
