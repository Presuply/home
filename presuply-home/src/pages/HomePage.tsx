import { AppShowcaseSection } from '../components/AppShowcaseSection'
import { BenefitsSection } from '../components/BenefitsSection'
import { DownloadAppSection } from '../components/DownloadAppSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { PricingSection } from '../components/PricingSection'
import { ProblemSection } from '../components/ProblemSection'
import { SimpleTransition } from '../components/SimpleTransition'

export function HomePage() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SimpleTransition />
        <HowItWorksSection />
        <BenefitsSection />
        <AppShowcaseSection />
        <PricingSection />
        <DownloadAppSection />
      </main>
      <Footer />
    </div>
  )
}
