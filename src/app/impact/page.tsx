'use client';

import { useState } from 'react';
import { View, Text } from '@/components/Themed';
import Link from 'next/link';

const categories = ["All", "Housing", "Education", "Health", "Business", "Community"];

const stories = [
  {
    name: "The Martinez Family",
    location: "California",
    category: "Housing",
    amount: "$420,000",
    story: [
      "When the Eaton Fire swept through Altadena, we had less than an hour to evacuate. We made impossible choices — important documents, a few clothes for our kids, our dog. We watched from the road as everything we owned was consumed by flames.",
      "Our home of 18 years was reduced to ash. For months, we lived in a cramped rental, our children asking daily when they could go home. The emotional toll was heavier than the financial one. Stability felt out of reach.",
      "Through the Edwin Castro team, we received $420,000 in recovery support. It closed the gap insurance left behind and allowed us to rebuild on our original lot instead of leaving the community we loved.",
      "“We didn’t just rebuild walls,” we always say. “We rebuilt our sense of belonging. This support gave our children hope after our darkest chapter.”"
    ]
  },
  {
    name: "James T.",
    location: "Texas",
    category: "Education",
    amount: "$85,000",
    story: [
      "I grew up watching my mother work double shifts just to keep the lights on. I promised myself I would learn a skill that could provide real stability. After high school, I got into a competitive electrical program, but tuition and tools quickly became more than I could afford.",
      "I worked nights at a warehouse and attended classes during the day, often studying in my car. I almost dropped out, not because I lacked ambition, but because I lacked resources.",
      "The $85,000 in support I received covered my tuition and specialized equipment, letting me focus on my trade. Today, I work on large-scale projects and earn triple my previous income. I’ve paid off family debts and now I mentor others entering the trades.",
      "“This didn’t just pay for school,” I tell people. “It changed the trajectory of my entire family.”"
    ]
  },
  {
    name: "Sarah Jenkins",
    location: "Florida",
    category: "Community",
    amount: "$150,000",
    story: [
      "I started my neighborhood youth program with folding chairs and borrowed space. We were a safe place for 12 children, but as we grew, I had to start a waiting list. I lacked the funding for tutors, counselors, and transportation.",
      "Receiving $150,000 allowed us to secure a permanent facility and hire professional staff. We now serve 40 children every day, and seeing their grades improve and their confidence grow is the greatest reward.",
      "“We are not just changing afternoons,” I always say. “We are changing the futures of these kids.”"
    ]
  },
  {
    name: "Robert & Angela Brooks",
    location: "North Carolina",
    category: "Health",
    amount: "$210,000",
    story: [
      "My diagnosis came suddenly. Within months, our medical bills were higher than our mortgage. I liquidated my retirement savings just to keep up with the treatments. I was choosing between our long-term stability and my life-saving care.",
      "This support provided $210,000 that covered advanced treatments our insurance wouldn't touch. For the first time in months, we could focus on healing instead of survival.",
      "“This support gave us back our peace,” Angela says. “Healing requires security, and we are deeply grateful.”"
    ]
  },
  {
    name: "Elena M.",
    location: "Arizona",
    category: "Business",
    amount: "$60,000",
    story: [
      "I built my catering company from my kitchen over a decade. I created jobs for my neighbors and family. When the bookings vanished overnight during the downturn, I feared I would have to lay off everyone who depended on me.",
      "The $60,000 in stabilization support preserved more than my business; it protected the livelihoods of 11 families connected to it. We are back stronger than ever now.",
      "“This didn’t just save a company,” I tell my staff. “It saved our community connection.”"
    ]
  },
  {
    name: "David L.",
    location: "Illinois",
    category: "Housing",
    amount: "$95,000",
    story: [
      "After 17 years at the same company, I lost my job with almost no warning. My savings dwindled, and my mortgage payments fell behind. My greatest fear was losing the only home my two daughters had ever known.",
      "The $95,000 in housing support covered our arrears and prevented foreclosure. It gave me the breathing room to finish a certification program and find a new, better role.",
      "“I felt like I was failing my kids,” I admit. “This restored my confidence as a father. It gave us time to reset instead of collapse.”"
    ]
  },
  {
    name: "Aisha Rahman",
    location: "Michigan",
    category: "Education",
    amount: "$120,000",
    story: [
      "I always dreamed of becoming a biomedical engineer to design devices for underserved communities. I got into a top program, but tuition and lab fees were far beyond what my family could manage.",
      "The $120,000 in support allowed me to focus on innovation instead of invoices. Today, I’m working on lower-cost prosthetic technology that will improve thousands of lives.",
      "“Someone believed in my potential,” I say. “And now I can use that belief to help others walk again.”"
    ]
  },
  {
    name: "Marcus Hill",
    location: "Ohio",
    category: "Community",
    amount: "$180,000",
    story: [
      "After serving overseas, I returned home with injuries that made simple tasks like climbing stairs or bathing safely a constant struggle. My home had become an obstacle course that made me feel dependent and frustrated.",
      "The $180,000 renovation support changed everything. We widened hallways and redesigned the bathroom so I can move freely. I have my independence back.",
      "“I served my country with honor,” I tell my friends. “This support honored me in return.”"
    ]
  },
  {
    name: "Riverbend Youth League",
    location: "Missouri",
    category: "Community",
    amount: "$90,000",
    story: [
      "We operated for years with cracked courts and outdated gear. We were the only safe outlet for 120 children, but safety concerns almost forced us to close our doors forever.",
      "The $90,000 in support repaired our courts and replaced our unsafe equipment. Participation has jumped, and we see our kids showing more discipline and confidence in school.",
      "“For our kids, sports are more than games,” our coach explains. “They are mentorship and belonging. This support saved that.”"
    ]
  },
  {
    name: "Naomi Chen",
    location: "Business",
    category: "Business",
    amount: "$250,000",
    story: [
      "As a mechanical engineer, I dedicated my career to making affordable prosthetic limbs. My prototypes worked, but I lacked the capital to scale production and help the families waiting for them.",
      "This $250,000 investment allowed us to secure lab space and begin small-scale production. We are now producing devices at a fraction of traditional costs.",
      "“This accelerated years of work into months,” I say. “The true impact is seeing people walk confidently again.”"
    ]
  },
  {
    name: "Harold Benson",
    location: "Alabama",
    category: "Business",
    amount: "$140,000",
    story: [
      "My family farm has been our legacy for three generations. But after drought and flooding hit us back-to-back, I faced catastrophic losses. I feared I would be the one who lost what my grandfather built.",
      "The $140,000 in recovery support repaired our systems and let us invest in better technology. The farm is not only running; it's stronger than ever.",
      "“I thought I was the generation that would fail,” I share. “This support protected our history and our future.”"
    ]
  },
  {
    name: "Jasmine Carter",
    location: "California",
    category: "Education",
    amount: "$45,000",
    story: [
      "Raising my son alone after leaving an abusive relationship was the hardest thing I’ve ever done. I worked retail and cleaned offices, but I dreamed of becoming a medical assistant for a better life.",
      "The $45,000 in support covered my training and childcare so I could study. I’m now a licensed assistant with a stable career and benefits for my son.",
      "“For the first time, I can plan beyond next week,” I say. “My son sees me thriving, not just surviving.”"
    ]
  },
  {
    name: "Northside Learning",
    location: "New York",
    category: "Education",
    amount: "$500,000",
    story: [
      "We serve 300 students, but our classrooms were outdated and our technology was failing. Our students deserve to learn on equal footing with the rest of the country.",
      "Receiving $500,000 allowed us to modernize our labs and upgrade our computer systems. Our attendance is up, and our students are more engaged than ever.",
      "“We didn’t just upgrade buildings,” we say. “We upgraded opportunity for every student who walks through these doors.”"
    ]
  },
  {
    name: "Carlos Vega",
    location: "Nevada",
    category: "Business",
    amount: "$70,000",
    story: [
      "I started my auto repair business with one van. Demand grew fast, but I couldn't get the financing to hire more mechanics or buy new equipment. I was turning away families who needed help.",
      "The $70,000 expansion support let me buy diagnostic tools and hire two certified mechanics. We now serve hundreds of customers and support five local families with good jobs.",
      "“This wasn’t charity; it was empowerment,” I say. “It allowed me to build something sustainable for my community.”"
    ]
  },
  {
    name: "The Ortega Family",
    location: "Colorado",
    category: "Housing",
    amount: "$275,000",
    story: [
      "When the flooding damaged our home beyond repair, we were displaced overnight. We moved between temporary rentals, and the uncertainty was breaking our children’s hearts.",
      "The $275,000 in rebuilding support allowed us to secure safe housing back in our original community. We have permanence again.",
      "“Our children stopped asking when we were going home,” we share. “Now they know. We are finally stable.”"
    ]
  },
  {
    name: "Greenwood Health Clinic",
    location: "Mississippi",
    category: "Health",
    amount: "$650,000",
    story: [
      "We serve five counties, but we lacked the imaging tools and staffing to provide the care our patients deserved. People were driving over an hour just for basic tests.",
      "The $650,000 expansion support let us buy modern equipment and hire more physicians. Our capacity is up 40%, and our patients are getting the care they need right here at home.",
      "“Our patients feel seen and valued,” we say. “This strengthened the health of our entire community.”"
    ]
  },
  {
    name: "Danielle Rivers",
    location: "Pennsylvania",
    category: "Housing",
    amount: "$200,000",
    story: [
      "I left with nothing but a suitcase and my two children. I was safe in a shelter, but I had no way to afford a permanent home or reliable childcare to get a job.",
      "The $200,000 in support secured our apartment and helped with my career training. I have a full-time role now and a safe place for my kids to sleep.",
      "“This gave us independence,” I say. “It gave my children peace. That is something I can never fully repay.”"
    ]
  },
  {
    name: "Horizon Mental Wellness",
    location: "Oregon",
    category: "Health",
    amount: "$375,000",
    story: [
      "After the pandemic, our counseling requests surged. We were overbooked for months, and I knew people in crisis were being left waiting. It was heartbreaking.",
      "The $375,000 in support let us hire more licensed counselors and expand our therapy rooms. Our wait times have dropped, and we’ve helped 800 more people this year alone.",
      "“Access to care saves lives,” we believe. “This ensured no one in our community was left waiting in the dark.”"
    ]
  },
  {
    name: "Malik Thompson",
    location: "Georgia",
    category: "Business",
    amount: "$300,000",
    story: [
      "I developed a platform to help small trucking companies save on fuel costs. I had a great prototype, but without capital for infrastructure, I was going to have to give up on it.",
      "The $300,000 in acceleration support let us expand our team and run pilots in three states. We’ve already reduced costs for small businesses by 18% and we’re still growing.",
      "“This turned an idea into real-world impact,” I say. “We’re strengthening small businesses every day.”"
    ]
  },
  {
    name: "Westbrook Scholarship Fund",
    location: "South Carolina",
    category: "Education",
    amount: "$750,000",
    story: [
      "We help high-achieving students from low-income homes, but we struggled to guarantee funding year after year. Our students were always worried their scholarships would disappear.",
      "The $750,000 endowment created a permanent reserve for our scholars. We can now promise them stability throughout their entire college career.",
      "“This created generational opportunity,” we share. “Someone believed in our students enough to invest in their future permanently.”"
    ]
  }
];

