'use client';

import { useState } from 'react';
import { View, Text } from '@/components/Themed';

const faqs = [
  {
    question: "How long does the review and funding take?",
    answer: "Once you submit your story, our support team will get back to you within a few minutes. After a few simple verification steps are completed, you can expect the funds to be delivered to you within 24 hours. We move fast because we know you need it now."
  },
  {
    question: "What should I do immediately after submitting my request?",
    answer: "Keep a close eye on your email inbox. Our team will email you directly from our secure support address. Because our address might be new to your email provider, please make sure to check your junk or spam folder just in case their security filters accidentally hide our response."
  },
  {
    question: "What kind of verification will you ask for?",
    answer: "We only ask for simple, standard ID to make sure we are speaking to the real you and sending funds to the right place, Your security is just as important as your funding."
  },
  {
    question: "How much support should I ask for?",
    answer: "Ask for the exact amount you truly need to overcome your current obstacle. Whether it is a few thousand dollars to prevent an eviction, or a larger amount to rebuild a community program, honesty is the most important part of your story."
  },
  {
    question: "Can I request support for someone else?",
    answer: "Yes. If you know a family member, a neighbor, or a local organization facing a genuine hardship, you can submit a story on their behalf. Just be sure to provide accurate details so our team can reach out to them directly."
  },
  {
    question: "Can I apply more than once if my situation changes?",
    answer: "If your life circumstances change drastically, you are welcome to reach out again. However, we ask that you wait until you receive a response on your first request before sending another one, so our team can review everyone fairly and quickly."
  },
  {
    question: "Do I need to provide a lot of paperwork?",
    answer: "We keep the process as simple and human as possible. After you share your initial story, our team will let you know exactly what basic verification is needed. We do not want complicated rules or endless paperwork to stand in the way of your relief."
  },
  {
    question: "Will my personal story be shared publicly on this website?",
    answer: "Never without your clear permission. Your privacy is our absolute priority. The stories shared on our platform are from individuals who happily agreed to inspire others. Your personal request remains strictly confidential between you and our team."
  },
  {
    question: "Do I have to pay anything back?",
    answer: "No. This is direct, debt-free support. We only ask that when you are in a better position in life, you find a way to help someone else in your community."
  }
];

export function FaqPreviewSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one opens by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View className="bg-white py-24 md:py-32 px-6 border-t border-stone-200">
      <View className="max-w-4xl mx-auto">
        
        {/* Header */}
        <View className="text-center mb-16 md:mb-20 animate-on-load">
        
          <Text className="block text-4xl md:text-5xl font-bold text-edwin-black mb-6">
            Common Questions
          </Text>
          <Text className="block text-lg text-stone-600 max-w-2xl mx-auto">
            We believe you deserve straight answers. Here is exactly how our platform works.
          </Text>
        </View>

        {/* FAQ Accordion List */}
        <View className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <View 
                key={index} 
                className={`border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300 animate-on-load delay-${(index % 4) * 100 + 100} ${isOpen ? 'bg-[#F7F5F0] shadow-sm' : 'bg-white hover:border-stone-300'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <Text className="text-lg md:text-xl font-bold text-edwin-black pr-8">
                    {faq.question}
                  </Text>
                  
                  {/* Premium Animated Plus/Minus Icon */}
                  <View className={`w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? 'bg-edwin-navy border-edwin-navy text-white rotate-180' : 'bg-transparent text-stone-500'}`}>
                    <Text className="text-xl font-light leading-none relative -top-[1px]">
                      {isOpen ? '−' : '+'}
                    </Text>
                  </View>
                </button>
                
                {/* Smooth sliding answer container */}
                <View className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <View className="overflow-hidden">
                    <Text className="block px-6 pb-6 md:px-8 md:pb-8 text-base md:text-lg text-stone-600 leading-relaxed pt-2">
                      {faq.answer}
                    </Text>
                  </View>
                </View>

              </View>
            );
          })}
        </View>

        {/* Final push to apply */}
        <View className="text-center mt-16 animate-on-load delay-400">
          <a
            href="/apply"
            className="inline-block px-10 py-4 bg-edwin-navy text-white text-base font-bold rounded-full hover:bg-edwin-black transition-colors shadow-sm"
          >
            Ready to reach out? Start here.
          </a>
        </View>

      </View>
    </View>
  );
}