import { View, Text } from '@/components/Themed';

export function ProcessSection() {
  return (
    <View className="bg-[#F7F5F0] py-24 md:py-32 px-6 border-t border-stone-200">
      <View className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <View className="text-center max-w-2xl mx-auto mb-20 animate-on-load">
          <Text className="block text-sm font-bold tracking-[0.2em] text-stone-500 uppercase mb-4">
            The Process
          </Text>
          <Text className="block text-4xl md:text-5xl font-bold text-edwin-black leading-tight">
            Three simple steps to request support.
          </Text>
        </View>

        {/* The Steps Grid with Timeline Design */}
        <View className="relative">
          
          {/* Architectural Connecting Line (Hidden on mobile phones) */}
        <View className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-stone-200 z-0" />
          <View className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            
            <ProcessStep 
              number="1"
              title="Share Your Story"
              description="Fill out the secure form on our website. Tell us exactly what kind of help you are looking for and how it will change your life."
              delay="delay-100"
            />
            
            <ProcessStep 
              number="2"
              title="Personal Review"
              description="Our small, dedicated team reads every single message personally. We look for people who are ready to take the next step."
              delay="delay-200"
            />
            
            <ProcessStep 
              number="3"
              title="Direct Contact"
              description="If your request aligns with our current funding, we will email you directly from our secure address to arrange the support."
              delay="delay-300"
            />

          </View>
        </View>

      </View>
    </View>
  );
}

// Reusable micro-component for each step
function ProcessStep({ number, title, description, delay }: { number: string; title: string; description: string; delay: string }) {
  return (
    <View className={`animate-on-load ${delay} flex flex-col items-center text-center relative z-10`}>
      
      {/* Premium Number Badge with a background "ring" to seamlessly cut out the connecting line behind it */}
      <View className="w-16 h-16 rounded-full bg-edwin-navy text-white flex items-center justify-center text-2xl font-bold mb-8 shadow-md ring-8 ring-[#F7F5F0]">
        <Text>{number}</Text>
      </View>
      
      <Text className="block text-2xl font-bold text-edwin-black mb-4">{title}</Text>
      <Text className="block text-lg text-stone-600 leading-relaxed max-w-sm">{description}</Text>
    </View>
  );
}