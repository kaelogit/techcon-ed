import { View, Text } from '@/components/Themed';

export function HeroSection() {
  return (
    <View className="relative overflow-hidden bg-[#F7F5F0] pt-32 pb-24 md:pt-40 md:pb-32 px-6 border-b border-[#EBE8E0]">
      
      <View className="relative max-w-5xl mx-auto text-center z-10">
        
        
        {/* Scaled-down, readable headline for mobile */}
        <Text className="block text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-edwin-black mb-6 leading-[1.15] animate-on-load delay-100">
          Rebuilding lives. <br className="hidden sm:block" />
          Empowering your next chapter.
        </Text>
        
        {/* Softer, readable subtext */}
        <Text className="block text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-on-load delay-200">
          A personal initiative providing direct funding, stability, and growth for families, students, and neighborhoods across the United States. 
        </Text>
        
        {/* Refined Buttons */}
        <View className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-on-load delay-300">
          <a
            href="/apply"
            className="w-full sm:w-auto px-10 py-4 bg-edwin-navy text-white text-base font-bold rounded-full hover:bg-edwin-black transition-colors shadow-sm"
          >
            Request Funding Now
          </a>
          <a
            href="/story"
            className="w-full sm:w-auto px-10 py-4 bg-white text-edwin-black text-base font-bold rounded-full border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            Read The Vision
          </a>
        </View>

        {/* Reassuring, soft trust text */}
        <Text className="block mt-10 text-sm font-medium text-stone-400 animate-on-load delay-400">
          Currently reviewing stories from all 50 states.
        </Text>

      </View>
    </View>
  );
}