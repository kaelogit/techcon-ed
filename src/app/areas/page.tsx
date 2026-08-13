'use client';

import Link from 'next/link';
import { Home, GraduationCap, Heart, Store, HeartHandshake, Users, ArrowRight, HelpCircle, Shield, TrendingUp, Sparkles } from 'lucide-react';

const lanes = [
  {
    title: "Crisis & Recovery",
    desc: "When something breaks and speed matters — we fund urgent stability without treating you like a case number.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Growth & Stability",
    desc: "For professionals, families, and owners with a clear next step — education, career, home, or care that moves life forward.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: "Ambition & Scale",
    desc: "For builders ready to go bigger — expansion capital, property projects, legacy gifts, and ventures with real upside.",
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const supportAreas = [
  {
    title: "Housing & Property",
    desc: "From keeping a roof overhead after a setback to funding rebuilds, upgrades, transitions, and property goals that raise your standard of living.",
    examples: ["Crisis housing & rebuild", "Home upgrades & moves", "Property projects"],
    icon: <Home className="w-6 h-6" />,
    colorClass: "bg-green-50 text-green-600",
  },
  {
    title: "Education & Career",
    desc: "University, trade programs, professional certifications, and executive learning — plus the tools and living runway that make completion realistic.",
    examples: ["Degree & trade tuition", "Career pivot funding", "Tools & certification"],
    icon: <GraduationCap className="w-6 h-6" />,
    colorClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Health & Care",
    desc: "Medical gaps, specialized treatment, recovery support, and care decisions that should not stall while insurance or savings catch up.",
    examples: ["Treatment gaps", "Specialized care", "Recovery support"],
    icon: <Heart className="w-6 h-6" />,
    colorClass: "bg-red-50 text-red-600",
  },
  {
    title: "Business & Enterprise",
    desc: "Startup capital, stabilization after a rough season, equipment, inventory, and expansion for owners ready to grow payroll and reach.",
    examples: ["Launch & expansion", "Equipment & inventory", "Operating runway"],
    icon: <Store className="w-6 h-6" />,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Family & Longevity",
    desc: "Support for seniors, multigenerational households, and the comfort, safety, and dignity every family wants for the people they love.",
    examples: ["Senior living upgrades", "Care services", "Family transitions"],
    icon: <HeartHandshake className="w-6 h-6" />,
    colorClass: "bg-teal-50 text-teal-600",
  },
  {
    title: "Community & Legacy",
    desc: "Youth programs, neighborhood centers, foundations, and projects that leave something lasting — whether you are starting small or funding a larger vision.",
    examples: ["Youth & sports", "Centers & programs", "Legacy initiatives"],
    icon: <Users className="w-6 h-6" />,
    colorClass: "bg-purple-50 text-purple-600",
  }
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <section className="bg-white pt-32 pb-16 md:pt-44 md:pb-24 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Funding Focus
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
            Capital for recovery, <br className="hidden md:block" />
            growth, and <span className="text-[var(--accent-gold)]">ambition</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We fund clear human goals across life stages. Crisis support stays open — and so do requests from people building, expanding, or investing in what comes next.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-[var(--warm-cream)] border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lanes.map((lane) => (
              <div key={lane.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[var(--trust)]/10 text-[var(--trust)] flex items-center justify-center mb-5">
                  {lane.icon}
                </div>
                <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-3">{lane.title}</h2>
                <p className="text-gray-600 leading-relaxed">{lane.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {supportAreas.map((area, index) => (
              <div 
                key={index}
                className="flex flex-col group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${area.colorClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {area.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-400">0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-gray-100" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-4 group-hover:text-[var(--trust)] transition-colors">
                  {area.title}
                </h3>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {area.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Example Requests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.examples.map((ex, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm text-gray-600 font-medium hover:bg-[var(--warm-cream)] hover:border-[var(--accent-gold)]/30 transition-colors"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--warm-cream)] py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <HelpCircle className="w-8 h-8 text-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Not sure which lane you fit?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            If you have a clear purpose — urgent recovery, a steady next step, or a larger build — share it. Our team reviews every request and will tell you if we can fund it.
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
