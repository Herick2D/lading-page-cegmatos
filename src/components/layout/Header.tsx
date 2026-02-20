"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n, locales } from "@/i18n";
import { AirWavesIcon, MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn, getWhatsAppLink, CONTACT } from "@/lib/utils";

// Brand colors
const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
  dark: "#353132",
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const whatsappLink = getWhatsAppLink(CONTACT.phone, t.whatsapp.defaultMessage);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close lang menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setLangMenuOpen(false);
    if (langMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [langMenuOpen]);

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "portfolio", href: "#portfolio" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3"
          : "bg-transparent py-3 md:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        <Link href="#home" className="flex items-center gap-2 sm:gap-3">
            <img
              src="/images/logo-oficial.png"
              alt="Cegmatos"
              className="w-auto max-h-14 sm:max-h-16 object-contain flex-shrink-0 scale-[1.2]"
            />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="nav-link text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: COLORS.dark }}
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangMenuOpen(!langMenuOpen);
              }}
              className="flex items-center gap-1 text-sm transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
              style={{ color: COLORS.dark }}
            >
              {locales.find((l) => l.code === locale)?.flag}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langMenuOpen && (
              <div 
                className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[120px]"
                onClick={(e) => e.stopPropagation()}
              >
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLocale(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors",
                      locale === l.code && "bg-blue-50"
                    )}
                    style={{ color: locale === l.code ? COLORS.navy : COLORS.dark }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 btn-primary text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-full text-sm font-semibold"
          >
            <span>{t.hero.cta}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <CloseIcon className="w-6 h-6" style={{ color: COLORS.navy }} />
          ) : (
            <MenuIcon className="w-6 h-6" style={{ color: COLORS.navy }} />
          )}
        </button>

        <button
          className="hidden md:block lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <CloseIcon className="w-6 h-6" style={{ color: COLORS.navy }} />
          ) : (
            <MenuIcon className="w-6 h-6" style={{ color: COLORS.navy }} />
          )}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-white border-t shadow-lg">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ color: COLORS.dark }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </a>
            ))}

            <div className="border-t my-2" />

            <div className="flex gap-2 py-2 px-4">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    locale === l.code
                      ? "text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                  style={locale === l.code ? { backgroundColor: COLORS.navy } : {}}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-white px-5 py-3 rounded-full text-center font-semibold mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.hero.cta}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
