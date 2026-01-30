"use client";

import { useI18n } from "@/i18n";
import { AirWavesIcon, InstagramIcon, WhatsAppIcon, PhoneIcon, MailIcon } from "@/components/ui/icons";
import { getWhatsAppLink, CONTACT } from "@/lib/utils";

const COLORS = {
  navy: "#003266",
  cyan: "#00ACDB",
};

export function Footer() {
  const { t } = useI18n();
  const whatsappLink = getWhatsAppLink(CONTACT.phone, t.whatsapp.defaultMessage);

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "services", href: "#services" },
    { key: "portfolio", href: "#portfolio" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <footer 
      className="py-12 md:py-16 text-white"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">

          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AirWavesIcon className="w-10 h-10 md:w-12 md:h-12" variant="white" />
              <span className="text-lg md:text-xl font-bold tracking-wide font-heading">Cegmatos</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              {t.footer.description}
            </p>

            <div className="flex gap-3 mt-5 md:mt-6">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                style={{ ["--hover-bg" as string]: COLORS.cyan }}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t.footer.links}</h4>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors"
                    style={{ ["--hover-color" as string]: COLORS.cyan }}
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t.footer.contact}</h4>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <PhoneIcon className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
                <span>
                  {CONTACT.phoneFixed}
                  <br />
                  {CONTACT.phoneDisplay}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" />
                <span className="break-all">{CONTACT.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
