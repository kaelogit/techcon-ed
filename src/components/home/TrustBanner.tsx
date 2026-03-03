import { View, Text } from '@/components/Themed';

export function TrustBanner() {
  return (
    <View className="relative bg-edwin-navy py-24 md:py-32 px-6 overflow-hidden">
      
      {/* Subtle background glow to represent hope/new beginnings */}
      <View className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <View className="max-w-4xl mx-auto text-center relative z-10">
        
        <View className="animate-on-load">
          <Text className="block text-amber-400 text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Your New Chapter
          </Text>
          
          <Text className="block text-white text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            The chance to finally <br className="hidden sm:block" />
            move forward.
          </Text>
        </View>

        <View className="animate-on-load delay-200">
          <Text className="block text-slate-300 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Imagine waking up tomorrow without the weight of your biggest obstacle. Whether it is a dream for your family, a degree you have always wanted, or a home that needs healing—we are here to help you turn that "what if" into your new reality.
          </Text>
        </View>

        <View className="flex flex-col items-center gap-6 animate-on-load delay-300">
          <a 
            href="/apply" 
            className="inline-block px-12 py-5 bg-white text-edwin-navy text-lg font-bold rounded-full hover:bg-amber-400 hover:text-edwin-black transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            Start Your Request Now
          </a>
          
          <Text className="text-slate-400 text-sm font-medium">
            It takes less than five minutes to share your story.
          </Text>
        </View>

      </View>
    </View>
  );
}