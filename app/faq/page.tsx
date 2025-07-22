import { Header } from "@/components/header"
import { FaqHeroSection } from "@/components/faq-hero-section"
import { FaqSection } from "@/components/faq-section"
import { FaqContactSection } from "@/components/faq-contact-section"
import { Footer } from "@/components/footer"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FaqHeroSection />
        <FaqSection />
        <FaqContactSection />
      </main>
      <Footer />
    </div>
  )
}
