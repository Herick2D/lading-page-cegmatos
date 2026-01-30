"use client";

import { ReactNode } from "react";
import { I18nProvider } from "@/i18n";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <I18nProvider defaultLocale="pt">{children}</I18nProvider>;
}
