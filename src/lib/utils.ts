import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// WhatsApp link generator
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

// Constants
export const CONTACT = {
  phone: "5521970075287",
  phoneDisplay: "(21) 97007-5287",
  phoneFixed: "(21) 3079-2165",
  email: "eduardo@cegmatos.com.br",
  email2: "cegmatos.09@gmail.com",
  emailSecondary: "beatriz@cegmatos.com.br",
  instagram: "cegmatosarcondicionado",
  instagramUrl: "https://instagram.com/cegmatosarcondicionado",
} as const;
