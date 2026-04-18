'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, ArrowRight, Mail, Shield, Clock } from 'lucide-react';
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
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO */}
      <section className="bg-[var(--warm-cream)] pt-32 pb-20 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Start Your Journey
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-8 leading-tight">
            Tell us how we can <br className="hidden sm:block" />
            help you <span className="text-[var(--accent-gold)]">move forward</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your story matters. Whether it is a small hurdle or a massive life change, we are here to listen and provide the direct support you need to start your next chapter.
          </p>
        </div>
      </section>

      {/* PREP STEPS */}
      <section className="py-16 md:py-20 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <PrepStep 
            icon={<CheckCircle className="w-5 h-5" />}
            number="01" 
            title="Be Specific" 
            desc="The more details you share about your situation and the exact amount you need, the faster we can help."
          />
          <PrepStep 
            icon={<Mail className="w-5 h-5" />}
            number="02" 
            title="Check Your Email" 
            desc="Our team replies personally within minutes. Keep your phone nearby and remember to check your junk folder."
          />
          <PrepStep 
            icon={<Shield className="w-5 h-5" />}
            number="03" 
            title="Have Your ID Ready" 
            desc="Once we connect, we will ask for a standard ID just to make sure we are sending funds to the right person."
          />
        </div>
      </section>

      {/* FORM / SUCCESS */}
      <section className="py-20 md:py-28 px-6 bg-white" id="request-form">
        <div className="max-w-3xl mx-auto">
          
          {status === 'success' ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="Where should we reach you?"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* State & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="state" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Your State
                  </label>
                  <input
                    required
                    type="text"
                    id="state"
                    placeholder="e.g. California"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Support Type
                  </label>
                  <select
                    required
                    id="category"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all appearance-none cursor-pointer"
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
                </div>
              </div>

              {/* Story */}
              <div className="flex flex-col gap-2">
                <label htmlFor="story" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Share Your Story
                </label>
                <textarea
                  required
                  id="story"
                  rows={8}
                  placeholder="Tell us about your situation, exactly how much help you need, and how this will change your life..."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all resize-y"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  disabled={status === 'sending'}
                  type="submit"
                  className={`group w-full py-5 rounded-2xl text-lg font-semibold text-white transition-all shadow-xl flex items-center justify-center gap-3 ${
                    status === 'sending' 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[var(--trust)] hover:bg-[var(--trust-light)] hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Reviewing Submission...
                    </>
                  ) : (
                    <>
                      Submit Your Request
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 justify-center mt-6 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">Something went wrong. Please check your internet and try again.</p>
                  </div>
                )}
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-400 text-center">
                Your information is kept strictly confidential. Read our{" "}
                <Link href="/privacy" className="underline hover:text-[var(--accent-gold)] transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}

        </div>
      </section>

      {/* PRIVACY PROMISE */}
      <section className="bg-[var(--warm-cream)] py-20 px-6 border-t border-gray-100 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md">
            <Shield className="w-7 h-7 text-[var(--trust)]" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-gray-900">Your Privacy is Protected</h3>
          <p className="text-gray-500 leading-relaxed">
            Every word you share is handled with absolute respect and privacy. Your story will never be shared without your explicit permission. We are here only to help you rebuild.
          </p>
        </div>
      </section>

    </div>
  );
}

function PrepStep({ icon, number, title, desc }: { icon: React.ReactNode; number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--trust)] flex items-center justify-center text-white">
          {icon}
        </div>
        <span className="text-3xl font-light text-gray-300">{number}</span>
      </div>
      <h3 className="text-xl font-serif font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="bg-white border border-gray-100 p-8 md:p-14 rounded-3xl text-center shadow-2xl">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-200">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
        Your story is safe <br /> with us.
      </h2>

      <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
        Thank you for your honesty. Our support team has received your request and is reviewing it personally right now.
      </p>

      {/* Next Steps */}
      <div className="bg-[var(--warm-cream)] rounded-2xl p-8 text-left mb-10 border border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          Critical Next Steps
        </p>
        
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--trust)] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-600">
              Check your email in <strong className="text-gray-900">5-10 minutes</strong> for our response.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-600">
              Check your <strong className="text-gray-900">Spam or Junk</strong> folder immediately if you don't see our reply.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--trust)] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-600">
              Add <strong className="text-gray-900">support@edwinmega.com</strong> to your contacts to ensure safe delivery.
            </p>
          </div>
        </div>
      </div>

      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
      >
        Return to Home
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
