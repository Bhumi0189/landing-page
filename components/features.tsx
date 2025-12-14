"use client"

import { Card } from "@/components/ui/card"
import { Box, Zap, Layers, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Box,
    title: "3D Interactions",
    description: "Seamlessly integrated 3D elements that respond to user input with smooth, natural animations.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance ensuring buttery smooth 60fps animations across all devices.",
  },
  {
    icon: Layers,
    title: "Depth Layers",
    description: "Multi-layered parallax effects create an immersive sense of depth and dimension.",
  },
  {
    icon: Sparkles,
    title: "Interactive Magic",
    description: "Every element responds to your presence, creating a truly engaging experience.",
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2
            className={`text-5xl md:text-6xl font-bold text-foreground text-balance transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Cutting-Edge Features
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Built with the latest technologies to deliver unparalleled performance and visual excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`group p-8 bg-card border-border hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
