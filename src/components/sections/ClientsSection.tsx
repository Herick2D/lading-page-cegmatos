"use client";

import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/i18n";
import Image from "next/image";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
  dark: "#353132",
};

// Default number of clients to render. Update as new images are added to /public/clients
const NUM_CLIENTS = 16;

const clients = Array.from({ length: NUM_CLIENTS }, (_, i) => ({
  id: i + 1,
  image: `/clients/client${i + 1}.png`,
  alt: `Cliente ${i + 1}`,
}));

// For smooth infinite loop we duplicate the slides (tripled) and start in the middle copy
const displayedClients = [...clients, ...clients, ...clients];
const ORIG_LEN = clients.length;

export function ClientsSection() {
  const { t } = useI18n();

  const [visible, setVisible] = useState(5);
  // start in the middle copy for seamless looping
  const [index, setIndex] = useState(ORIG_LEN);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const pages = Math.max(1, Math.ceil(clients.length / visible));

  const updateVisible = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    if (w >= 1024) setVisible(5);
    else if (w >= 768) setVisible(4);
    else if (w >= 640) setVisible(3);
    else setVisible(2);
  }, []);

  useEffect(() => {
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [updateVisible]);

  useEffect(() => {
    // reset index when visible changes to keep bounds
    setIndex((i) => Math.min(i, Math.max(0, clients.length - visible)));
  }, [visible]);

  // move by single item for smooth continuous experience
  const next = useCallback(() => {
    setIndex((prev) => prev + 1);
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const slideWidthPercent = 100 / visible;

  // after transition ends, if we've moved into cloned copies, jump back to middle copy without transition
  const handleTransitionEnd = () => {
    if (index >= ORIG_LEN * 2) {
      // moved too far to the right -> bring back to middle copy
      setTransitionEnabled(false);
      setIndex((idx) => idx - ORIG_LEN);
      // re-enable transition on next tick
      setTimeout(() => setTransitionEnabled(true), 40);
    } else if (index < ORIG_LEN) {
      // moved too far to the left -> bring to middle copy
      setTransitionEnabled(false);
      setIndex((idx) => idx + ORIG_LEN);
      setTimeout(() => setTransitionEnabled(true), 40);
    }
  };

  return (
    <section id="clients" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#f8fbff" }}>
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${COLORS.cyan}, transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4" style={{ color: COLORS.cyan }}>
            {t.clients.label}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-heading" style={{ color: COLORS.navy }}>
            {t.clients.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#777777" }}>
            {t.clients.subtitle}
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 md:w-24" style={{ backgroundColor: COLORS.cyan, opacity: 0.4 }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.cyan }} />
            <div className="h-px w-16 md:w-24" style={{ backgroundColor: COLORS.cyan, opacity: 0.4 }} />
          </div>
        </div>

        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Carousel viewport */}
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            <div
              className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{ transform: `translateX(-${index * slideWidthPercent}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {displayedClients.map((client) => (
                <div key={`${client.id}-${Math.random()}`} className="flex-shrink-0 px-2" style={{ width: `${slideWidthPercent}%` }}>
                  <div className="group relative bg-white rounded-xl md:rounded-2xl flex items-center justify-center p-5 md:p-6 transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "0 2px 12px rgba(0, 50, 102, 0.07)" }}>
                    <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: COLORS.cyan }} />
                    <div className="relative w-full h-14 md:h-20">
                      <Image src={client.image} alt={client.alt} fill className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100" sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 15vw" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button onClick={prev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-white/90 transition-colors" aria-label="Previous clients">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={next} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-white/90 transition-colors" aria-label="Next clients">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(clients.length / visible) }).map((_, p) => (
              <button key={p} onClick={() => setIndex(p * visible)} className={`h-2 rounded-full transition-all ${Math.floor(index / visible) === p ? "w-6 bg-cyan-500" : "w-2 bg-white/30"}`} style={Math.floor(index / visible) === p ? { backgroundColor: COLORS.cyan } : {}} aria-label={`Go to page ${p + 1}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "rgba(0, 172, 219, 0.15)" }} />
    </section>
  );
}
