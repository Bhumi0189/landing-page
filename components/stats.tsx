"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "99.9", suffix: "%", label: "Uptime" },
  { value: "50", suffix: "ms", label: "Response Time" },
  { value: "10", suffix: "k+", label: "Active Users" },
  { value: "4.9", suffix: "/5", label: "Rating" },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)

          // Animate counters
          stats.forEach((stat, index) => {
            const target = Number.parseFloat(stat.value)
            const duration = 2000
            const steps = 60
            const increment = target / steps
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounts((prev) => {
                const newCounts = [...prev]
                newCounts[index] = current
                return newCounts
              })
            }, duration / steps)
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-5xl md:text-6xl font-bold text-foreground mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Trusted by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center space-y-2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative inline-block">
                <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-accent to-secondary">
                  {stat.value === "99.9" || stat.value === "4.9" ? counts[index].toFixed(1) : Math.floor(counts[index])}
                  {stat.suffix}
                </div>
                <div className="absolute -inset-4 bg-accent/10 rounded-full blur-xl -z-10" />
              </div>
              <p className="text-lg text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
