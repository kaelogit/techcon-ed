import { HeroSection } from '@/components/home/HeroSection';
import { VisionSection } from '@/components/home/VisionSection';
import { ImpactStatsSection } from '@/components/home/ImpactStatsSection';
import { SupportAreasSection } from '@/components/home/SupportAreasSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ImpactStoriesSection } from '@/components/home/ImpactStoriesSection';
import { FaqPreviewSection } from '@/components/home/FaqPreviewSection';
import { TrustBanner } from '@/components/home/TrustBanner';

export default function HomePage() {
  return (
    <div className='flex flex-col w-full'>
      <HeroSection />
      <ImpactStatsSection />
      <VisionSection />
      <SupportAreasSection />
      <ImpactStoriesSection />
      <ProcessSection />
      <FaqPreviewSection />
      <TrustBanner />
    </div>
  );
}

