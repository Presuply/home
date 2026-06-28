import { AffiliateSection } from '../components/AffiliateSection'
import { AppShowcaseSection } from '../components/AppShowcaseSection'
import { BenefitsSection } from '../components/BenefitsSection'
import { DownloadAppSection } from '../components/DownloadAppSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { ImageSequenceHeroSection } from '../components/ImageSequenceHeroSection'
import { PricingSection } from '../components/PricingSection'
import { ProblemSection } from '../components/ProblemSection'
import { ProfessionalRigorSection } from '../components/ProfessionalRigorSection'
import { SimpleTransition } from '../components/SimpleTransition'
import { useIsDesktop } from '../lib/useIsDesktop'

export function HomePage() {
  const isDesktop = useIsDesktop()

  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <main>
        {isDesktop ? (
          <ImageSequenceHeroSection />
        ) : (
          <HeroSection />
        )}
        <ProblemSection />
        <SimpleTransition />
        <HowItWorksSection />
        <ProfessionalRigorSection />
        <BenefitsSection />
        <AppShowcaseSection />
        <PricingSection />
        <AffiliateSection />
        <DownloadAppSection />
      </main>
      <Footer />
    </div>
  )
}
