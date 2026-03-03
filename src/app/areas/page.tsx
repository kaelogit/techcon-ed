'use client';

import { View, Text } from '@/components/Themed';
import Link from 'next/link';

const supportAreas = [
  {
    title: "Housing & Shelter",
    desc: "Keeping families in their homes and providing a safe place to sleep is our highest priority. We provide funding to prevent evictions, help with mortgage payments during job loss, and assist those who have lost their homes to natural disasters.",
    examples: ["Eviction prevention", "Disaster rebuilding", "Emergency repairs"]
  },
  {
    title: "Education & Trade",
    desc: "We believe that learning is the fastest way to a better life. We cover tuition for university students, costs for professional trade schools, and the expensive tools or equipment needed to start a new career path.",
    examples: ["College tuition", "Electrical & Plumbing tools", "Certification fees"]
  },
  {
    title: "Health & Wellness",
    desc: "No one should have to choose between their health and their home. We help cover medical bills that have become overwhelming, specialized care not covered by insurance, and equipment for those living with disabilities.",
    examples: ["Medical debt relief", "Specialized therapy", "Mobility equipment"]
  },
  {
    title: "Small Business & Career",
    desc: "Local shops and neighborhood creators are the heart of our communities. We provide stabilization funding for small businesses facing hard times and startup support for individuals ready to create jobs in their neighborhood.",
    examples: ["Equipment upgrades", "Rent assistance", "Inventory support"]
  },
  {
    title: "Senior Support",
    desc: "Our elderly neighbors deserve to live with dignity and comfort. We provide direct help for daily needs, home modifications for safety, and funding for care services that ensure they are never left behind.",
    examples: ["Home safety upgrades", "Daily care costs", "Living essentials"]
  },
  {
    title: "Community Projects",
    desc: "We support the organizations that bring us together. This includes funding for neighborhood youth sports, local children's homes, and community centers that provide a safe space for everyone.",
    examples: ["Youth sports gear", "Center renovations", "Learning materials"]
  }
];

export default function AreasPage() {
  return (
    <View className="min-h-screen bg-white">
      
      {/* SECTION 1: THE FOCUS (HERO) */}
      <View className="bg-white pt-32 pb-16 md:pt-48 md:pb-24 px-6 border-b border-stone-100">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Our Focus
          </Text>
          <Text className="block text-4xl md:text-7xl font-bold text-edwin-black mb-8 leading-tight">
            Where we provide <br className="hidden md:block" />
            direct support.
          </Text>
          <Text className="block text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            We focus on the most essential parts of a stable life. If your need falls into one of these categories, we want to hear your story.
          </Text>
        </View>
      </View>

      {/* SECTION 2: DETAILED AREAS LIST */}
      <View className="py-20 md:py-32 px-6">
        <View className="max-w-7xl mx-auto">
          <View className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {supportAreas.map((area, index) => (
              <View 
                key={index} 
                className={`animate-on-load delay-${(index % 3) * 100 + 100} flex flex-col`}
              >
                <View className="flex items-center gap-4 mb-6">
                  <View className="w-10 h-10 rounded-full bg-edwin-navy flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </View>
                  <View className="h-[1px] flex-1 bg-stone-100" />
                </View>
                
                <Text className="block text-2xl md:text-3xl font-bold text-edwin-black mb-4">
                  {area.title}
                </Text>
                <Text className="block text-lg text-stone-600 leading-relaxed mb-8">
                  {area.desc}
                </Text>
                
                {/* Micro-examples list */}
                <View className="mt-auto pt-6 border-t border-stone-50">
                  <Text className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Common Requests</Text>
                  <View className="flex flex-wrap gap-3">
                    {area.examples.map((ex, i) => (
                      <View key={i} className="px-4 py-2 bg-stone-50 rounded-full border border-stone-100">
                        <Text className="text-sm text-stone-600 font-medium">{ex}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* SECTION 3: THE REASSURANCE BANNER */}
      <View className="bg-[#F7F5F0] py-20 md:py-32 px-6">
        <View className="max-w-4xl mx-auto text-center">
          <View className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm">
            <Text className="text-2xl">🤝</Text>
          </View>
          <Text className="block text-3xl md:text-4xl font-bold text-edwin-black mb-6">
            Not sure if you qualify?
          </Text>
          <Text className="block text-lg text-stone-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            If your situation is urgent and involves a genuine personal hardship, we encourage you to reach out regardless. Our team reads every request and will let you know if we can help.
          </Text>
          <Link 
            href="/apply" 
            className="inline-block px-12 py-5 bg-edwin-navy text-white text-lg font-bold rounded-full hover:bg-edwin-black transition-all shadow-xl"
          >
            Share Your Story
          </Link>
        </View>
      </View>

    </View>
  );
}