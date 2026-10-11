import { HeroSection } from '@/components/home/HeroSection';
import { LiveTicker } from '@/components/home/LiveTicker';
import { WhyEdwinSection } from '@/components/home/WhyEdwinSection';
import { StatsBand } from '@/components/home/StatsBand';
import { SupportAreasSection } from '@/components/home/SupportAreasSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CommunityWinsSection } from '@/components/home/CommunityWinsSection';
import { FaqPreviewSection } from '@/components/home/FaqPreviewSection';
import { VerifySection } from '@/components/home/VerifySection';
import { ApplyCtaSection } from '@/components/home/ApplyCtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqs } from '@/data/faqs';
import { faqPageJsonLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <JsonLd data={faqPageJsonLd(faqs)} />
      <HeroSection />
      <LiveTicker />
      <WhyEdwinSection />
      <StatsBand />
      <SupportAreasSection />
      <ProcessSection />
      <CommunityWinsSection />
      <FaqPreviewSection />
      <VerifySection />
      <ApplyCtaSection />
    </div>
  );
}
