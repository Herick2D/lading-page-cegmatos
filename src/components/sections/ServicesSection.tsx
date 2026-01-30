"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n";
import { ServiceIcon, ArrowRightIcon } from "@/components/ui/icons";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
  dark: "#353132",
};

export function ServicesSection() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="services"
      className="py-16 md:py-24 relative"
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <span 
            className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
            style={{ color: COLORS.cyan }}
          >
            {t.services.label}
          </span>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-heading"
            style={{ color: COLORS.navy }}
          >
            {t.services.title}
          </h2>
          <p 
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "#555555" }}
          >
            {t.services.subtitle}
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              el.scrollBy({ left: -el.clientWidth * 0.9, behavior: "smooth" });
            }}
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-95"
          >
            <ArrowRightIcon className="w-4 h-4 transform rotate-180" />
          </button>

          <div ref={scrollRef} className="overflow-x-auto scroll-smooth px-2 md:px-4 py-2 -mx-2 md:-mx-4">
            <div className="flex gap-4 md:gap-6 items-stretch">
              {t.services.items.map((service, index) => (
                <div
                  key={index}
                  className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 h-full flex flex-col min-h-[220px] md:min-h-[260px] lg:min-h-[300px]"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.cyan} 100%)`,
                    }}
                  >
                    <ServiceIcon
                      type={service.icon as "blueprint" | "install" | "consult" | "maintenance"}
                      className="w-6 h-6 md:w-7 md:h-7 text-white"
                    />
                  </div>

                  <h3
                    className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                    style={{ color: COLORS.navy }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#666666",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.description}
                  </p>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-medium text-sm mt-auto group"
                    style={{ color: COLORS.cyan }}
                  >
                    <span>{t.services.learnMore}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next services"
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              el.scrollBy({ left: el.clientWidth * 0.9, behavior: "smooth" });
            }}
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-md hover:opacity-95"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
