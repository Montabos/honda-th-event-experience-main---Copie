'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronLeft, ChevronRight, Clock, Flag, Music, Gift, Car } from "lucide-react"
import Button from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const packs = [
  {
    name: 'Pack Visitor',
    price: 0,
    features: [
      'Accès à l\'exposition des véhicules',
      'Présentation de la gamme Honda',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ],
    link: '/packs/visitor/step1',
    maxParticipants: 4
  },
  {
    name: 'Pack Statique',
    price: 50,
    features: [
      'Accès à l\'exposition des véhicules',
      'Présentation détaillée des modèles',
      'Session photo avec les véhicules',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ],
    link: '/packs/statique/step1',
    maxParticipants: 2
  },
  {
    name: 'Pack Piste',
    price: 150,
    features: [
      'Session de pilotage sur circuit',
      'Formation sécurité et briefing',
      'Équipement de protection fourni',
      'Photos et vidéos de votre session',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ],
    link: '/packs/piste/step1',
    maxParticipants: 1,
    highlight: true
  },
  {
    name: 'Pack NSX Club',
    price: 200,
    features: [
      'Accès VIP à l\'exposition NSX',
      'Session de pilotage sur circuit',
      'Formation sécurité et briefing',
      'Équipement de protection fourni',
      'Photos et vidéos de votre session',
      'Déjeuner gastronomique inclus',
      'Goodies NSX exclusifs'
    ],
    link: '/packs/nsx-club/step1',
    maxParticipants: 2
  }
]

const testimonials = [
  {
    name: 'Thomas',
    text: 'Une expérience inoubliable ! Le circuit est magnifique et l\'équipe Honda est très professionnelle. Je recommande vivement le Pack Piste pour les passionnés de sensations fortes.',
    image: '/images/testimonials/thomas.jpg'
  },
  {
    name: 'Sophie',
    text: 'Superbe journée en compagnie de l\'équipe Honda. Le Pack Statique était parfait pour découvrir les véhicules en détail. Les photos sont magnifiques !',
    image: '/images/testimonials/sophie.jpg'
  }
]

