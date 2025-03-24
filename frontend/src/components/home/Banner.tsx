'use client'

import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Banner() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center text-white">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Circuit Honda"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Logo Honda en haut à gauche */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/images/logo.png"
          alt="Honda Logo"
          width={120}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="block">TH EXCLUSIVE</span>
          <span className="block">HONDA</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Vivez une expérience unique au cœur de l'univers Honda
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#packs">
            <Button size="lg" variant="primary">
              Découvrir les packs
            </Button>
          </Link>
          <Link href="#contact">
            <Button size="lg" variant="outline">
              Nous contacter
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  )
} 