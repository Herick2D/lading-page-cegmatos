"use client";

import { useI18n } from "@/i18n";
import { CheckIcon } from "@/components/ui/icons";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
  dark: "#353132",
};

export function AboutSection() {
  const { t } = useI18n();

  const stats = [
    t.about.stats.years,
    t.about.stats.projects,
    t.about.stats.commitment,
  ];

  return (
    <section 
      id="about" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div 
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: "linear-gradient(to left, #f8fbff, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="relative flex flex-col gap-4">
            {/* Logo panel */}
            <div
              className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #003266 0%, #004a94 60%, #00ACDB 100%)",
                aspectRatio: "4/3",
              }}
            >
              {/* Decorative subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.4) 39px,rgba(255,255,255,0.4) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.4) 39px,rgba(255,255,255,0.4) 40px)",
                }}
              />
              {/* Glowing circle behind logo */}
              <div
                className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full opacity-20 blur-2xl"
                style={{ background: "#00ACDB" }}
              />
              <img
                src="/images/cegmatos-logo-fonte-branca.png"
                alt="Cegmatos"
                className="relative z-10 w-48 sm:w-56 md:w-64 h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Stats card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 grid grid-cols-3 gap-2 md:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center ${index < stats.length - 1 ? "border-r border-gray-100" : ""}`}>
                  <span
                    className="block text-xl md:text-2xl font-bold"
                    style={{ color: COLORS.navy }}
                  >
                    {stat.value}
                  </span>
                  <span className="block text-[10px] md:text-xs text-gray-500 leading-tight mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <span 
              className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
              style={{ color: COLORS.cyan }}
            >
              {t.about.label}
            </span>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-heading"
              style={{ color: COLORS.navy }}
            >
              {t.about.title}
            </h2>
            <p 
              className="text-base md:text-lg leading-relaxed mb-6 md:mb-8"
              style={{ color: "#555555" }}
            >
              {t.about.text}
            </p>

            <div className="space-y-3 md:space-y-4">
              {t.about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(0, 172, 219, 0.1)" }}
                  >
                    <CheckIcon 
                      className="w-3 h-3 md:w-4 md:h-4" 
                      style={{ color: COLORS.cyan }}
                    />
                  </div>
                  <span 
                    className="font-medium text-sm md:text-base"
                    style={{ color: COLORS.dark }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
