import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  PortfolioSection,
  CTASection,
} from "@/components/sections";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
