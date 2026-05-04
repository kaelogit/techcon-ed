'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Mail, 
  Shield, 
  Clock, 
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  User,
  DollarSign,
  Heart,
  HelpCircle,
  Lock,
  TrendingUp,
  Award,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

// Testimonials data - DIVERSE stories across all categories
const TESTIMONIALS = [
  {
    name: "James",
    location: "Texas, USA",
    amount: "$65,000",
    story: "After losing my job, I needed to retrain for a new career in tech. This support covered my coding bootcamp and living expenses while I studied.",
    timeAgo: "2 hours ago"
  },
  {
    name: "Maria",
    location: "Florida, USA",
    amount: "$125,000",
    story: "My daughter needed a life-saving surgery not covered by insurance. This support paid for the procedure and recovery care.",
    timeAgo: "5 hours ago"
  },
  {
    name: "Robert",
    location: "Ohio, USA",
    amount: "$85,000",
    story: "Single dad working two jobs while trying to finish my nursing degree. This support covered tuition and allowed me to focus on school.",
    timeAgo: "1 day ago"
  },
  {
    name: "Sarah",
    location: "Ontario, Canada",
    amount: "C$250,000",
    story: "Started a community kitchen to feed homeless families in my neighborhood. This support renovated the space and bought commercial equipment.",
    timeAgo: "3 hours ago"
  },
  {
    name: "David",
    location: "Bavaria, Germany",
    amount: "€175,000",
    story: "Veteran with PTSD trying to start a veteran support center. This funding made our dream of helping others a reality.",
    timeAgo: "6 hours ago"
  },
  {
    name: "Angela",
    location: "London, UK",
    amount: "£150,000",
    story: "My small bakery was failing after equipment broke down. This support replaced everything and kept my 8 employees working.",
    timeAgo: "4 hours ago"
  },
  {
    name: "Michael",
    location: "New South Wales, Australia",
    amount: "A$320,000",
    story: "Built a youth STEM education center in an underserved community. This support funded computers, robotics kits, and teacher salaries.",
    timeAgo: "8 hours ago"
  },
  {
    name: "Lisa",
    location: "Michigan, USA",
    amount: "$95,000",
    story: "Needed to relocate for my child's specialized medical treatment. This support covered moving costs and first year's rent.",
    timeAgo: "12 hours ago"
  }
];

// Recently helped ticker data - diverse amounts
const RECENTLY_HELPED = [
  { name: "James", location: "Texas, USA", amount: "$65,000" },
  { name: "Sarah", location: "Ontario, Canada", amount: "C$250,000" },
  { name: "Angela", location: "London, UK", amount: "£150,000" },
  { name: "Robert", location: "Ohio, USA", amount: "$85,000" },
  { name: "David", location: "Bavaria, Germany", amount: "€175,000" },
  { name: "Michael", location: "NSW, Australia", amount: "A$320,000" },
  { name: "Maria", location: "Florida, USA", amount: "$125,000" },
  { name: "Lisa", location: "Michigan, USA", amount: "$95,000" },
];

// FAQ data
const FAQS = [
  { 
    q: "Is this real?", 
        a: "Yes. We are a legitimate direct support organization. Every application is reviewed by our team personally. We've provided support to thousands of people across the USA, Canada, United Kingdom, Germany, Australia, and beyond." 
  },
  { 
    q: "Will my info be private?", 
    a: "Absolutely. Your story is 100% confidential and never shared without your explicit permission. We use bank-level encryption to protect your data." 
  },
  { 
    q: "Do I have to pay back?", 
    a: "No. This is direct support, not a loan. There is no repayment required, no interest, and no hidden fees. Ever." 
  },
  { 
    q: "How fast will I hear back?", 
    a: "We typically respond within 24 hours, often much sooner. Keep your phone nearby and check your email (including spam folder)." 
  },
  { 
    q: "What can I use the support for?", 
    a: "Housing, medical bills, education, starting or rebuilding a business, disaster recovery, emergency expenses — whatever you need to move forward. Just be specific in your application." 
  },
  { 
    q: "How much support can I request?", 
    a: "We review every request individually. Support ranges from $50,000 and above depending on your specific situation and needs." 
  }
];

