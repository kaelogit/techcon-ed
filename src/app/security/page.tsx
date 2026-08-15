'use client';

import { View, Text } from '@/components/Themed';

export default function SecurityPage() {
  return (
    <View className="min-h-screen bg-white">
      
      {/* HEADER SECTION */}
      <View className="bg-edwin-navy pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <View className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Text className="text-2xl">🔒</Text>
          </View>
          <Text className="block text-4xl md:text-6xl font-bold text-white mb-8">
            Your Privacy is <br /> our Priority.
          </Text>
          <Text className="block text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Edwin Castro and our support team are committed to protecting your personal journey with the highest level of security.
          </Text>
        </View>
      </View>

      {/* CONTENT SECTION */}
      <View className="py-24 px-6">
        <View className="max-w-3xl mx-auto">
          
          <SecurityBlock 
            title="Safe & Private Stories"
            desc="Your personal story is never shared publicly, sold, or used for any purpose other than reviewing your request for support. We treat your life experiences with the same respect we would give our own families."
          />

          <SecurityBlock 
            title="Secure Verification"
            desc="When we ask for ID or banking details to process your 24-hour funding, we use professional-grade encryption. We never see or store your private passwords. Our only goal is to make sure the help gets to the right person."
          />

          <SecurityBlock 
            title="No Hidden Fees"
            desc="This platform is 100% free. We will never ask you for money, taxes, or 'processing fees' to receive your support. If someone claiming to be Edwin Castro asks you for money, it is not us."
          />

          <SecurityBlock 
            title="Total Data Control"
            desc="You have full control over your information. If at any time you wish for your story or details to be removed from our secure system, our support team will handle it immediately upon your request."
          />

          <View className="mb-16 border border-stone-200 bg-stone-50 p-8">
            <Text className="block text-2xl font-bold text-edwin-black">
              Someone contacted you about funding?
            </Text>
            <Text className="mt-3 block text-base leading-relaxed text-stone-600">
              Do not reply yet. Official messages come only from support@edwinmega.com. Check the
              message on our contact page before you send documents or money.
            </Text>
            <a
              href="/verify"
              className="mt-6 inline-flex bg-[var(--trust)] px-6 py-3 text-sm font-semibold text-white"
            >
              Check if this message is real
            </a>
          </View>

          {/* Contact for Security Issues */}
          <View className="mt-16 p-10 bg-stone-50 rounded-[2rem] border border-stone-100 text-center">
            <Text className="block text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Security Team</Text>
            <Text className="block text-lg text-stone-600 mb-6">
              Have questions about how we keep your data safe? Reach out to our secure inbox.
            </Text>
            <a href="mailto:support@edwinmega.com" className="text-xl font-bold text-edwin-black underline decoration-amber-400 underline-offset-8">
              support@edwinmega.com
            </a>
          </View>

        </View>
      </View>

    </View>
  );
}

function SecurityBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <View className="mb-16 animate-on-load">
      <Text className="block text-2xl md:text-3xl font-bold text-edwin-black mb-4">
        {title}
      </Text>
      <Text className="block text-lg text-stone-600 leading-relaxed">
        {desc}
      </Text>
    </View>
  );
}