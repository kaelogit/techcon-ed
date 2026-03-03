'use client';

import { useState } from 'react';
import { View, Text } from '@/components/Themed';
import Link from 'next/link';

export default function ApplyPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: '',
    category: '',
    story: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', state: '', category: '', story: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <View className="min-h-screen bg-white">
      
      {/* SECTION 1: THE ENCOURAGEMENT HERO */}
      <View className="bg-[#F7F5F0] pt-32 pb-20 px-6 border-b border-stone-200">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-4xl md:text-6xl font-bold text-edwin-black mb-8 leading-tight">
            Tell us how we can <br className="hidden sm:block" />
            help you move forward.
          </Text>
          <Text className="block text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Your story matters. Whether it is a small hurdle or a massive life change, we are here to listen and provide the direct support you need to start your next chapter.
          </Text>
        </View>
      </View>

      {/* SECTION 2: THE SIMPLE PREP */}
      <View className="py-16 md:py-24 px-6 border-b border-stone-100">
        <View className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <PrepStep 
            number="01" 
            title="Be Specific" 
            desc="The more details you share about your situation and the exact amount you need, the faster we can help."
          />
          <PrepStep 
            number="02" 
            title="Check Your Email" 
            desc="Our team replies personally within minutes. Keep your phone nearby and remember to check your junk folder."
          />
          <PrepStep 
            number="03" 
            title="Have Your ID Ready" 
            desc="Once we connect, we will ask for a standard ID just to make sure we are sending funds to the right person."
          />
        </View>
      </View>

      {/* SECTION 3: THE REQUEST FORM / SUCCESS STATE */}
      <View className="py-20 md:py-32 px-6 bg-white" id="request-form">
        <View className="max-w-3xl mx-auto">
          
          {status === 'success' ? (
            <View className="bg-white border border-stone-100 p-8 md:p-16 rounded-[3rem] text-center shadow-2xl animate-on-load">
              <View className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-emerald-200">
                <Text className="text-white text-4xl font-bold">✓</Text>
              </View>

              <Text className="block text-3xl md:text-4xl font-black text-edwin-black mb-6">
                Your story is safe <br /> with us.
              </Text>

              <Text className="block text-lg text-stone-500 leading-relaxed mb-12 max-w-md mx-auto">
                Thank you for your honesty. Our support team has received your request and is reviewing it personally right now.
              </Text>

              {/* ACTION ROADMAP */}
              <View className="bg-[#F9F8F6] rounded-2xl p-8 text-left mb-12 border border-stone-100">
                <Text className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-6">Critical Next Steps</Text>
                
                <View className="space-y-6">
                  <View className="flex gap-4">
                    <View className="w-6 h-6 rounded-full bg-edwin-navy flex items-center justify-center shrink-0">
                      <Text className="text-[10px] text-white font-bold">1</Text>
                    </View>
                    <Text className="text-sm text-stone-600 font-medium">
                      Check your email in <strong className="text-edwin-black">5-10 minutes</strong> for our response.
                    </Text>
                  </View>

                  <View className="flex gap-4">
                    <View className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
                      <Text className="text-[10px] text-edwin-black font-bold">!</Text>
                    </View>
                    <Text className="text-sm text-stone-600 font-medium">
                      Check your <strong className="text-edwin-black">Spam or Junk</strong> folder immediately if you don&apos;t see our reply.
                    </Text>
                  </View>

                  <View className="flex gap-4">
                    <View className="w-6 h-6 rounded-full bg-edwin-navy flex items-center justify-center shrink-0">
                      <Text className="text-[10px] text-white font-bold">2</Text>
                    </View>
                    <Text className="text-sm text-stone-600 font-medium">
                      Add <strong className="text-edwin-black">support@edwinmega.com</strong> to your contacts to ensure safe delivery.
                    </Text>
                  </View>
                </View>
              </View>

              <Link 
                href="/"
                className="inline-block text-xs font-black text-stone-400 uppercase tracking-widest hover:text-edwin-black transition-colors"
              >
                Return to Home
              </Link>
            </View>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 animate-on-load delay-100">
              <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <View className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-black text-stone-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-6 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-edwin-navy transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </View>

                <View className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-black text-stone-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="Where should we reach you?"
                    className="w-full px-6 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-edwin-navy transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </View>
              </View>

              <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <View className="flex flex-col gap-2">
                  <label htmlFor="state" className="text-xs font-black text-stone-400 uppercase tracking-widest pl-1">Your State</label>
                  <input
                    required
                    type="text"
                    id="state"
                    placeholder="e.g. California"
                    className="w-full px-6 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-edwin-navy transition-all"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </View>

                <View className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-black text-stone-400 uppercase tracking-widest pl-1">Support Type</label>
                  <select
                    required
                    id="category"
                    className="w-full px-6 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-edwin-navy transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="Housing">Housing & Shelter</option>
                    <option value="Education">Education & Trade</option>
                    <option value="Health">Health & Wellness</option>
                    <option value="Small Business">Small Business / Career</option>
                    <option value="Community">Community Project</option>
                    <option value="Other">Other Personal Hardship</option>
                  </select>
                </View>
              </View>

              <View className="flex flex-col gap-2">
                <label htmlFor="story" className="text-xs font-black text-stone-400 uppercase tracking-widest pl-1">Share Your Story</label>
                <textarea
                  required
                  id="story"
                  rows={8}
                  placeholder="Tell us about your situation, exactly how much help you need, and how this will change your life..."
                  className="w-full px-6 py-5 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-edwin-navy transition-all"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                />
              </View>

              <View className="pt-4">
                <button
                  disabled={status === 'sending'}
                  type="submit"
                  className={`w-full py-6 rounded-full text-lg font-black text-white transition-all shadow-xl uppercase tracking-widest ${status === 'sending' ? 'bg-stone-400 cursor-not-allowed' : 'bg-edwin-navy hover:bg-edwin-black active:scale-[0.98]'}`}
                >
                  {status === 'sending' ? 'Reviewing Submission...' : 'Submit Your Request'}
                </button>
                {status === 'error' && (
                  <Text className="block text-center mt-6 text-red-600 font-bold">Something went wrong. Please check your internet and try again.</Text>
                )}
              </View>
            </form>
          )}

        </View>
      </View>

      {/* SECTION 4: THE PRIVACY PROMISE */}
      <View className="bg-[#F9F8F6] py-20 px-6 border-t border-stone-200 text-center">
        <View className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <View className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm">
            <Text className="text-xl">🔒</Text>
          </View>
          <Text className="block text-2xl font-bold text-edwin-black">Your Privacy is Protected</Text>
          <Text className="block text-stone-500 leading-relaxed font-light">
            Every word you share is handled with absolute respect and privacy. Your story will never be shared without your explicit permission. We are here only to help you rebuild.
          </Text>
        </View>
      </View>

    </View>
  );
}

function PrepStep({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <View className="flex flex-col gap-4 animate-on-load">
      <Text className="text-3xl font-light text-stone-300">{number}</Text>
      <Text className="text-xl font-bold text-edwin-black">{title}</Text>
      <Text className="text-stone-500 leading-relaxed font-light">{desc}</Text>
    </View>
  );
}