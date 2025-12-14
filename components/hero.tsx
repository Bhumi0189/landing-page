"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { FloatingElements } from "@/components/floating-elements"
import { useEffect, useRef } from "react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20

      const elements = heroRef.current.querySelectorAll(".parallax")
      elements.forEach((el, index) => {
        const speed = (index + 1) * 0.5
        ;(el as HTMLElement).style.transform = `translate(${x * speed}px, ${y * speed}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="parallax absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <FloatingElements />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Experience the Future</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="block text-foreground">Immersive</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              3D Experience
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Step into a new dimension of digital interaction. We craft stunning, high-performance experiences that blur
            the line between reality and digital innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
            >
              View Demo
            </Button>
          </div>

          {/* Trust badges */}
          <div className="pt-12 animate-in fade-in duration-1000 delay-500">
            <p className="text-sm text-muted-foreground mb-6">Trusted by innovative teams worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["TechCorp", "Innovate", "Nexus", "Quantum", "Fusion"].map((company) => (
                <div
                  key={company}
                  className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
