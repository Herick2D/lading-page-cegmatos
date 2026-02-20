"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

// Types
export type Locale = "pt" | "en" | "es";

type TranslationValue = string | string[] | Record<string, unknown>;

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: Record<string, string>;
  hero: Record<string, string>;
  about: {
    label: string;
    title: string;
    text: string;
    features: string[];
    stats: Record<string, { value: string; label: string }>;
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    learnMore: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  portfolio: Record<string, string>;
  clients: Record<string, string>;
  cta: Record<string, string>;
  footer: Record<string, string>;
  whatsapp: Record<string, string>;
}

// Translations map
const translations: Record<Locale, Translations> = {
  pt: pt as Translations,
  en: en as Translations,
  es: es as Translations,
};

// Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function I18nProvider({ children, defaultLocale = "pt" }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Optionally save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("cegmatos-locale", newLocale);
    }
  }, []);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Locale info
export const locales: { code: Locale; name: string; flag: string }[] = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];
