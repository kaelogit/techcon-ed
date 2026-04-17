'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';

// ALL STORIES PRESERVED EXACTLY AS PROVIDED
const stories = [
  {
    name: "The Martinez Family",
    location: "California",
    category: "Disaster Recovery Support",
    amount: "$420,000",
    paragraphs: [
      "When the Eaton Fire swept through Altadena, the Martinez family had less than an hour to evacuate. In that hour, they made impossible choices — important documents, a few clothes for the kids, their dog. Everything else was consumed by flames. Their home of 18 years, the place where birthdays were celebrated and milestones were marked on a hallway wall, was reduced to ash.",
      "Insurance covered only part of the rebuilding costs, and construction estimates kept rising. For months, the family lived in a cramped rental, their children asking daily when they could go home. The emotional toll was heavier than the financial one. Stability felt out of reach.",
      "Through the Edwin Castro Foundation, the Martinez family received $420,000 in recovery support. That support closed the gap insurance left behind and allowed them to rebuild on their original lot instead of leaving the community they loved.",
      "Today, their new home stands where the old one once did. Their children attend the same schools. Their neighbors remain the same familiar faces.",
      "\"We didn't just rebuild walls,\" Mrs. Martinez says. \"We rebuilt our sense of belonging. This support gave our children continuity, security, and hope after one of the darkest chapters of our lives.\""
    ]
  },
  {
    name: "James T.",
    location: "Texas",
    category: "Trade Education Support",
    amount: "$85,000",
    paragraphs: [
      "James grew up watching his mother work double shifts just to keep the lights on. From an early age, he promised himself he would learn a skill that could provide real stability. After high school, he enrolled in a competitive electrical technician program, but tuition, tools, certification exams, and living expenses quickly became overwhelming.",
      "He worked nights at a warehouse and attended classes during the day, often studying in his car between shifts. Exhaustion began to affect his grades. He considered dropping out more than once, not because he lacked ambition, but because he lacked resources.",
      "The Edwin Castro Foundation awarded James $85,000 in educational support. That support covered tuition, specialized equipment, exam fees, and allowed him to reduce his work hours to focus on mastering his trade.",
      "With renewed focus, James graduated at the top of his class. Today he works on large-scale infrastructure projects and earns more than triple his previous income. He has paid off family debts and helps mentor other young men entering skilled trades.",
      "\"This support didn't just pay for school,\" James says. \"It changed the trajectory of my entire family. I can finally build a future instead of constantly fighting to survive.\""
    ]
  },
  {
    name: "Sarah Jenkins",
    location: "Florida",
    category: "Community Youth Program Support",
    amount: "$150,000",
    paragraphs: [
      "Sarah started her neighborhood youth program with folding chairs, donated snacks, and a borrowed church hall. What began as a safe place for 12 children to do homework slowly grew into something bigger — a refuge from violence, instability, and negative influences surrounding their community.",
      "But growth created new challenges. Demand increased. More parents asked for help. Sarah had waiting lists. She lacked funding for tutoring materials, mental health counselors, and transportation. She worried daily about turning children away.",
      "The Edwin Castro Foundation provided $150,000 in community support. That funding allowed Sarah to secure a permanent facility, hire certified tutors and a part-time counselor, expand meal services, and purchase laptops for academic support.",
      "The program now serves 40 children consistently and reports significant improvements in grades and school attendance. Parents describe the center as life-changing.",
      "\"One child told me this place feels like a second home,\" Sarah says. \"That's what this support created. It didn't just expand a program. It expanded opportunity.\"",
      "She pauses before adding, \"We are not just changing afternoons. We are changing futures.\""
    ]
  },
  {
    name: "Robert & Angela Brooks",
    location: "North Carolina",
    category: "Medical Hardship Support",
    amount: "$210,000",
    paragraphs: [
      "Angela's diagnosis came suddenly — a rare autoimmune disorder that required immediate, aggressive treatment. Within months, medical bills stacked higher than their mortgage. Robert liquidated retirement savings and took out personal loans just to keep up with hospital visits, medication, and specialized therapy.",
      "Financial stress compounded emotional strain. The couple found themselves choosing between long-term financial stability and life-saving care. Angela worried more about burdening her family than about her illness.",
      "The Edwin Castro Foundation provided $210,000 in medical hardship support. That funding covered advanced treatment procedures not fully insured, physical therapy, specialized medications, and outstanding hospital balances.",
      "For the first time in months, the Brooks family could focus solely on healing instead of survival. Angela's condition stabilized. Robert no longer lies awake at night calculating debt.",
      "\"This support gave us back peace,\" Angela shares. \"Healing requires more than medicine. It requires security. We are deeply grateful.\""
    ]
  },
  {
    name: "Elena M.",
    location: "Arizona",
    category: "Small Business Stabilization Support",
    amount: "$60,000",
    paragraphs: [
      "Elena built her catering company from her kitchen, one event at a time. Over a decade, she created jobs for relatives and neighbors. When economic downturn hit, bookings vanished almost overnight. Equipment payments and rent remained. Payroll deadlines loomed.",
      "She considered closing permanently, fearing she would have to lay off staff who depended on her business for income.",
      "The Edwin Castro Foundation provided $60,000 in stabilization support. That funding covered equipment upgrades, marketing relaunch, and operating expenses during the slow recovery period.",
      "Within a year, bookings returned stronger than before. Elena expanded into corporate catering and now employs 11 people full-time.",
      "\"This support preserved more than my business,\" she says. \"It protected the livelihoods of families connected to it.\""
    ]
  },
  {
    name: "David L.",
    location: "Illinois",
    category: "Housing Stability Support",
    amount: "$95,000",
    paragraphs: [
      "David spent 17 years working for the same manufacturing company. When corporate restructuring eliminated his department, he lost his job with little warning. At first, he believed he would find new work quickly. But months passed. Savings dwindled. Mortgage payments fell behind.",
      "Each notice from the bank felt heavier than the last. David's greatest fear was not losing the house itself, but losing the stability it provided for his two daughters. That house represented security, consistency, and the only home his children had ever known.",
      "The Edwin Castro Foundation provided $95,000 in housing stability support. The funding covered mortgage arrears, prevented foreclosure, and allowed David breathing room while completing a professional certification program in logistics management.",
      "Today, David is employed in a new role with higher long-term earning potential. His daughters still sleep in their own bedrooms. The family remains in the community they love.",
      "\"I felt like I was failing my kids,\" David shares. \"This support restored more than my home. It restored my confidence as a father. It gave me time to reset instead of collapse.\""
    ]
  },
  {
    name: "Aisha Rahman",
    location: "Michigan",
    category: "STEM Education Support",
    amount: "$120,000",
    paragraphs: [
      "Aisha always excelled in science and mathematics. Growing up in a low-income household, she often studied under dim lighting to conserve electricity and shared textbooks with classmates. Her dream was to become a biomedical engineer and design affordable medical devices for underserved communities.",
      "She earned admission into a top engineering program but faced a harsh reality — tuition, housing, and lab fees exceeded what her family could manage. Scholarships covered only part of the cost. She considered deferring enrollment despite years of hard work.",
      "The Edwin Castro Foundation awarded Aisha $120,000 in comprehensive educational support. That funding covered tuition gaps, housing, books, lab equipment, and research materials for the duration of her program.",
      "Freed from financial anxiety, Aisha immersed herself in research and internships. She now works on developing lower-cost prosthetic technology that could significantly reduce medical expenses for patients nationwide.",
      "\"This support allowed me to focus on innovation instead of invoices,\" Aisha says. \"One day, the devices I design will improve thousands of lives. That ripple effect began with someone believing in my potential.\""
    ]
  },
  {
    name: "Marcus Hill",
    location: "Ohio",
    category: "Veteran Home Modification Support",
    amount: "$180,000",
    paragraphs: [
      "After serving overseas, Marcus returned home with service-related injuries that permanently affected his mobility. Simple daily tasks — climbing stairs, bathing safely, moving between rooms — became painful and frustrating challenges. His home, once a place of comfort, became an obstacle course.",
      "VA benefits helped, but they did not fully cover the cost of extensive renovations needed to make the house accessible. Marcus felt increasingly dependent on others, which weighed heavily on his pride.",
      "The Edwin Castro Foundation provided $180,000 in support to renovate Marcus's home. The modifications included wheelchair-accessible entrances, widened hallways, a fully redesigned bathroom, smart home technology, and structural adjustments that restored independence.",
      "Today, Marcus navigates his home freely. He no longer requires daily assistance for basic tasks. His sense of dignity has returned.",
      "\"I served my country with honor,\" Marcus says. \"This support honored me in return. Independence is priceless, and now I have it back.\""
    ]
  },
  {
    name: "The Riverbend Youth Sports League",
    location: "Missouri",
    category: "Community Development Support",
    amount: "$90,000",
    paragraphs: [
      "The Riverbend Youth Sports League operated for years with outdated equipment, cracked courts, and volunteer coaches who stretched limited resources as far as possible. Despite challenges, the league provided a safe outlet for over 120 children in an area where structured activities were limited.",
      "However, declining facilities and safety concerns threatened closure. Without intervention, hundreds of kids would lose a structured, positive environment.",
      "The Edwin Castro Foundation provided $90,000 in community support. Funding repaired courts, replaced unsafe equipment, installed lighting for evening practices, and funded coaching certifications.",
      "Participation has since increased, and the league reports improved attendance and academic engagement among players. Parents describe noticeable changes in discipline and confidence.",
      "\"For many kids here, sports are more than games,\" one coach explains. \"They are structure, mentorship, and belonging. This support preserved all of that.\""
    ]
  },
  {
    name: "Naomi Chen",
    location: "Washington",
    category: "Medical Innovation Support",
    amount: "$250,000",
    paragraphs: [
      "Naomi, a mechanical engineer, dedicated her career to developing affordable prosthetic limbs for low-income patients. Traditional prosthetics can cost tens of thousands of dollars, placing them far out of reach for many families.",
      "Her early prototypes showed promise, but scaling production required advanced materials, lab testing, and regulatory compliance processes — all expensive barriers.",
      "The Edwin Castro Foundation provided $250,000 in innovation support. The funding allowed Naomi to secure lab space, complete clinical testing, refine designs, and begin small-scale production.",
      "Today, her startup produces prosthetic devices at a fraction of traditional costs. Early recipients report restored mobility and improved quality of life.",
      "\"This support accelerated years of work into months,\" Naomi says. \"The true impact isn't measured in dollars. It's measured in people walking confidently again.\""
    ]
  },
  {
    name: "Harold Benson",
    location: "Alabama",
    category: "Agricultural Recovery Support",
    amount: "$140,000",
    paragraphs: [
      "Harold Benson's family farm had been passed down for three generations. The land carried more than crops — it carried history, identity, and legacy. But after two consecutive seasons of severe drought followed by unexpected flooding, Harold faced catastrophic losses. Equipment repairs, seed replacement, irrigation damage, and unpaid supplier invoices pushed the farm to the brink of collapse.",
      "Banks were hesitant to extend additional credit due to previous weather-related claims. Harold feared he would be the one who lost what his grandfather built with his bare hands.",
      "The Edwin Castro Foundation provided $140,000 in agricultural recovery support. The funding repaired irrigation systems, replaced damaged machinery, covered operational gaps, and allowed Harold to invest in climate-resilient farming technology.",
      "Today, the farm is not only operational but stronger than before. Harold has diversified crops and implemented sustainable irrigation systems to prevent future losses.",
      "\"I thought I was going to be the generation that failed,\" Harold shares. \"This support protected more than farmland. It protected our family's legacy and the livelihood of everyone who works beside me.\""
    ]
  },
  {
    name: "Jasmine Carter",
    location: "California",
    category: "Single Parent Advancement Support",
    amount: "$45,000",
    paragraphs: [
      "After leaving an abusive relationship, Jasmine found herself raising her four-year-old son alone. She worked retail during the day and cleaned offices at night. Childcare costs consumed most of her income, leaving little room for career advancement.",
      "Jasmine dreamed of becoming a licensed medical assistant, but tuition, certification exams, and reliable childcare felt financially impossible. She feared remaining stuck in a cycle of exhaustion and instability.",
      "The Edwin Castro Foundation provided $45,000 in advancement support. The funding covered her certification program, childcare services, transportation, and essential living expenses during her training period.",
      "With stable support, Jasmine completed her certification in under a year. She now works full-time at a medical clinic with benefits and consistent hours, allowing her to be present for her son in ways she never could before.",
      "\"For the first time, I can plan beyond next week,\" Jasmine says. \"This support gave my son a stronger foundation. He sees his mom thriving, not just surviving.\""
    ]
  },
  {
    name: "The Northside Learning Collective",
    location: "New York",
    category: "Educational Infrastructure Support",
    amount: "$500,000",
    paragraphs: [
      "Serving over 300 low-income students, the Northside Learning Collective struggled with outdated classrooms, limited technology, and deteriorating facilities. Teachers worked tirelessly, but insufficient resources limited the quality of education students could receive.",
      "Computer labs were outdated. Science equipment was decades old. Students shared textbooks that were falling apart. Despite strong leadership, funding gaps continued to widen.",
      "The Edwin Castro Foundation provided $500,000 in educational infrastructure support. The funding modernized classrooms, upgraded science laboratories, installed new computer labs, improved HVAC systems, and created scholarship funds for graduating seniors.",
      "Within a year, student test scores improved measurably. Attendance rates increased. Teachers reported higher engagement and confidence among students.",
      "\"This support didn't just upgrade buildings,\" the school director explains. \"It upgraded opportunity. Our students now compete on equal footing. That changes life trajectories.\""
    ]
  },
  {
    name: "Carlos Vega",
    location: "Nevada",
    category: "Minority-Owned Business Expansion Support",
    amount: "$70,000",
    paragraphs: [
      "Carlos started his mobile auto repair business with one van and basic tools. His goal was simple: provide affordable, honest repair services to working families. Demand grew quickly, but without capital to hire additional technicians or upgrade equipment, he had to turn customers away daily.",
      "He knew expansion was possible but lacked access to traditional financing due to limited credit history.",
      "The Edwin Castro Foundation provided $70,000 in business expansion support. With the funding, Carlos purchased advanced diagnostic equipment, hired two certified mechanics, and added two additional service vans.",
      "Today, his company serves hundreds of customers monthly and provides stable employment to five families. Revenue has more than doubled, and Carlos is developing a mentorship program for aspiring mechanics.",
      "\"This support wasn't charity,\" Carlos says. \"It was empowerment. It allowed me to create jobs and build something sustainable for my community.\""
    ]
  },
  {
    name: "The Ortega Family",
    location: "Colorado",
    category: "Disaster Relocation Support",
    amount: "$275,000",
    paragraphs: [
      "When severe flooding damaged the Ortega family's home beyond repair, they were displaced overnight. Insurance coverage fell short of full rebuilding costs due to structural complications and updated zoning requirements. The family of five moved between temporary rentals, uncertain where they would settle permanently.",
      "The emotional impact on their children was immediate — new schools, unfamiliar neighborhoods, constant instability. The uncertainty weighed heavily on everyone.",
      "The Edwin Castro Foundation provided $275,000 in relocation and rebuilding support. The funding allowed the family to secure safe housing within their original community and cover rebuilding costs not covered by insurance.",
      "Within months, construction began on a new home built to withstand future environmental risks. Stability returned.",
      "\"Our children stopped asking when we were going home,\" Mrs. Ortega shares. \"Now they know. This support gave us permanence again.\""
    ]
  },
  {
    name: "The Greenwood Rural Health Clinic",
    location: "Mississippi",
    category: "Healthcare Expansion Support",
    amount: "$650,000",
    paragraphs: [
      "For years, the Greenwood Rural Health Clinic served five surrounding counties with only two physicians and limited diagnostic equipment. Patients often drove over an hour for specialized care because the clinic lacked imaging technology, updated exam rooms, and adequate staffing.",
      "The community relied heavily on this clinic. Elderly residents, uninsured families, and low-income workers had few alternatives. Long wait times and limited resources created strain, yet the staff remained deeply committed.",
      "The Edwin Castro Foundation provided $650,000 in healthcare expansion support. The funding allowed the clinic to purchase modern diagnostic equipment, renovate patient rooms, expand telehealth services, and hire two additional nurse practitioners and one full-time physician.",
      "Within a year, patient capacity increased by nearly 40%. Preventative screenings rose significantly, and emergency hospital transfers decreased. Residents now receive timely care without leaving their community.",
      "\"Our patients feel seen and valued,\" the clinic director shares. \"This support didn't just upgrade equipment. It strengthened the health of entire counties.\""
    ]
  },
  {
    name: "Danielle Rivers",
    location: "Pennsylvania",
    category: "Domestic Violence Survivor Housing Support",
    amount: "$200,000",
    paragraphs: [
      "Danielle left an abusive marriage with nothing but a suitcase and her two children. She entered a shelter with no savings, limited employment history, and a deep sense of uncertainty. While safe, the temporary housing could not provide long-term stability.",
      "She worked tirelessly to rebuild her life, but securing permanent housing required deposits, childcare, and reliable transportation — barriers that felt insurmountable.",
      "The Edwin Castro Foundation provided $200,000 in comprehensive survivor support. The funding secured permanent housing, covered childcare, provided career training assistance, and established a financial stability plan.",
      "Danielle now works full-time in a healthcare administrative role and lives in a safe apartment with her children. For the first time in years, her family experiences calm evenings free from fear.",
      "\"This support gave us safety and independence,\" Danielle says. \"It gave my children peace. That is something I can never fully repay.\""
    ]
  },
  {
    name: "The Horizon Mental Wellness Center",
    location: "Oregon",
    category: "Community Mental Health Support",
    amount: "$375,000",
    paragraphs: [
      "The Horizon Mental Wellness Center provided counseling services to underserved populations but struggled with limited staff and growing demand. Post-pandemic, anxiety and depression cases surged, particularly among teens and young adults.",
      "Therapists were overbooked for months. Some clients waited weeks for appointments, increasing risk factors for vulnerable individuals.",
      "The Edwin Castro Foundation provided $375,000 in mental health support. The funding expanded therapy rooms, hired licensed counselors, implemented group therapy programs, and subsidized care for uninsured patients.",
      "Within a year, wait times dropped significantly. More than 800 additional individuals received counseling services. Schools in the region reported improved behavioral outcomes among referred students.",
      "\"Access to mental health care saves lives,\" the center's clinical director explains. \"This support ensured that no one in crisis was left waiting.\""
    ]
  },
  {
    name: "Malik Thompson",
    location: "Georgia",
    category: "Technology Startup Acceleration Support",
    amount: "$300,000",
    paragraphs: [
      "Malik, a software engineer, developed a logistics platform designed to help small trucking companies optimize routes and reduce fuel costs. His prototype demonstrated strong potential but lacked capital for scaling, regulatory compliance, and enterprise-level infrastructure.",
      "Without funding, he risked shelving years of innovation.",
      "The Edwin Castro Foundation provided $300,000 in startup acceleration support. The funding secured cloud infrastructure, expanded development teams, and supported pilot testing across three states.",
      "Within 18 months, Malik's platform reduced operational costs for participating companies by up to 18%. The startup now employs 22 people and continues expanding.",
      "\"This support turned an idea into impact,\" Malik says. \"We're not just building software. We're strengthening small businesses nationwide.\""
    ]
  },
  {
    name: "The Westbrook Scholarship Fund",
    location: "South Carolina",
    category: "Educational Endowment Support",
    amount: "$750,000",
    paragraphs: [
      "The Westbrook Scholarship Fund served high-achieving students from low-income households but struggled to maintain long-term sustainability. Donations fluctuated annually, making it difficult to guarantee multi-year support for scholars.",
      "The Edwin Castro Foundation provided $750,000 in endowment support — the largest contribution in the program's history. The funding created a permanent scholarship reserve ensuring that qualifying students would receive consistent financial assistance year after year.",
      "The endowment now supports full tuition packages, housing assistance, and mentorship programs for dozens of students annually.",
      "\"This support created generational opportunity,\" the program director shares. \"We can now promise stability to students who have already overcome so much.\"",
      "One scholarship recipient summarized it simply: \"Someone believed in our potential enough to invest in our future permanently.\""
    ]
  }
];

