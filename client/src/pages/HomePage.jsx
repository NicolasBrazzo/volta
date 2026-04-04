import Navbar from '@/components/homePage/Navbar'
import Footer from '@/components/homePage/Footer'
import Hero from '@/components/homePage/sections/Hero'
import SocialProofBar from '@/components/homePage/sections/SocialProofBar'
import MultiTenantExplainer from '@/components/homePage/sections/MultiTenantExplainer'
import Features from '@/components/homePage/sections/Features'
import HowItWorks from '@/components/homePage/sections/HowItWorks'
import DashboardMockup from '@/components/homePage/sections/DashboardMockup'
import Testimonials from '@/components/homePage/sections/Testimonials'
import Pricing from '@/components/homePage/sections/Pricing'
import FinalCTA from '@/components/homePage/sections/FinalCTA'

export const HomePage = () => (
  <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans">
    <Navbar />
    <main>
      <Hero />
      <SocialProofBar />
      <MultiTenantExplainer />
      <Features />
      <HowItWorks />
      <DashboardMockup />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </main>
    <Footer />
  </div>
)
