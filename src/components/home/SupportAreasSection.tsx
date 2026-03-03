import { View, Text } from '@/components/Themed';

// Reusable Card with hover effects and staggered load animations
function SupportCard({ title, description, delay }: { title: string; description: string; delay: string }) {
  return (
    <View 
      className={`bg-white p-8 md:p-10 border border-stone-200 rounded-[2rem] shadow-sm hover:-translate-y-2 hover:shadow-premium transition-all duration-500 animate-on-load ${delay} group flex flex-col`}
    >
      {/* Abstract, elegant icon replacement */}
      <View className="w-12 h-12 rounded-full bg-[#F7F5F0] flex items-center justify-center mb-6 group-hover:bg-edwin-navy transition-colors duration-500">
        <View className="w-3 h-3 rounded-full bg-edwin-navy group-hover:bg-white transition-colors duration-500" />
      </View>
      
      <Text className="block text-2xl font-bold text-edwin-black mb-4">{title}</Text>
      <Text className="block text-base text-stone-600 leading-relaxed">{description}</Text>
    </View>
  );
}

export function SupportAreasSection() {
  return (
    <View className="bg-[#FAFAF9] py-24 md:py-32 px-6 border-b border-stone-200">
      <View className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <View className="text-center max-w-2xl mx-auto mb-16 md:mb-20 animate-on-load">
          <Text className="block text-stone-500 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            How We Can Help
          </Text>
          <Text className="block text-4xl md:text-5xl font-bold text-edwin-black leading-tight">
            Direct funding for the things that matter most.
          </Text>
        </View>
        
        {/* The Grid with Staggered Delays */}
        <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          <SupportCard 
            title="Education" 
            description="Funding for school supplies, university costs, and learning a professional trade." 
            delay="delay-100"
          />
          
          <SupportCard 
            title="Housing" 
            description="Assistance for families affected by disasters or those needing a stable place to live." 
            delay="delay-200"
          />
          
          <SupportCard 
            title="Community" 
            description="Supporting local neighborhood projects, youth sports, and children's homes." 
            delay="delay-300"
          />
          
          <SupportCard 
            title="Health & Wellness" 
            description="Help with medical needs and making sure people can get the care they require." 
            delay="delay-100" // Resetting delay for the next row so it flows naturally
          />
          
          <SupportCard 
            title="Small Business" 
            description="Providing a start for local shops and neighborhood creators to grow." 
            delay="delay-200"
          />
          
          <SupportCard 
            title="Senior Support" 
            description="Making sure our elderly neighbors have the comfort and daily needs they deserve." 
            delay="delay-300"
          />
          
        </View>

      </View>
    </View>
  );
}