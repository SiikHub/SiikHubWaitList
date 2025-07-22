import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { WhyJoinSection } from "@/components/why-join-section"
import { FeaturesSection } from "@/components/features-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { Footer } from "@/components/footer"
// import { ApiStatus } from "@/components/api-status"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <WhyJoinSection />
        <FeaturesSection />
        <WhyChooseSection />
      </main>
      <Footer />
      {/* <ApiStatus /> */}
    </div>
  )
}
