"use client"

import React from "react"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[2.5, 100, 200]} scale={1}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = React.useRef<THREE.Points>(null)

  const particlesGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(1000 * 3)

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  React.useEffect(() => {
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.001
        particlesRef.current.rotation.y += 0.002
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial color="#60a5fa" size={0.05} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function FloatingRings() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshStandardMaterial color="#a855f7" transparent opacity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh rotation={[0, Math.PI / 4, Math.PI / 2]} position={[0, 0, 0]}>
          <torusGeometry args={[5.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  )
}

function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

        <AnimatedSphere />
        <ParticleField />
        <FloatingRings />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  useEffect(() => {
    const targetDate = new Date("2026-01-01T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-60">
        <Scene3D />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Modern Logo */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full backdrop-blur-sm border border-white/20">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
            Destination
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KP
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm font-medium">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="tracking-[0.3em] uppercase backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
              Coming Soon
            </span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight drop-shadow-lg animate-fade-in-delay-2">
            Something{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Extraordinary
            </span>{" "}
            is Coming
          </h2>

          {/* Modern Countdown Timer */}
          <div className="mb-12 animate-fade-in-delay-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:border-purple-400/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-2 font-mono drop-shadow-lg">
                      {timeLeft.days.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-semibold">Days</div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:border-blue-400/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-2 font-mono drop-shadow-lg">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-semibold">Hours</div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:border-cyan-400/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-2 font-mono drop-shadow-lg">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-semibold">Minutes</div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:border-pink-400/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-2 font-mono drop-shadow-lg">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-widest font-semibold">Seconds</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-6 font-medium backdrop-blur-sm bg-black/20 inline-block px-4 py-2 rounded-full">
              Launch Date: January 1, 2026
            </p>
          </div>

          {/* Modern Email Signup */}
          <div className="relative max-w-md mx-auto animate-fade-in-delay-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-3xl blur-xl"></div>
            <Card className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-black/50 transition-all duration-500 hover:border-purple-400/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full mr-3 backdrop-blur-sm border border-white/20">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">Get Early Access</h3>
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  Join the waitlist and be among the first to experience the future of travel.
                </p>

                {isSubscribed ? (
                  <div className="text-center">
                    <div className="text-green-400 font-bold mb-3 text-lg animate-bounce drop-shadow-lg">
                      {"✓ Welcome aboard!"}
                    </div>
                    <p className="text-gray-300 text-sm">{"You're on the list. We'll be in touch soon."}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 backdrop-blur-sm border border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-black/40 rounded-xl h-12 px-4 text-sm font-medium transition-all duration-300"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 group backdrop-blur-sm border border-white/20"
                    >
                      <span>Join Waitlist</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modern Footer */}
        <div className="text-center animate-fade-in-delay-5">
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 group">
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-3 rounded-full group-hover:bg-black/40 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-400/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 group">
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-3 rounded-full group-hover:bg-black/40 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718-1.297c-.875.875-2.026 1.365-3.323 1.365s-2.448-.49-3.323-1.365c-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 p-3 rounded-full group-hover:bg-black/40 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </div>
          <p className="text-gray-500 text-xs font-medium backdrop-blur-sm bg-black/20 inline-block px-4 py-2 rounded-full">
            © 2024 DestinationKP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
