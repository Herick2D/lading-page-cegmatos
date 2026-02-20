"use client";

import { useState, useEffect, useCallback, useRef, ReactElement } from "react";
import { useI18n } from "@/i18n";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
};

// ---------------------------------------------------------------------------
// SERVICE ICONS (inline SVGs — no extra dependency)
// ---------------------------------------------------------------------------
const ServiceIcons: Record<string, ReactElement> = {
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  ),
  installations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a1 1 0 000-1.4l-1.6-1.6a1 1 0 00-1.4 0l-3 3z" />
      <path d="M13 8l-9 9a2 2 0 000 3h.01a2 2 0 001.41-.59l9-9" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  consultoria: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  ventilation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2 2 0 1119 12H2" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// CONFIGURATION — add images to /public/servicos/{serviceKey}/ and adjust counts
// ---------------------------------------------------------------------------
const SERVICE_COUNTS: Record<string, { count: number; ext: string }> = {
  projects:      { count: 3, ext: "jpg" },
  installations: { count: 4, ext: "JPG" },
  maintenance:   { count: 3, ext: "jpg" },
  consultoria:   { count: 3, ext: "JPG" },
  ventilation:   { count: 3, ext: "jpg" },
};

// ---------------------------------------------------------------------------
export function ServicesPortfolioSection() {
  const { t } = useI18n();

  const services = [
    { key: "projects",      title: t.services.items[0].title, desc: t.services.items[0].description },
    { key: "installations", title: t.services.items[1].title, desc: t.services.items[1].description },
    { key: "maintenance",   title: t.services.items[2].title, desc: t.services.items[2].description },
    { key: "consultoria",   title: t.services.items[3].title, desc: t.services.items[3].description },
    { key: "ventilation",   title: t.services.items[4].title, desc: t.services.items[4].description },
  ];

  const [active, setActive]       = useState(0);
  const [slide, setSlide]         = useState(0);
  const [fading, setFading]       = useState(false);
  const [isAuto, setIsAuto]       = useState(true);
  const touchStartX               = useRef<number | null>(null);
  const touchDeltaX               = useRef(0);

  const svcKey    = services[active].key;
  const svcCfg    = SERVICE_COUNTS[svcKey] || { count: 0, ext: "jpg" };
  const images    = Array.from({ length: svcCfg.count }, (_, i) =>
    `/servicos/${svcKey}/${i + 1}.${svcCfg.ext}`
  );

  // reset slide with fade when switching service
  const selectService = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setSlide(0);
      setFading(false);
    }, 220);
  };

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setSlide(idx);
      setFading(false);
    }, 180);
  }, []);

  const prev = useCallback(() => goTo((slide - 1 + images.length) % images.length), [slide, images.length, goTo]);
  const next = useCallback(() => goTo((slide + 1) % images.length), [slide, images.length, goTo]);

  useEffect(() => {
    if (!isAuto || images.length === 0) return;
    const t = setInterval(() => goTo((slide + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [isAuto, slide, images.length, goTo]);

  return (
    <section
      id="services-projects"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#f8fbff" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${COLORS.cyan}, transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section header ─────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3" style={{ color: COLORS.cyan }}>
            {t.services.label}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3" style={{ color: COLORS.navy }}>
            {t.services.title}
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* ── Tab selector ───────────────────────────────── */}
        <div className="flex overflow-x-auto gap-2 pb-2 justify-start md:justify-center mb-8 no-scrollbar">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.key}
                onClick={() => selectService(i)}
                className="whitespace-nowrap flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  on
                    ? { backgroundColor: COLORS.navy, color: "#ffffff", boxShadow: "0 4px 14px rgba(0,50,102,0.25)" }
                    : { backgroundColor: "#ffffff", color: "#4b5563", border: "1px solid #e5e7eb" }
                }
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* ── Main panel ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: 420 }}>

          {/* Left: service detail */}
          <div
            className="lg:col-span-2 flex flex-col justify-between p-8 md:p-10"
            style={{ background: `linear-gradient(160deg, ${COLORS.navy} 0%, #004a94 100%)` }}
          >
            <div>
              <div className="text-white/60 mb-5">
                {ServiceIcons[services[active].key]}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">
                {services[active].title}
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {services[active].desc}
              </p>
            </div>

            {/* Service navigation (desktop only) */}
            <div className="hidden lg:flex flex-col gap-2 mt-10">
              {services.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => selectService(i)}
                  className="flex items-center gap-3 text-left transition-opacity text-sm"
                  style={{ color: i === active ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                >
                  <span
                    className="w-1 h-4 rounded-full flex-shrink-0 transition-all"
                    style={{ backgroundColor: i === active ? COLORS.cyan : "rgba(255,255,255,0.2)" }}
                  />
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right: carousel */}
          <div className="lg:col-span-3 bg-gray-900 relative flex flex-col">
            <div
              className="flex-1 relative overflow-hidden"
              style={{ minHeight: 280 }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; }}
              onTouchMove={(e)  => { if (touchStartX.current !== null) touchDeltaX.current = e.touches[0].clientX - touchStartX.current; }}
              onTouchEnd={()    => {
                if (touchDeltaX.current > 45) prev();
                else if (touchDeltaX.current < -45) next();
                touchStartX.current = null;
              }}
            >
              {images.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <svg className="w-10 h-10 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  <span className="text-white/30 text-sm">Nenhuma imagem disponível</span>
                </div>
              ) : (
                <>
                  {/* Image with fade */}
                  <img
                    key={`${svcKey}-${slide}`}
                    src={images[slide]}
                    alt={`${services[active].title} — imagem ${slide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    style={{ opacity: fading ? 0 : 1 }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />

                  {/* Arrows */}
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                    aria-label="Anterior"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                    aria-label="Próximo"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>

                  {/* Bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-5 py-4 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{ backgroundColor: i === slide ? "#ffffff" : "rgba(255,255,255,0.35)", transform: i === slide ? "scale(1.4)" : "scale(1)" }}
                          aria-label={`Imagem ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setIsAuto((a) => !a)}
                      className="text-white/50 hover:text-white/80 transition-colors"
                      aria-label={isAuto ? "Pausar autoplay" : "Iniciar autoplay"}
                    >
                      {isAuto ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: "rgba(0,172,219,0.15)" }} />
    </section>
  );
}
