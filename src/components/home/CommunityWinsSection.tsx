'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronLeft, ChevronRight, Images, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { communityWins, type CommunityWin } from '@/data/community-wins';
import { SectionHeader } from '@/components/layout/SectionHeader';

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 9;

export function CommunityWinsSection() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedStory, setSelectedStory] = useState<CommunityWin | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const visibleStories = communityWins.slice(0, visibleCount);
  const hasMore = visibleCount < communityWins.length;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && selectedStory) {
      emblaApi.scrollTo(0);
      setSelectedIndex(0);
    }
  }, [emblaApi, selectedStory]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, communityWins.length));
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader
          label="Community"
          title="Real people. Real funding."
          description="Families, professionals, and builders whose next chapter moved forward — from recovery to growth to scale."
        />

        <div className="mt-12 grid grid-cols-1 gap-0 border border-[var(--edwin-line)] sm:grid-cols-2 lg:grid-cols-3">
          {visibleStories.map((story, idx) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setSelectedStory(story)}
              className={`group cursor-pointer border-[var(--edwin-line)] bg-white text-left transition-colors hover:bg-[var(--edwin-paper)] ${
                idx > 0 ? 'border-t' : ''
              } ${idx % 2 === 1 ? 'sm:border-l' : ''} ${idx % 3 !== 0 ? 'lg:border-l' : ''} ${
                idx >= 2 ? 'sm:border-t' : ''
              } ${idx >= 3 ? 'lg:border-t' : ''}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--edwin-paper)]">
                <Image
                  src={story.images[0]}
                  alt={story.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {story.images.length > 1 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[var(--trust)] px-2.5 py-1 text-xs text-white">
                    <Images className="h-3.5 w-3.5" />
                    {story.images.length}
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg text-[var(--trust)]">{story.name}</h3>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--edwin-muted)]">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-[var(--edwin-muted)]">{story.date}</span>
                </div>
                <p className="mb-3 font-display text-xs tracking-[0.14em] text-[var(--edwin-coral)]">
                  {story.category}
                </p>
                <p
                  className="line-clamp-3 text-sm leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                  style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
                >
                  {story.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {hasMore ? (
            <button type="button" onClick={handleLoadMore} className="btn-navy">
              Load more stories
            </button>
          ) : null}
          <Link href="/impact" className="btn-outline">
            Read full stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-3xl gap-0 overflow-hidden rounded-none border border-[var(--edwin-line)] bg-white p-0">
            <DialogTitle className="sr-only">{selectedStory?.name} — Community story</DialogTitle>

            <div className="relative bg-[var(--edwin-paper)]">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                  {selectedStory?.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] max-h-[60vh] min-w-0 flex-[0_0_100%]"
                    >
                      <Image
                        src={img}
                        alt={`${selectedStory.name} photo ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 768px"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {selectedStory && selectedStory.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollPrev();
                    }}
                    className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--edwin-line)] bg-white text-[var(--trust)]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollNext();
                    }}
                    className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-[var(--edwin-line)] bg-white text-[var(--trust)]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[var(--trust)] px-3 py-1 text-xs text-white">
                    {selectedIndex + 1} / {selectedStory.images.length}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl text-[var(--trust)]">{selectedStory?.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-[var(--edwin-muted)]">
                    <MapPin className="h-4 w-4" />
                    {selectedStory?.location}
                  </div>
                </div>
                <span className="text-sm text-[var(--edwin-muted)]">{selectedStory?.date}</span>
              </div>
              <p className="mb-3 font-display text-xs tracking-[0.14em] text-[var(--edwin-coral)]">
                {selectedStory?.category}
              </p>
              <p
                className="leading-relaxed text-[var(--edwin-muted)] normal-case tracking-normal"
                style={{ fontFamily: 'var(--font-sans)', textTransform: 'none' }}
              >
                {selectedStory?.caption}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
