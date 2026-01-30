"use client";

import { useI18n } from "@/i18n";
import { AirWavesIcon, ArrowRightIcon, CheckIcon, ChevronDownIcon } from "@/components/ui/icons";
import { getWhatsAppLink, CONTACT } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";

function AnimatedWavesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "40%", minHeight: "200px" }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003266" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00ACDB" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ACDB" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#003266" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          className="animate-wave"
          fill="url(#waveGradient1)"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path
          className="animate-wave-reverse"
          fill="url(#waveGradient2)"
          d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,149.3C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const { t } = useI18n();
  const whatsappLink = getWhatsAppLink(CONTACT.phone, t.whatsapp.defaultMessage);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 15;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8fbff 0%, #e8f4fc 50%, #d4edfc 100%)",
      }}
    >
      <AnimatedWavesBackground />

      <div 
        className="absolute top-20 right-10 w-32 h-32 md:w-64 md:h-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(0, 172, 219, 0.1)" }}
      />
      <div 
        className="absolute bottom-40 left-10 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(0, 50, 102, 0.05)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 pt-32 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <div className="animate-fade-in-up order-2 lg:order-1 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4 md:mb-6">
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#00ACDB" }}
              />
              <span 
                className="text-xs sm:text-sm font-medium"
                style={{ color: "#003266" }}
              >
                {t.hero.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 font-heading">
              <span style={{ color: "#003266" }}>
                {t.hero.title}
              </span>
              <br />
              <span className="gradient-text">{t.hero.subtitle}</span>
            </h1>

            <p 
              className="text-base sm:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "#555555" }}
            >
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 btn-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg"
              >
                <span>{t.hero.cta}</span>
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold btn-outline"
                style={{ color: "#003266" }}
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200 order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div
                className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "4/3",
                }}
              >
                <Image
                  src={`/servicos/servico${currentImageIndex + 1}.${currentImageIndex === 10 || currentImageIndex === 11 || currentImageIndex === 12 || currentImageIndex === 3 || currentImageIndex === 4 || currentImageIndex === 5 || currentImageIndex === 6 ? 'JPG' : 'jpg'}`}
                  alt={`Serviço ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0, 50, 102, 0.3), transparent)",
                  }}
                />
              </div>

              <div 
                className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 animate-float"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0, 172, 219, 0.1)" }}
                  >
                    <span 
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: "#00ACDB" }}
                    >
                      25+
                    </span>
                  </div>
                  <div>
                    <span 
                      className="block text-xs sm:text-sm font-semibold"
                      style={{ color: "#003266" }}
                    >
                      {t.hero.yearsExp}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-gray-500">
                      {t.hero.experience}
                    </span>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 animate-float delay-200"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                  >
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {t.hero.certified}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDownIcon className="w-6 h-6 opacity-50" style={{ color: "#003266" }} />
      </div>
    </section>
  );
}
