import { View, Text } from '@/components/Themed';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="bg-edwin-navy pt-24 pb-12 px-6 border-t border-slate-800">
      <View className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: THE SIGNATURE */}
        <View className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Pillar */}
          <View className="lg:col-span-6">
            <Text className="block text-3xl font-black tracking-widest uppercase text-white mb-8">
              Edwin Castro
            </Text>
            <Text className="block text-xl text-slate-300 max-w-md leading-relaxed font-light">
              Providing direct, life-changing support to families and neighborhoods. A personal commitment to rebuilding communities across the United States.
            </Text>
          </View>

          {/* Navigation Pillar */}
          <View className="lg:col-span-3">
            <Text className="block font-bold text-slate-100 mb-6 uppercase tracking-[0.2em] text-xs">
              Platform
            </Text>
            <View className="flex flex-col gap-4">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors text-lg">Home</Link>
              <Link href="/story" className="text-slate-300 hover:text-white transition-colors text-lg">The Vision</Link>
              <Link href="/apply" className="text-slate-300 hover:text-white transition-colors text-lg">Request Support</Link>
              <Link href="/faq" className="text-slate-300 hover:text-white transition-colors text-lg">Common Questions</Link>
            </View>
          </View>

          {/* Contact Pillar */}
          <View className="lg:col-span-3">
            <Text className="block font-bold text-slate-100 mb-6 uppercase tracking-[0.2em] text-xs">
              Get In Touch
            </Text>
            <View className="flex flex-col gap-4">
              <Text className="text-slate-300 block text-sm uppercase font-bold tracking-widest">General Support</Text>
              <a 
                href="mailto:support@edwinmega.com" 
                className="text-white font-bold text-lg hover:text-slate-300 transition-colors break-words"
              >
                support@edwinmega.com
              </a>
              <View className="mt-4 pt-4 border-t border-slate-700">
                <Text className="text-slate-400 text-xs leading-relaxed italic">
                  Responses are typically sent within minutes during active review hours.
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* BOTTOM SECTION: THE LEGAL & TRUST FOOTNOTE */}
        <View className="pt-12 border-t border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <View className="flex flex-col gap-2">
            <Text className="text-sm font-bold text-slate-200 uppercase tracking-widest">
              © {currentYear} Edwin Castro
            </Text>
            <Text className="text-xs text-slate-400">
              Direct Community Support Initiative. 100% Debt-Free Funding.
            </Text>
          </View>

          <View className="flex flex-wrap gap-x-8 gap-y-4">
            <Link href="/privacy" className="text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-white">Terms</Link>
            <Link href="/security" className="text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-white">Security</Link>
          </View>

          <View className="hidden lg:block">
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
              Empowering The Next Chapter
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}