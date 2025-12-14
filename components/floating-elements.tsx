"use client"

import { useRef, useState, useEffect } from "react"

export function FloatingElements() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ top: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate random particle positions on client side only
    setParticles(
      [...Array(20)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      }))
    )
  }, [])

  return (
    <div ref={canvasRef} className="absolute inset-0 pointer-events-none">
      {/* 3D floating cubes */}
      <div className="parallax absolute top-20 left-10 w-24 h-24 animate-float" style={{ animationDelay: "0s" }}>
        <div className="w-full h-full relative preserve-3d animate-rotate3d">
          <div
            className="absolute inset-0 bg-accent/30 backdrop-blur-sm border border-accent/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(0deg) translateZ(12px)" }}
          />
          <div
            className="absolute inset-0 bg-secondary/30 backdrop-blur-sm border border-secondary/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(90deg) translateZ(12px)" }}
          />
        </div>
      </div>

      <div className="parallax absolute top-40 right-20 w-32 h-32 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-full h-full relative preserve-3d animate-rotate3d" style={{ animationDelay: "2s" }}>
          <div
            className="absolute inset-0 bg-secondary/30 backdrop-blur-sm border border-secondary/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(0deg) translateZ(16px)" }}
          />
          <div
            className="absolute inset-0 bg-accent/30 backdrop-blur-sm border border-accent/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(90deg) translateZ(16px)" }}
          />
        </div>
      </div>

      <div className="parallax absolute bottom-40 left-20 w-20 h-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-full h-full relative preserve-3d animate-rotate3d" style={{ animationDelay: "4s" }}>
          <div
            className="absolute inset-0 bg-accent/30 backdrop-blur-sm border border-accent/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(0deg) translateZ(10px)" }}
          />
          <div
            className="absolute inset-0 bg-secondary/30 backdrop-blur-sm border border-secondary/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(90deg) translateZ(10px)" }}
          />
        </div>
      </div>

      <div className="parallax absolute bottom-20 right-32 w-28 h-28 animate-float" style={{ animationDelay: "3s" }}>
        <div className="w-full h-full relative preserve-3d animate-rotate3d" style={{ animationDelay: "6s" }}>
          <div
            className="absolute inset-0 bg-secondary/30 backdrop-blur-sm border border-secondary/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(0deg) translateZ(14px)" }}
          />
          <div
            className="absolute inset-0 bg-accent/30 backdrop-blur-sm border border-accent/50 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(90deg) translateZ(14px)" }}
          />
        </div>
      </div>

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="parallax absolute w-2 h-2 bg-accent/40 rounded-full animate-pulse-glow"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
