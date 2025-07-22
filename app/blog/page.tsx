import { Header } from "@/components/header"
import { BlogHeroSection } from "@/components/blog-hero-section"
import { BlogArticleSection } from "@/components/blog-article-section"
import { RelatedArticlesSection } from "@/components/related-articles-section"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BlogHeroSection />
        <BlogArticleSection />
        <RelatedArticlesSection />
      </main>
      <Footer />
    </div>
  )
}
