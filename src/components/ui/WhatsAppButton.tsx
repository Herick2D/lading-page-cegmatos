"use client";

import { useI18n } from "@/i18n";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getWhatsAppLink, CONTACT } from "@/lib/utils";

export function WhatsAppButton() {
  const { t } = useI18n();
  const whatsappLink = getWhatsAppLink(CONTACT.phone, t.whatsapp.defaultMessage);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 btn-whatsapp rounded-full flex items-center justify-center shadow-2xl z-50 animate-pulse-slow"
      title={t.cta.button}
      aria-label={t.cta.button}
    >
      <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" />
    </a>
  );
}
