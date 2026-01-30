"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/i18n";
import { AirWavesIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
};

const carouselSlides = Array.from({ length: 15 }, (_, i) => {
  const imageNumber = i + 1;
  const extension = [4, 5, 6, 7, 11, 12, 13].includes(imageNumber) ? 'JPG' : 'jpg';
  
  return {
    id: imageNumber,
    image: `/servicos/servico${imageNumber}.${extension}`,
  };
});

export function PortfolioSection() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      id="portfolio" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 hidden md:block">
          <AirWavesIcon className="w-48 h-48 lg:w-64 lg:h-64" variant="white" />
        </div>
        <div className="absolute bottom-10 right-10 hidden md:block">
          <AirWavesIcon className="w-48 h-48 lg:w-64 lg:h-64" variant="white" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <span 
            className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
            style={{ color: COLORS.cyan }}
          >
            {t.portfolio.label}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 font-heading">
            {t.portfolio.title}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 px-1 md:px-2">
                  <div 
                    className="rounded-xl md:rounded-2xl overflow-hidden relative"
                    style={{
                      aspectRatio: "16/9",
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={`Serviço ${slide.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0, 50, 102, 0.4), transparent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon 
              className="w-5 h-5 md:w-6 md:h-6" 
              style={{ color: COLORS.navy }}
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRightIcon 
              className="w-5 h-5 md:w-6 md:h-6" 
              style={{ color: COLORS.navy }}
            />
          </button>

          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 md:h-3 rounded-full transition-all",
                  currentSlide === index
                    ? "w-6 md:w-8"
                    : "w-2 md:w-3 bg-white/30 hover:bg-white/50"
                )}
                style={currentSlide === index ? { backgroundColor: COLORS.cyan } : {}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
