"use client";

import { useI18n } from "@/i18n";
import Image from "next/image";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
  dark: "#353132",
};

const clients = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  image: `/clients/client${i + 1}.png`,
  alt: `Cliente ${i + 1}`,
}));

export function ClientsSection() {
  const { t } = useI18n();

  return (
    <section
      id="clients"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#f8fbff" }}
    >
      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.cyan}, transparent)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-block font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4"
            style={{ color: COLORS.cyan }}
          >
            {t.clients.label}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-heading"
            style={{ color: COLORS.navy }}
          >
            {t.clients.title}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "#777777" }}
          >
            {t.clients.subtitle}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: COLORS.cyan, opacity: 0.4 }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS.cyan }}
            />
            <div
              className="h-px w-16 md:w-24"
              style={{ backgroundColor: COLORS.cyan, opacity: 0.4 }}
            />
          </div>
        </div>

        {/* Clients grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group relative bg-white rounded-xl md:rounded-2xl flex items-center justify-center p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: "0 2px 12px rgba(0, 50, 102, 0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 30px rgba(0, 172, 219, 0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 2px 12px rgba(0, 50, 102, 0.07)";
              }}
            >
              {/* Hover top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: COLORS.cyan }}
              />

              <div className="relative w-full h-14 md:h-16">
                <Image
                  src={client.image}
                  alt={client.alt}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 15vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom border accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: "rgba(0, 172, 219, 0.15)" }}
      />
    </section>
  );
}
