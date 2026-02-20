"use client";

import { useI18n } from "@/i18n";
import { WhatsAppIcon, PhoneIcon, MailIcon } from "@/components/ui/icons";
import { getWhatsAppLink, CONTACT } from "@/lib/utils";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
};

export function CTASection() {
  const { t } = useI18n();
  const whatsappLink = getWhatsAppLink(CONTACT.phone, t.whatsapp.defaultMessage);

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #f8fbff 0%, #ffffff 50%, #e8f4fc 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-6 md:mb-8">
          <img
            src="/images/logo-oficial.png"
            alt="Cegmatos"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-heading"
          style={{ color: COLORS.navy }}
        >
          {t.cta.title}
        </h2>
        <p 
          className="text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto"
          style={{ color: "#555555" }}
        >
          {t.cta.subtitle}
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 md:gap-3 btn-whatsapp text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-semibold shadow-xl"
        >
          <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />
          <span>{t.cta.button}</span>
        </a>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mt-8 md:mt-12">
          <a
            href={`tel:${CONTACT.phoneFixed.replace(/\D/g, "")}`}
            className="flex items-center justify-center gap-2 transition-colors hover:opacity-70"
            style={{ color: "#555555" }}
          >
            <PhoneIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{CONTACT.phoneFixed}</span>
          </a>
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-center justify-center gap-2 transition-colors hover:opacity-70"
            style={{ color: "#555555" }}
          >
            <PhoneIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{CONTACT.phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center justify-center gap-2 transition-colors hover:opacity-70"
            style={{ color: "#555555" }}
          >
            <MailIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{CONTACT.email}</span>
          </a>
          <a
            href={`mailto:${CONTACT.email2}`}
            className="flex items-center justify-center gap-2 transition-colors hover:opacity-70"
            style={{ color: "#555555" }}
          >
            <MailIcon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{CONTACT.email2}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
