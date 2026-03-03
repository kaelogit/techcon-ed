'use client';

import { View, Text } from '@/components/Themed';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <View className="min-h-screen bg-white">
      
      {/* SECTION 1: THE PERSPECTIVE (HERO) */}
      <View className="bg-[#F7F5F0] pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Our Purpose
          </Text>
          <Text className="block text-4xl md:text-7xl font-bold text-edwin-black mb-8 leading-tight">
            Success is only meaningful <br className="hidden md:block" />
            when it is shared.
          </Text>
          <Text className="block text-lg md:text-2xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
            Edwin Castro believes that great fortune comes with a great responsibility: to strengthen the neighborhoods we live in and the people who make them special.
          </Text>
        </View>
      </View>

      {/* SECTION 2: THE TURNING POINT */}
      <View className="py-24 md:py-40 px-6 bg-white overflow-hidden">
        <View className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <View className="animate-on-load delay-100">
            <View className="w-16 h-1 bg-edwin-navy mb-10" />
            <Text className="block text-3xl md:text-5xl font-bold text-edwin-black mb-8 leading-tight">
              A personal commitment to real change.
            </Text>
            <View className="space-y-6">
              <Text className="block text-lg text-stone-600 leading-relaxed">
                After experiencing a life-changing event, Edwin didn't just want to look at the numbers—he wanted to look at the people. He saw families struggling to rebuild after disasters, talented students unable to finish school, and small business owners fighting to keep their doors open.
              </Text>
              <Text className="block text-lg text-stone-600 leading-relaxed">
                He realized that the fastest way to help was to remove the middleman. No long waits, no complicated rules, and no unnecessary paperwork. Just direct support, given freely to those who are ready to take their next step.
              </Text>
            </View>
          </View>
          
          {/* Visual Element: A premium quote block */}
          <View className="relative p-10 md:p-16 bg-[#F9F8F6] rounded-[3rem] animate-on-load delay-300">
            <Text className="absolute top-8 left-8 text-8xl text-stone-200 font-serif leading-none">“</Text>
            <Text className="relative z-10 block text-2xl md:text-3xl font-light italic text-edwin-black leading-relaxed mb-8">
              My goal isn't just to provide a one-time gift. It's to provide a foundation so that people can rebuild their own lives and eventually help someone else.
            </Text>
            <View className="flex items-center gap-4">
              <View className="w-10 h-[1px] bg-stone-400" />
              <Text className="text-sm font-bold uppercase tracking-widest text-stone-500">Edwin Castro</Text>
            </View>
          </View>
        </View>
      </View>

      {/* SECTION 3: THE PHILOSOPHY (3 PILLARS) */}
      <View className="py-24 md:py-32 px-6 bg-edwin-navy">
        <View className="max-w-7xl mx-auto">
          <View className="text-center mb-20 animate-on-load">
            <Text className="block text-amber-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">How We Operate</Text>
            <Text className="block text-4xl md:text-5xl font-bold text-white">Three Core Beliefs</Text>
          </View>
          
          <View className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <PhilosophyBlock 
              title="Radical Trust"
              desc="We believe in the honesty of our neighbors. When you share your story, we listen with an open mind and a desire to help."
              delay="delay-100"
            />
            <PhilosophyBlock 
              title="Extreme Speed"
              desc="Waiting weeks for help can be the difference between a new start and a total collapse. We aim for 24-hour funding."
              delay="delay-200"
            />
            <PhilosophyBlock 
              title="Pure Privacy"
              desc="Your struggle is personal. We keep your request strictly confidential, treating your story with the respect it deserves."
              delay="delay-300"
            />
          </View>
        </View>
      </View>

      {/* SECTION 4: THE OPEN INVITATION */}
      <View className="py-24 md:py-40 px-6 bg-white text-center">
        <View className="max-w-3xl mx-auto animate-on-load">
          <Text className="block text-4xl md:text-6xl font-black text-edwin-black mb-8 leading-tight">
            Ready to start <br />
            your next chapter?
          </Text>
          <Text className="block text-xl text-stone-500 mb-12 leading-relaxed">
            The Vision is simple: A community where no one has to face a crisis alone. If you have a story to share and a need that can be met, we are waiting to hear from you.
          </Text>
          <Link 
            href="/apply" 
            className="inline-block px-12 py-5 bg-edwin-navy text-white text-lg font-bold rounded-full hover:bg-edwin-black transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Submit Your Request
          </Link>
        </View>
      </View>

    </View>
  );
}

function PhilosophyBlock({ title, desc, delay }: { title: string; desc: string; delay: string }) {
  return (
    <View className={`flex flex-col gap-6 animate-on-load ${delay}`}>
      <View className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
        <View className="w-2 h-2 rounded-full bg-amber-400" />
      </View>
      <Text className="block text-2xl font-bold text-white">{title}</Text>
      <Text className="block text-slate-400 leading-relaxed text-lg">{desc}</Text>
    </View>
  );
}