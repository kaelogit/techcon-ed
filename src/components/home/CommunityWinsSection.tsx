'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { communityWins, type CommunityWin } from '@/data/community-wins';

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
    return () => { emblaApi.off('select', onSelect); };
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
    <section className="py-24 md:py-32 px-6 bg-[var(--warm-cream)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
            <p className="text-[var(--accent-gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Our Community
            </p>
            <span className="w-10 h-[2px] bg-[var(--accent-gold)]" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--deep-charcoal)] leading-tight mb-4">
            Real People. Real Support.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Meet the families and individuals whose lives have been touched across America.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleStories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border)] cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={story.images[0]}
                  alt={`${story.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {story.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Images className="w-3.5 h-3.5" />
                    {story.images.length}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-tight">{story.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {story.location}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{story.date}</span>
                </div>
                <span className="inline-block px-2 py-0.5 bg-[var(--trust)]/10 text-[var(--trust)] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                  {story.category}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {story.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-[var(--trust)] text-white rounded-full font-medium hover:bg-[var(--trust-light)] transition-colors shadow-lg hover:shadow-xl"
            >
              Load more stories
            </button>
          </div>
        )}

        {/* Modal / Lightbox */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white rounded-2xl border-0 gap-0">
            <DialogTitle className="sr-only">
              {selectedStory?.name} - Community Story
            </DialogTitle>

            {/* Image Carousel */}
            <div className="relative bg-gray-100">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                  {selectedStory?.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex-[0_0_100%] min-w-0 relative aspect-[3/4] max-h-[60vh]"
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
                    onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); scrollNext(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {selectedIndex + 1} / {selectedStory.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedStory?.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {selectedStory?.location}
                  </div>
                </div>
                <span className="text-sm text-gray-400">{selectedStory?.date}</span>
              </div>
              <span className="inline-block px-3 py-1 bg-[var(--trust)]/10 text-[var(--trust)] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                {selectedStory?.category}
              </span>
              <p className="text-gray-700 leading-relaxed">{selectedStory?.caption}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}