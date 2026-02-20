import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  ServicesPortfolioSection,
  ClientsSection,
  CTASection,
} from "@/components/sections";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesPortfolioSection />
      <ClientsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