export default function ImpactPage() {
  const [filter, setFilter] = useState("All");

  const filteredStories = filter === "All" 
    ? stories 
    : stories.filter(s => s.category === filter);

  return (
    <View className="min-h-screen bg-[#F9F8F6]">
      
      {/* HERO SECTION */}
      <View className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 bg-white border-b border-stone-100">
        <View className="max-w-4xl mx-auto text-center animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Voices of Change
          </Text>
          <Text className="block text-4xl md:text-7xl font-bold text-edwin-black mb-8 leading-tight">
            Real stories from <br className="hidden md:block" />
            the people we serve.
          </Text>
          <Text className="block text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            These are not just statistics. These are our neighbors, students, and families sharing their journey from hardship to hope in their own words.
          </Text>
        </View>
      </View>

      {/* FILTER BAR */}
      <View className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 px-6">
        <View className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                filter === cat 
                ? 'bg-edwin-navy text-white shadow-md' 
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </View>
      </View>

      {/* STORIES GRID */}
      <View className="py-16 md:py-24 px-6">
        <View className="max-w-7xl mx-auto">
          <View className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </View>
        </View>
      </View>

      {/* FINAL CALL TO ACTION */}
      <View className="py-24 bg-edwin-navy text-center px-6">
        <View className="max-w-3xl mx-auto">
          <Text className="block text-3xl md:text-5xl font-bold text-white mb-8">
            Your story could be next.
          </Text>
          <Link 
            href="/apply" 
            className="inline-block px-12 py-5 bg-white text-edwin-navy text-lg font-bold rounded-full hover:bg-amber-400 hover:text-edwin-black transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Request Support
          </Link>
        </View>
      </View>

    </View>
  );
}

function StoryCard({ name, location, category, amount, story }: any) {
  return (
    <View className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-200 shadow-sm flex flex-col animate-on-load">
      <View className="flex justify-between items-start mb-10">
        <View>
          <Text className="block text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-1">{category}</Text>
          <Text className="block text-2xl font-black text-edwin-black tracking-tight">{name}</Text>
          <Text className="block text-sm font-medium text-stone-400">{location}</Text>
        </View>
        <View className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
          <Text className="block text-lg font-black text-emerald-700">{amount}</Text>
        </View>
      </View>
      
      <View className="space-y-6 flex-1">
        {story.map((p: string, i: number) => {
           // Highlight the closing quote if it exists
           const isQuote = p.includes("“") || p.includes("”");
           return (
            <Text key={i} className={`block text-base leading-relaxed ${isQuote ? 'italic text-edwin-black font-semibold border-l-4 border-amber-400 pl-6 py-2 bg-stone-50 rounded-r-xl' : 'text-stone-600 font-light'}`}>
              {p}
            </Text>
           );
        })}
      </View>
    </View>
  );
}