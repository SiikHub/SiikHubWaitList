import { Header } from "@/components/header"
import { AboutHeroSection } from "@/components/about-hero-section"
import { MissionSection } from "@/components/mission-section"
import { ValuesSection } from "@/components/values-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <AboutHeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}
