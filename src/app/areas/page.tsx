'use client';

import Link from 'next/link';
import { Home, GraduationCap, Heart, Store, HeartHandshake, Users, ArrowRight, HelpCircle } from 'lucide-react';

const supportAreas = [
  {
    title: "Housing & Shelter",
    desc: "Keeping families in their homes and providing a safe place to sleep is our highest priority. We provide funding to prevent evictions, help with mortgage payments during job loss, and assist those who have lost their homes to natural disasters.",
    examples: ["Eviction prevention", "Disaster rebuilding", "Emergency repairs"],
    icon: <Home className="w-6 h-6" />,
    colorClass: "bg-green-50 text-green-600",
  },
  {
    title: "Education & Trade",
    desc: "We believe that learning is the fastest way to a better life. We cover tuition for university students, costs for professional trade schools, and the expensive tools or equipment needed to start a new career path.",
    examples: ["College tuition", "Electrical & Plumbing tools", "Certification fees"],
    icon: <GraduationCap className="w-6 h-6" />,
    colorClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Health & Wellness",
    desc: "No one should have to choose between their health and their home. We help cover medical bills that have become overwhelming, specialized care not covered by insurance, and equipment for those living with disabilities.",
    examples: ["Medical debt relief", "Specialized therapy", "Mobility equipment"],
    icon: <Heart className="w-6 h-6" />,
    colorClass: "bg-red-50 text-red-600",
  },
  {
    title: "Small Business & Career",
    desc: "Local shops and neighborhood creators are the heart of our communities. We provide stabilization funding for small businesses facing hard times and startup support for individuals ready to create jobs in their neighborhood.",
    examples: ["Equipment upgrades", "Rent assistance", "Inventory support"],
    icon: <Store className="w-6 h-6" />,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Senior Support",
    desc: "Our elderly neighbors deserve to live with dignity and comfort. We provide direct help for daily needs, home modifications for safety, and funding for care services that ensure they are never left behind.",
    examples: ["Home safety upgrades", "Daily care costs", "Living essentials"],
    icon: <HeartHandshake className="w-6 h-6" />,
    colorClass: "bg-teal-50 text-teal-600",
  },
  {
    title: "Community Projects",
    desc: "We support the organizations that bring us together. This includes funding for neighborhood youth sports, local children's homes, and community centers that provide a safe space for everyone.",
    examples: ["Youth sports gear", "Center renovations", "Learning materials"],
    icon: <Users className="w-6 h-6" />,
    colorClass: "bg-purple-50 text-purple-600",
  }
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* SECTION 1: HERO */}
      <section className="bg-white pt-32 pb-16 md:pt-44 md:pb-24 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Our Focus
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight">
            Where we provide <br className="hidden md:block" />
            <span className="text-[var(--accent-gold)]">direct support</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We focus on the most essential parts of a stable life. If your need falls into one of these categories, we want to hear your story.
          </p>
        </div>
      </section>

      {/* SECTION 2: SUPPORT AREAS GRID */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {supportAreas.map((area, index) => (
              <div 
                key={index}
                className="flex flex-col group"
              >
                {/* Header with Icon & Number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${area.colorClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {area.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-400">0{index + 1}</span>
                  <div className="h-[1px] flex-1 bg-gray-100" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-4 group-hover:text-[var(--trust)] transition-colors">
                  {area.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {area.desc}
                </p>
                
                {/* Examples Tags */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Common Requests
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

      {/* SECTION 3: REASSURANCE BANNER */}
      <section className="bg-[var(--warm-cream)] py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <HelpCircle className="w-8 h-8 text-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Not sure if you qualify?
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            If your situation is urgent and involves a genuine personal hardship, we encourage you to reach out regardless. Our team reads every request and will let you know if we can help.
          </p>
          <Link 
            href="/apply" 
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--trust)] text-white text-lg font-semibold rounded-full hover:bg-[var(--trust-light)] transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          >
            Share Your Story
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
