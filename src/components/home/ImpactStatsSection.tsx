import { View, Text } from '@/components/Themed';

export function ImpactStatsSection() {
  return (
    <View className="bg-white py-16 md:py-32 px-6 relative z-20 border-b border-stone-100">
      <View className="max-w-7xl mx-auto">
        
        {/* Context Header */}
        <View className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-10 gap-6 animate-on-load">
          <View className="max-w-3xl">
            <Text className="block text-stone-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
              The Scale of Support
            </Text>
            <Text className="block text-2xl md:text-4xl font-light text-edwin-black leading-relaxed">
              A massive commitment to rebuilding neighborhoods and empowering people, without complicated rules or long delays.
            </Text>
          </View>
          <View className="flex items-center gap-3">
            <View className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Text className="text-stone-500 text-xs md:text-sm font-bold tracking-widest uppercase">
              Actively Reviewing
            </Text>
          </View>
        </View>

        {/* The 3-Pillar Grid */}
        <View className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          
          <StatBlock 
            value="50" 
            suffix="States" 
            label="National Reach" 
            desc="We are currently accepting and reading personal stories from every part of the country."
            delay="delay-100"
          />
          
          <StatBlock 
            value="7" 
            suffix="Focus Areas" 
            label="Complete Help" 
            desc="Providing funding for education, housing, local businesses, health, and senior care."
            delay="delay-200"
          />

          <StatBlock 
            value="100%" 
            suffix="Direct" 
            label="No Middlemen" 
            desc="Funding goes straight to the people and families who need it, passing no other agencies."
            delay="delay-300"
          />

        </View>
      </View>
    </View>
  );
}

// Reusable micro-component with an architectural left-border for mobile devices
function StatBlock({ value, suffix, label, desc, delay }: { value: string, suffix: string, label: string, desc: string, delay: string }) {
  return (
    <View className={`animate-on-load ${delay} flex flex-col border-l-2 border-stone-200 pl-6 md:border-none md:pl-0`}>
      <View className="flex items-baseline gap-2 mb-3 md:mb-4">
        <Text className="text-5xl md:text-7xl font-extrabold text-edwin-black tracking-tighter">{value}</Text>
        <Text className="text-xl md:text-2xl text-edwin-navy font-bold">{suffix}</Text>
      </View>
      <Text className="block text-lg md:text-xl font-bold text-edwin-black mb-2 md:mb-3">{label}</Text>
      <Text className="block text-base text-stone-600 leading-relaxed">{desc}</Text>
    </View>
  );
}