export default function HomePage() {
  const [activeDay, setActiveDay] = useState("saturday")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const saturdayProgram = [
    { time: "08:00", title: "Ouverture des portes", description: "Accueil des participants et vérifications", icon: <Clock className="h-5 w-5" /> },
    { time: "08:30 - 09:00", title: "Briefing", description: "Rappel des consignes et informations essentielles", icon: <Flag className="h-5 w-5" /> },
    { time: "09:00 - 12:00", title: "Ouverture de la piste", description: "Sessions de roulage", icon: <Car className="h-5 w-5" /> },
    { time: "12:15 - 12:45", title: "Grand parade NSX", description: "Rassemblement de tous les NSX présentes", icon: <Flag className="h-5 w-5" /> },
    { time: "13:30 - 16:30", title: "Réouverture de la piste", description: "Sessions de roulage", icon: <Car className="h-5 w-5" /> },
    { time: "17:00", title: "Parade lente sur circuit", description: "Tous les modèles Honda présents défilent sur la piste", icon: <Flag className="h-5 w-5" /> },
    { time: "18:00 - 20:00", title: "Concert + Tombola", description: "Live musique et tirage de la tombola du samedi", icon: <Music className="h-5 w-5" /> },
    { time: "20:00", title: "Fermeture des portes", description: "À demain pour la suite des festivités!", icon: <Clock className="h-5 w-5" /> },
  ]
  
  const sundayProgram = [
    { time: "08:00", title: "Ouverture des portes", description: "Accueil des participants et vérifications", icon: <Clock className="h-5 w-5" /> },
    { time: "08:30 - 09:00", title: "Briefing", description: "Rappel des consignes et informations essentielles", icon: <Flag className="h-5 w-5" /> },
    { time: "09:00 - 12:00", title: "Ouverture de la piste", description: "Sessions de roulage", icon: <Car className="h-5 w-5" /> },
    { time: "12:15 - 12:45", title: "Tirage Tombola", description: "De nombreux lots à gagner", icon: <Gift className="h-5 w-5" /> },
    { time: "13:30 - 16:30", title: "Réouverture de la piste", description: "Sessions de roulage", icon: <Car className="h-5 w-5" /> },
    { time: "17:00", title: "Parade de clôture", description: "Défilé final avec toutes les voitures présentes", icon: <Flag className="h-5 w-5" /> },
    { time: "18:00", title: "Fin de l'événement", description: "À l'année prochaine!", icon: <Clock className="h-5 w-5" /> },
  ]

  const carImages = [
    {
      type: "image",
      url: "/Pictures/nsx.jpg",
      alt: "Honda NSX",
      caption: "Honda NSX - L'excellence Honda"
    },
    {
      type: "image",
      url: "/Pictures/typer.jpg",
      alt: "Honda Civic Type R",
      caption: "Honda Civic Type R - La référence sur circuit"
    },
    {
      type: "image",
      url: "/Pictures/track.jpg",
      alt: "Honda on track",
      caption: "Honda en action sur le Circuit de Mornay"
    },
    {
      type: "image",
      url: "/Pictures/2020_honda_civic_type_r-50227.jpg",
      alt: "Honda Civic Type R",
      caption: "Type R - Performance ultime"
    },
    {
      type: "image",
      url: "/Pictures/2021-honda-civic-type-r-tcr-5.jpg",
      alt: "Honda Civic Type R TCR",
      caption: "Type R TCR - La compétition dans l'ADN"
    },
    {
      type: "image",
      url: "/Pictures/2023_Honda_Civic_FL5_TCR_1056-large.jpg",
      alt: "Honda Civic FL5 TCR",
      caption: "Nouvelle Civic FL5 TCR - L'évolution de la performance"
    },
    {
      type: "image",
      url: "/Pictures/a741fa4caa80ad5701902104c3fa84b1.jpg",
      alt: "Honda Type R Racing",
      caption: "Type R - L'esprit racing"
    }
  ]

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carImages.length)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carImages.length) % carImages.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const x = e.clientX
    const diff = startX - x
    
    if (diff > 50) {
      nextSlide()
      setIsDragging(false)
    } else if (diff < -50) {
      prevSlide()
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const x = e.touches[0].clientX
    const diff = startX - x
    
    if (diff > 50) {
      nextSlide()
      setIsDragging(false)
    } else if (diff < -50) {
      prevSlide()
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    // Apply dark theme to match design
    document.documentElement.classList.add('dark')
    
    // Auto-rotate carousel
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide()
      }
    }, 8000)
    
    return () => {
      document.documentElement.classList.remove('dark')
      clearInterval(interval)
    }
  }, [isDragging])

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-honda-dark text-white">
      {/* Banner Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Pictures/track.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-honda-dark via-honda-dark/50 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="staggered-fade-in text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-shadow-lg">
              <span className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span> <span className="font-display">HONDA</span>
            </h1>
            <p className="text-xl md:text-3xl font-light mb-8 text-shadow">
              L'événement exclusif des passionnés Honda.
            </p>
            <p className="text-base md:text-lg font-light mb-12 max-w-2xl mx-auto text-white/80 text-shadow-sm">
              21-22 JUIN 2025 • CIRCUIT DE MORNAY
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-honda-red hover:bg-honda-hover-red text-white py-6 px-8 rounded-md text-lg hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const registrationSection = document.getElementById('registration')
                  if (registrationSection) {
                    registrationSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Je m'inscris
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/10 py-6 px-8 rounded-md text-lg"
                onClick={() => window.location.href = '/#about'}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white transition-opacity duration-300 hover:opacity-80 animate-float"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Event Info Section */}
      <section className="py-16 px-4 bg-honda-dark" id="about">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">TH EXCLUSIVE - L'ÉVÉNEMENT PASSIONNÉ</h2>
          <h3 className="text-xl text-center text-gray-400 mb-8">HONDA PAR L'EXCELLENCE</h3>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-300 mb-6">
              Vivez une expérience unique au cœur de l'univers Honda. Que vous soyez passionné de voitures, amateur de sensations fortes ou simplement curieux de découvrir notre marque, nous avons le pack qui vous correspond.
            </p>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-24 bg-honda-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            PROGRAMME <span className="text-honda-red">DÉTAILLÉ</span>
          </h2>
          <p className="text-center mb-16 md:mb-20 text-honda-textMuted max-w-2xl mx-auto">
            Découvrez notre programme complet avec ses sessions de roulage, parades,
            expositions et animations tout au long du week-end.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="saturday" className="w-full">
              <TabsList className="grid w-full grid-cols-2 gap-8 mb-16 p-0.5 bg-transparent">
                <TabsTrigger 
                  value="saturday" 
                  className={`
                    relative py-3 px-8
                    transition-all duration-300 ease-in-out
                    border-b-2 
                    data-[state=active]:border-honda-red
                    data-[state=inactive]:border-transparent
                    hover:border-honda-red/50
                    ${activeDay === 'saturday' ? 'text-white' : 'text-white/60'}
                  `}
                  onClick={() => setActiveDay("saturday")}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs tracking-wider uppercase mb-1 font-light">Samedi</span>
                    <span className="text-xl font-medium tracking-wide">21 Juin</span>
                  </div>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                    activeDay === 'saturday' ? 'bg-honda-red' : 'bg-transparent'
                  }`}></div>
                </TabsTrigger>
                <TabsTrigger 
                  value="sunday" 
                  className={`
                    relative py-3 px-8
                    transition-all duration-300 ease-in-out
                    border-b-2
                    data-[state=active]:border-honda-red
                    data-[state=inactive]:border-transparent
                    hover:border-honda-red/50
                    ${activeDay === 'sunday' ? 'text-white' : 'text-white/60'}
                  `}
                  onClick={() => setActiveDay("sunday")}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs tracking-wider uppercase mb-1 font-light">Dimanche</span>
                    <span className="text-xl font-medium tracking-wide">22 Juin</span>
                  </div>
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                    activeDay === 'sunday' ? 'bg-honda-red' : 'bg-transparent'
                  }`}></div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="saturday" className="mt-0">
                <Card className="bg-transparent border-none">
                  <CardContent className="p-0">
                    <div className="timeline">
                      {saturdayProgram.map((item, index) => (
                        <div 
                          key={index} 
                          className="timeline-item opacity-0" 
                          style={{ 
                            animationName: 'fade-in',
                            animationDuration: '0.5s',
                            animationFillMode: 'forwards',
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          <div className="flex items-start">
                            <div className="mr-4 min-w-16 text-honda-red font-mono">
                              {item.time.includes('-') ? (
                                <div className="flex flex-col">
                                  <span>{item.time.split('-')[0].trim()}</span>
                                  <span>{item.time.split('-')[1].trim()}</span>
                                </div>
                              ) : (
                                item.time
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium flex items-center">
                                <span className="mr-2 text-honda-red">{item.icon}</span> 
                                {item.title}
                              </h3>
                              <p className="text-honda-textMuted mt-1">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sunday" className="mt-0">
                <Card className="bg-transparent border-none">
                  <CardContent className="p-0">
                    <div className="timeline">
                      {sundayProgram.map((item, index) => (
                        <div 
                          key={index} 
                          className="timeline-item opacity-0" 
                          style={{ 
                            animationName: 'fade-in',
                            animationDuration: '0.5s',
                            animationFillMode: 'forwards',
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          <div className="flex items-start">
                            <div className="mr-4 min-w-16 text-honda-red font-mono">
                              {item.time.includes('-') ? (
                                <div className="flex flex-col">
                                  <span>{item.time.split('-')[0].trim()}</span>
                                  <span>{item.time.split('-')[1].trim()}</span>
                                </div>
                              ) : (
                                item.time
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium flex items-center">
                                <span className="mr-2 text-honda-red">{item.icon}</span> 
                                {item.title}
                              </h3>
                              <p className="text-honda-textMuted mt-1">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-16 px-4 bg-honda-dark" id="registration">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">INSCRIPTION & TARIFS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packs.map((pack, index) => (
              <div key={index} className={`bg-gray-900 rounded-lg shadow-lg p-6 ${pack.highlight ? 'border-2 border-honda-red' : ''}`}>
                <h3 className="text-xl font-bold mb-4">{pack.name}</h3>
                <p className="text-3xl font-bold mb-6">{pack.price}€</p>
                <ul className="mb-8 space-y-2">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-honda-red mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400 mb-4">
                  Max {pack.maxParticipants} participant{pack.maxParticipants > 1 ? 's' : ''}
                </p>
                <Link href={pack.link}>
                  <Button className="w-full" variant={pack.highlight ? 'primary' : 'outline'}>
                    Réserver
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">Paiement sécurisé par carte bancaire</p>
            <div className="flex justify-center gap-4 mt-4">
              <Image src="/images/payment/cb.png" alt="CB" width={40} height={25} />
              <Image src="/images/payment/mastercard.png" alt="Mastercard" width={40} height={25} />
              <Image src="/images/payment/visa.png" alt="Visa" width={40} height={25} />
            </div>
          </div>
        </div>
      </section>

      {/* Car Showcase Section */}
      <section id="gallery" className="py-24 bg-honda-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            GALERIE <span className="text-honda-red">HONDA</span>
          </h2>
          <p className="text-center mb-12 text-honda-textMuted max-w-2xl mx-auto">
            Vibrez au cœur de la légende Honda.<br />
            Découvrez un rassemblement unique des plus belles Honda.
          </p>
          
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg shadow-xl">
            {/* Navigation buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-honda-red text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Image précédente"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-honda-red text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Image suivante"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Carousel container */}
            <div 
              ref={carouselRef}
              className="relative h-[300px] md:h-[500px] w-full overflow-hidden cursor-grab"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {carImages.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {item.type === "image" ? (
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.url})` }}
                      aria-label={item.alt}
                    />
                  ) : (
                    <div className="w-full h-full relative">
                      <iframe
                        src={item.url}
                        className={`absolute inset-0 w-full h-full ${index === activeIndex ? '' : 'hidden'}`}
                        title={item.alt}
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture"
                      />
                    </div>
                  )}
                  
                  {/* Caption with improved readability */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-6">
                    <p className="text-white text-lg md:text-xl font-medium text-shadow">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-20">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    index === activeIndex ? 'bg-honda-red' : 'bg-white/50 hover:bg-white'
                  } transition-colors duration-300`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-honda-textMuted mb-6">
              Ces modèles et bien d'autres vous attendent lors de l'événement Honda TH Exclusive.
              Rejoignez-nous pour admirer ces véhicules d'exception en personne.
            </p>
            <Button className="bg-honda-red hover:bg-honda-hover-red text-white" onClick={() => window.location.href = '/#registration'}>
              Je veux y être
            </Button>
          </div>
        </div>
      </section>

      {/* Practical Info Section */}
      <section className="py-16 px-4 bg-honda-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">INFORMATIONS PRATIQUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/calendar.svg" alt="Calendrier" width={32} height={32} />
              </div>
              <h3 className="font-bold mb-2">Date de l'événement</h3>
              <p className="text-gray-400">21-22 Juin 2025</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/location.svg" alt="Localisation" width={32} height={32} />
              </div>
              <h3 className="font-bold mb-2">Lieu</h3>
              <p className="text-gray-400">Circuit de Mornay</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/clock.svg" alt="Horaires" width={32} height={32} />
              </div>
              <h3 className="font-bold mb-2">Horaires</h3>
              <p className="text-gray-400">9h00 - 18h00</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-honda-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/images/icons/info.svg" alt="Informations" width={32} height={32} />
              </div>
              <h3 className="font-bold mb-2">Informations</h3>
              <p className="text-gray-400">Sur réservation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">TÉMOIGNAGES DES PARTICIPANTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <h3 className="ml-4 font-bold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-honda-dark" id="contact">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">CONTACT</h2>
          <p className="text-gray-400 mb-8">
            Une question ? N'hésitez pas à nous contacter !
          </p>
          <div className="flex justify-center gap-4">
            <Link href="mailto:contact@honda-event.fr">
              <Button className="bg-honda-red hover:bg-honda-hover-red">Nous contacter</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 