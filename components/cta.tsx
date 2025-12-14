"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { useState } from "react"

export function CTA() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Email submitted:", email)
    setEmail("")
  }

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground text-balance leading-tight">
              Ready to Transform Your Digital Experience?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators building the future of interactive web experiences.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  required
                  suppressHydrationWarning
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="group bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <p className="text-sm text-muted-foreground">No credit card required • Free 14-day trial</p>
          </div>
        </div>
      </div>
    </section>
  )
}
