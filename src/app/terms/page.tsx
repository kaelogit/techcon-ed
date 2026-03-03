'use client';

import { View, Text } from '@/components/Themed';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <View className="min-h-screen bg-white">
      
      {/* HEADER SECTION */}
      <View className="bg-white pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-stone-100">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Our Agreement
          </Text>
          <Text className="block text-4xl md:text-6xl font-bold text-edwin-black mb-8">
            The way we work <br /> together.
          </Text>
          <Text className="block text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            These guidelines ensure that our support goes to the right people as quickly and safely as possible.
          </Text>
        </View>
      </View>

      {/* CONTENT SECTION */}
      <View className="py-24 px-6">
        <View className="max-w-3xl mx-auto">
          
          <TermsSection 
            title="A Personal Initiative"
            desc="This platform is a private initiative by Edwin Castro to provide direct support to individuals and communities. By using this site, you understand that any support provided is a gift intended to help you move forward, not a loan, a debt, or a legal contract."
          />

          <TermsSection 
            title="Who Can Reach Out"
            desc="Our focus is on helping individuals, families, and community organizations currently living in the United States who are facing genuine hardship or seeking to create a positive impact in their neighborhoods."
          />

          <TermsSection 
            title="The Review Process"
            desc="We read every story personally. While we wish we could help everyone, submitting a request does not guarantee you will receive funding. We choose where to provide support based on the urgency of the need and our ability to make a meaningful difference at that moment."
          />

          <TermsSection 
            title="The Importance of Honesty"
            desc="Everything we do is built on trust. We ask that you provide 100% accurate and honest information in your story. If we discover that any part of a request is misleading or untrue, we will immediately stop the review process."
          />

          <TermsSection 
            title="Protecting Your Safety"
            desc="Your safety and privacy matter. We will never ask for your bank passwords or confidential financial login information, and a small internal team is the only group that reviews your story. If you ever receive a message that feels suspicious or does not come from an '@edwinmega.com' email address, please ignore it and contact our support team."
          />

          <TermsSection 
            title="Changes to the Program"
            desc="As the needs of our communities change, we may update how this program works or how we review requests. We reserve the right to pause or change the initiative at any time to ensure it remains effective and safe for everyone."
          />

          {/* Closing Confirmation */}
          <View className="mt-20 p-12 bg-[#F9F8F6] rounded-[3rem] border border-stone-200">
            <Text className="block text-lg text-stone-600 mb-10 leading-relaxed">
              By submitting your request on this platform, you agree to these simple guidelines. We look forward to reading your story and seeing how we can help.
            </Text>
            <Link 
              href="/apply" 
              className="inline-block px-10 py-4 bg-edwin-black text-white text-sm font-bold rounded-full hover:bg-edwin-navy transition-all uppercase tracking-widest"
            >
              Go to Application
            </Link>
          </View>

        </View>
      </View>

    </View>
  );
}

function TermsSection({ title, desc }: { title: string; desc: string }) {
  return (
    <View className="mb-16 animate-on-load">
      <Text className="block text-xl font-black text-edwin-black mb-6 uppercase tracking-tight">
        {title}
      </Text>
      <Text className="block text-lg text-stone-600 leading-relaxed">
        {desc}
      </Text>
    </View>
  );
}