export function ImpactStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance every 15 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 15000); 
    
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
      setIsFading(false);
    }, 300);
  };

  const goToStory = (index: number) => {
    if (index === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 300);
  };

  const currentStory = stories[currentIndex];

  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--deep-charcoal)] relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full bg-[var(--trust)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Real Stories
            </p>
            <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Rebuilding futures, one family at a time.
          </h2>
        </div>

        {/* Story Card */}
        <div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          {/* Top Info Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[var(--trust)]/10 text-[var(--trust)] text-xs font-bold uppercase tracking-wider rounded-full">
                  {currentStory.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{currentStory.name}</h3>
                <span className="text-gray-400">—</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentStory.location}
                </span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 px-5 py-3 rounded-xl self-start md:self-auto">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                Funding Provided
              </p>
              <p className="text-2xl md:text-3xl font-serif font-bold text-emerald-700">
                {currentStory.amount}
              </p>
            </div>
          </div>

          {/* Story Content */}
          <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="space-y-5 mb-10">
              {currentStory.paragraphs.map((paragraph, idx) => {
                // Check if this is the final quote paragraph
                if (idx === currentStory.paragraphs.length - 1 && paragraph.startsWith("\"")) {
                  return (
                    <blockquote 
                      key={idx} 
                      className="relative mt-8 pl-6 border-l-4 border-[var(--accent-gold)]"
                    >
                      <Quote className="absolute -left-3 -top-2 w-6 h-6 text-[var(--accent-gold)] bg-white" />
                      <p className="text-lg md:text-xl font-serif italic text-gray-800 leading-relaxed">
                        {paragraph}
                      </p>
                    </blockquote>
                  );
                }
                return (
                  <p key={idx} className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Controls & Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 pt-6 gap-4">
            {/* Progress Dots */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToStory(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-[var(--accent-gold)]' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to story ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-sm font-medium text-gray-400 order-1 sm:order-2">
              Story <span className="text-gray-900 font-semibold">{currentIndex + 1}</span> of {stories.length}
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-3 order-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                aria-label="Previous Story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[var(--trust)] text-white flex items-center justify-center hover:bg-[var(--trust-light)] transition-all shadow-lg"
                aria-label="Next Story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