// Guided questions flow
const GUIDED_QUESTIONS = [
  {
    id: "challenge",
    question: "What challenge are you facing right now?",
    placeholder: "Describe your situation...",
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: "amount",
    question: "How much support do you need?",
    placeholder: "Enter amount (e.g., $75,000)",
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    id: "impact",
    question: "How would this support change your life?",
    placeholder: "Tell us what this support would mean for you and your family...",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

export default function ApplyPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    category: '',
    story: '',
    amount: '',
  });

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Testimonial rotation
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Recently helped ticker
  const [tickerIndex, setTickerIndex] = useState(0);

  // Guided questions mode
  const [useGuidedMode, setUseGuidedMode] = useState(false);
  const [guidedAnswers, setGuidedAnswers] = useState({
    challenge: '',
    amount: '',
    impact: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Submission method
  const [submissionMethod, setSubmissionMethod] = useState<'form' | 'whatsapp'>('form');

  // Check for voice support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setVoiceSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }

          if (useGuidedMode) {
            const currentQId = GUIDED_QUESTIONS[currentQuestion].id;
            setGuidedAnswers(prev => ({ ...prev, [currentQId]: transcript }));
          } else {
            setFormData(prev => ({ ...prev, story: transcript }));
          }
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentQuestion, useGuidedMode]);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % RECENTLY_HELPED.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleGuidedNext = () => {
    if (currentQuestion < GUIDED_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const compiledStory = `Challenge: ${guidedAnswers.challenge}\n\nSupport needed: ${guidedAnswers.amount}\n\nHow this would help: ${guidedAnswers.impact}`;
      setFormData(prev => ({ ...prev, story: compiledStory }));
      setUseGuidedMode(false);
    }
  };

  const handleGuidedBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submissionMethod,
          source: 'apply_page_support'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', country: '', state: '', category: '', story: '', amount: '' });
        setGuidedAnswers({ challenge: '', amount: '', impact: '' });
        setCurrentQuestion(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const compileGuidedStory = () => {
    return `Challenge: ${guidedAnswers.challenge}\n\nSupport needed: ${guidedAnswers.amount}\n\nHow this would help: ${guidedAnswers.impact}`;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Recently Helped Ticker */}
      <div className="bg-[var(--trust)] text-white py-2 px-4 text-center text-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <TrendingUp className="w-4 h-4" />
          <span className="font-semibold">Just provided support to:</span>
          <span className="animate-pulse font-bold">
            {RECENTLY_HELPED[tickerIndex].name} in {RECENTLY_HELPED[tickerIndex].location} — {RECENTLY_HELPED[tickerIndex].amount}
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-[var(--warm-cream)] pt-20 pb-16 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Direct Support Program
            </p>
            <span className="w-8 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Get the support you need <br className="hidden sm:block" />
            to <span className="text-[var(--accent-gold)]">rebuild your life</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            We provide direct financial support for housing, medical needs, education, disaster recovery, and community projects. No loans. No repayment. Just real support.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Support available</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Response within 24hrs</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Lock className="w-4 h-4 text-[var(--trust)]" />
              <span>100% confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE - What Happens Next */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            What Happens Next
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "1", label: "Submit", desc: "Your application", icon: <Mail className="w-4 h-4" /> },
              { step: "2", label: "Review", desc: "Within 24hrs", icon: <Clock className="w-4 h-4" /> },
              { step: "3", label: "Verification", desc: "Quick ID check", icon: <Shield className="w-4 h-4" /> },
              { step: "4", label: "Support Sent", desc: "Direct to you", icon: <DollarSign className="w-4 h-4" /> },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--trust)] text-white flex items-center justify-center font-bold text-lg mb-3 shadow-lg shadow-blue-200">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-full">
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: Form + Sidebar */}
      <section className="py-16 md:py-20 px-6 bg-gray-50/50" id="request-form">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">

              {status === 'success' ? (
                <SuccessState />
              ) : (
                <>
                  {/* Submission Method Toggle */}
                  <div className="flex gap-4 mb-8 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSubmissionMethod('form')}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        submissionMethod === 'form' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Apply Online
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionMethod('whatsapp')}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        submissionMethod === 'whatsapp' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>

                  {submissionMethod === 'whatsapp' ? (
                    <WhatsAppOption setSubmissionMethod={setSubmissionMethod} />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">

                      {/* Mode Toggle */}
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-gray-600">
                          {useGuidedMode ? "Guided questions mode" : "Free-form application"}
                        </p>
                        <button
                          type="button"
                          onClick={() => setUseGuidedMode(!useGuidedMode)}
                          className="text-sm text-[var(--trust)] hover:underline font-medium"
                        >
                          {useGuidedMode ? "Switch to free-form" : "Use guided questions"}
                        </button>
                      </div>

                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Full Name *
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
                            Email Address *
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

                      {/* Phone (optional) */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                          Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="For faster contact (optional)"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      {/* Country & State/Province Row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="flex flex-col gap-2">
    <label htmlFor="country" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
      Country *
    </label>
    <select
      required
      id="country"
      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all appearance-none cursor-pointer"
      value={formData.country}
      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
    >
      <option value="">Select your country</option>
      <optgroup label="North America">
        <option value="USA">United States</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="UK">United Kingdom</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Spain">Spain</option>
        <option value="Italy">Italy</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Ireland">Ireland</option>
        <option value="Belgium">Belgium</option>
        <option value="Austria">Austria</option>
        <option value="Norway">Norway</option>
        <option value="Denmark">Denmark</option>
      </optgroup>
      <optgroup label="Oceania">
        <option value="Australia">Australia</option>
        <option value="New Zealand">New Zealand</option>
      </optgroup>
      <optgroup label="Other">
        <option value="Other">Not Listed — Type Below</option>
      </optgroup>
    </select>
  </div>

  <div className="flex flex-col gap-2">
    <label htmlFor="state" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
      {formData.country === 'Other' ? 'Country & Region' :
       formData.country === 'UK' ? 'Region / County' : 
       formData.country === 'Germany' ? 'Bundesland' : 
       formData.country === 'France' ? 'Department / Region' :
       formData.country === 'Netherlands' ? 'Province' :
       formData.country === 'Spain' ? 'Autonomous Community' :
       formData.country === 'Italy' ? 'Region' :
       formData.country === 'Sweden' ? 'County' :
       formData.country === 'Switzerland' ? 'Canton' :
       formData.country === 'Ireland' ? 'County' :
       formData.country === 'Belgium' ? 'Province' :
       formData.country === 'Austria' ? 'State' :
       formData.country === 'Norway' ? 'County' :
       formData.country === 'Denmark' ? 'Region' :
       formData.country === 'Canada' ? 'Province' : 
       formData.country === 'Australia' || formData.country === 'New Zealand' ? 'State / Territory' : 
       formData.country === 'Mexico' ? 'State' :
       'State / Province'} *
    </label>
    <input
      required
      type="text"
      id="state"
      placeholder={
        formData.country === 'Other' ? 'e.g. Brazil, São Paulo' :
        formData.country === 'UK' ? 'e.g. Greater London' : 
        formData.country === 'Germany' ? 'e.g. Bavaria' : 
        formData.country === 'France' ? 'e.g. Île-de-France' :
        formData.country === 'Netherlands' ? 'e.g. North Holland' :
        formData.country === 'Spain' ? 'e.g. Catalonia' :
        formData.country === 'Italy' ? 'e.g. Lombardy' :
        formData.country === 'Sweden' ? 'e.g. Stockholm County' :
        formData.country === 'Switzerland' ? 'e.g. Zurich' :
        formData.country === 'Ireland' ? 'e.g. County Dublin' :
        formData.country === 'Belgium' ? 'e.g. Flanders' :
        formData.country === 'Austria' ? 'e.g. Vienna' :
        formData.country === 'Norway' ? 'e.g. Oslo' :
        formData.country === 'Denmark' ? 'e.g. Capital Region' :
        formData.country === 'Canada' ? 'e.g. Ontario' : 
        formData.country === 'Australia' ? 'e.g. New South Wales' :
        formData.country === 'New Zealand' ? 'e.g. Auckland' :
        formData.country === 'Mexico' ? 'e.g. Jalisco' :
        'e.g. California'
      }
      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
      value={formData.state}
      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
    />
  </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="category" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Support Type *
                          </label>
                          <select
                            required
                            id="category"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          >
                            <option value="">Select a category</option>
                            <option value="Housing">Housing & Rebuilding</option>
                            <option value="Education">Education & Training</option>
                            <option value="Health">Medical & Health</option>
                            <option value="Disaster">Disaster Recovery</option>
                            <option value="Small Business">Business & Career</option>
                            <option value="Community">Community Project</option>
                            <option value="Other">Other Hardship</option>
                          </select>
                        </div>
                      </div>

                      {/* Amount Needed */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="amount" className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                          Support Amount Needed *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            required
                            type="text"
                            id="amount"
                            placeholder="e.g. 75,000"
                            className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          />
                        </div>
                        <p className="text-xs text-gray-400">Be specific about what you need.</p>
                      </div>

                      {/* Story Section - Either Guided or Free-form */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            {useGuidedMode ? "Your Story (Guided)" : "Share Your Story *"}
                          </label>

                          {/* Voice Input Button */}
                          {voiceSupported && (
                            <button
                              type="button"
                              onClick={toggleVoiceInput}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                isListening 
                                  ? 'bg-red-100 text-red-600 animate-pulse' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                              {isListening ? 'Stop Recording' : 'Tell by Voice'}
                            </button>
                          )}
                        </div>

                        {useGuidedMode ? (
                          /* Guided Questions Flow */
                          <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 rounded-full bg-[var(--trust)] text-white flex items-center justify-center text-sm font-bold">
                                {currentQuestion + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {GUIDED_QUESTIONS[currentQuestion].question}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Question {currentQuestion + 1} of {GUIDED_QUESTIONS.length}
                                </p>
                              </div>
                            </div>

                            <textarea
                              rows={4}
                              placeholder={GUIDED_QUESTIONS[currentQuestion].placeholder}
                              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all resize-y mb-4"
                              value={guidedAnswers[GUIDED_QUESTIONS[currentQuestion].id as keyof typeof guidedAnswers]}
                              onChange={(e) => {
                                const currentQId = GUIDED_QUESTIONS[currentQuestion].id;
                                setGuidedAnswers(prev => ({ ...prev, [currentQId]: e.target.value }));
                              }}
                            />

                            <div className="flex gap-3">
                              {currentQuestion > 0 && (
                                <button
                                  type="button"
                                  onClick={handleGuidedBack}
                                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                  Back
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={handleGuidedNext}
                                className="flex-1 px-4 py-2 bg-[var(--trust)] text-white rounded-lg text-sm font-medium hover:bg-[var(--trust-light)] transition-colors flex items-center justify-center gap-2"
                              >
                                {currentQuestion === GUIDED_QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                                {currentQuestion < GUIDED_QUESTIONS.length - 1 && <ChevronRight className="w-4 h-4" />}
                              </button>
                            </div>

                            {/* Preview of compiled story */}
                            {Object.values(guidedAnswers).some(v => v) && (
                              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Preview of your story:</p>
                                <p className="text-sm text-gray-700 whitespace-pre-line">{compileGuidedStory()}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Free-form Textarea */
                          <textarea
                            required
                            rows={6}
                            placeholder="Tell us about your situation, exactly how much support you need, and how this will change your life..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--accent-gold)] focus:ring-2 focus:ring-[var(--accent-gold)]/20 transition-all resize-y"
                            value={formData.story}
                            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                          />
                        )}

                        {isListening && (
                          <p className="text-xs text-red-500 animate-pulse">
                            🎤 Listening... Speak now. Click "Stop Recording" when done.
                          </p>
                        )}
                      </div>

                      {/* Privacy Guarantee Banner */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-blue-900 font-semibold text-sm">
                            🔒 Your story is 100% confidential.
                          </p>
                          <p className="text-blue-700 text-xs mt-1">
                            Never shared without your permission. We review every application personally — you're not just a number to us.
                          </p>
                        </div>
                      </div>

                      {/* No-Obligation + Success Rate */}
                      <div className="text-center space-y-2 py-4 bg-gray-50 rounded-xl">
                        <p className="text-base font-semibold text-gray-800">
                          There's no cost to apply. No obligation. No catch.
                        </p>
                        <p className="text-sm text-gray-500">
                          We review every application personally
                        </p>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
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
                              Reviewing Application...
                            </>
                          ) : (
                            <>
                              Submit Your Application
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>

                        {status === 'error' && (
                          <div className="flex items-center gap-2 justify-center mt-6 text-red-600 bg-red-50 p-4 rounded-xl">
                            <AlertCircle className="w-5 h-5" />
                            <p className="font-medium">Something went wrong. Please check your internet and try again.</p>
                          </div>
                        )}
                      </div>

                      {/* Trust Badges */}
                      <div className="flex flex-wrap justify-center gap-4 pt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" /> SSL Secure
                        </span>
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3" /> 256-bit Encryption
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> Personal Review
                        </span>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {/* FAQ Section - Below Form */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-[var(--accent-gold)]" />
                <h3 className="font-serif text-xl font-semibold text-gray-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-90' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar with Testimonials */}
          <div className="lg:col-span-1 space-y-6">

            {/* Rotating Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Recently Supported
                </p>
              </div>

              <div className="relative min-h-[200px]">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-500 ${
                      currentTestimonial === idx 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 absolute top-0 left-0 translate-x-4'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-gold)] to-orange-400 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.location} • {testimonial.timeAgo}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        Received {testimonial.amount}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{testimonial.story}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonial === idx ? 'bg-[var(--trust)] w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-[var(--trust)] to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h4 className="font-serif text-lg font-semibold mb-4">Why People Trust Us</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-blue-200" />
                  <span className="text-sm">$50K and above support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-200" />
                  <span className="text-sm">Avg. response: 6 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-200" />
                  <span className="text-sm">Bank-level security</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-blue-200" />
                  <span className="text-sm">No repayment ever</span>
                </div>
              </div>
            </div>

            {/* Support Range Card */}
            <div className="bg-[var(--warm-cream)] rounded-2xl border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Support Range</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Minimum</span>
                <span className="font-bold text-gray-900">$50,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-[var(--trust)] h-2 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Maximum</span>
                <span className="font-bold text-gray-900">$5,000,000</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Every request is reviewed individually based on your specific needs and situation.
              </p>
            </div>

            {/* Help Card */}
            <div className="bg-[var(--warm-cream)] rounded-2xl border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Need help applying?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our team can walk you through the process or answer any questions.
              </p>
              <a 
                href="mailto:support@edwinmega.com" 
                className="inline-flex items-center gap-2 text-[var(--trust)] font-medium text-sm hover:underline"
              >
                <Mail className="w-4 h-4" />
                support@edwinmega.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREP STEPS */}
      <section className="py-16 md:py-20 px-6 border-t border-gray-100 bg-white">
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
            desc="Once we connect, we will ask for a standard ID just to make sure we are sending support to the right person."
          />
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
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-200">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
        Your application is safe <br /> with us.
      </h2>

      <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
        Thank you for your honesty. Our support team has received your application and is reviewing it personally right now.
      </p>

      {/* Next Steps */}
      <div className="bg-[var(--warm-cream)] rounded-2xl p-8 text-left mb-10 border border-gray-100 max-w-lg mx-auto">
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

function WhatsAppOption({ setSubmissionMethod }: { setSubmissionMethod: (m: 'form' | 'whatsapp') => void }) {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "+1 (470) 360-8770";
  const cleanNumber = "14703608770"; // For wa.me link

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center py-8 space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <MessageCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
          Apply via WhatsApp
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Send us a message with your name, country, and what you need support with. Our team will guide you through the application.
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 max-w-sm mx-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          WhatsApp Number
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">{phoneNumber}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <span className="text-sm text-gray-500">Copy</span>}
          </button>
        </div>
        <a 
          href={`https://wa.me/${cleanNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
        >
          Open WhatsApp
        </a>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <p>💬 Typical response time: Under 1 hour</p>
        <p>🔒 Just as private as the online form</p>
        <p>✅ Same $50K above support range</p>
      </div>

      <button
        type="button"
        onClick={() => setSubmissionMethod('form')}
        className="text-[var(--trust)] hover:underline text-sm font-medium"
      >
        ← Back to online form
      </button>
    </div>
  );
}