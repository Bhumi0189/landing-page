import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </main>
  )
}
