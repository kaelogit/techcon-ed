'use client';

import { View, Text } from '@/components/Themed';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <View className="min-h-screen bg-white">
      
      {/* HEADER SECTION */}
      <View className="bg-[#F9F8F6] pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-stone-200">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Trust & Transparency
          </Text>
          <Text className="block text-4xl md:text-6xl font-bold text-edwin-black mb-8">
            How we protect <br /> your privacy.
          </Text>
          <Text className="block text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            We believe that your personal story is yours alone. Here is exactly how we handle and protect the information you share with us.
          </Text>
        </View>
      </View>

      {/* CONTENT SECTION */}
      <View className="py-24 px-6">
        <View className="max-w-3xl mx-auto">
          
          <PrivacySection 
            title="1. What we collect"
            desc="When you reach out to us, we collect your name, email, location, and the story you choose to share. This is the only information we use to understand your situation and determine how we can best support you."
          />

          <PrivacySection 
            title="2. How we use your story"
            desc="Your story is used strictly for review by Edwin’s private support team. We do not sell your data, we do not share it with advertisers, and we do not use it for any purpose other than providing direct relief."
          />

          <PrivacySection 
            title="3. Public Sharing"
            desc="You will notice 'Real Stories' on our platform. These are only shared because those individuals gave us their explicit, written permission to inspire others. We will never share your name or story publicly without asking you first."
          />

          <PrivacySection 
            title="4. Verification Data"
            desc="If your request is approved for funding, we may ask for standard identification to ensure the funds reach the right person. This sensitive data is handled through secure, encrypted channels and is never stored longer than necessary."
          />

          <PrivacySection 
            title="5. Your Rights"
            desc="You are in total control. If you ever want us to delete your request or remove your information from our secure system, simply send an email to our support team and it will be handled immediately."
          />

          {/* Contact for Privacy Issues */}
          <View className="mt-20 p-12 bg-edwin-navy rounded-[3rem] text-center shadow-xl">
            <Text className="block text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Privacy Officer</Text>
            <Text className="block text-xl text-white mb-8 leading-relaxed">
              If you have any questions about your data or want to request a deletion, please contact us directly.
            </Text>
            <a href="mailto:support@edwinmega.com" className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">
              support@edwinmega.com
            </a>
          </View>

        </View>
      </View>

    </View>
  );
}

function PrivacySection({ title, desc }: { title: string; desc: string }) {
  return (
    <View className="mb-16 animate-on-load">
      <Text className="block text-2xl font-bold text-edwin-black mb-6">
        {title}
      </Text>
      <Text className="block text-lg text-stone-600 leading-relaxed font-light">
        {desc}
      </Text>
    </View>
  );
}