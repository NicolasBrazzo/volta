import { useReveal } from '@/hooks/Home2/useReveal'
import {
  Nav,
  HeroSection,
  StatsSection,
  HowSection,
  FeaturesSection,
  ProofSection,
  PricingSection,
  CTASection,
  FooterSection,
} from '@/components/Homepage2'

export const HomePage = () => {
  useReveal()

  return (
    <div className="font-sans bg-neutral-950 text-neutral-50 leading-relaxed antialiased overflow-x-hidden scroll-smooth">
      <Nav />
      <HeroSection />
      <StatsSection />
      <HowSection />
      <FeaturesSection />
      <ProofSection />
      {/* <PricingSection /> */}
      <CTASection />
      <FooterSection />
    </div>
  )
}
