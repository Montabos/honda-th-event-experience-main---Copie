'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const images = [
  {
    src: '/images/gallery/image1.jpg',
    alt: 'Honda NSX sur circuit',
    title: 'Honda NSX en action'
  },
  {
    src: '/images/gallery/image2.jpg',
    alt: 'Exposition statique',
    title: 'Exposition des modèles'
  },
  {
    src: '/images/gallery/image3.jpg',
    alt: 'Session de pilotage',
    title: 'Formation pilotage'
  },
  {
    src: '/images/gallery/image4.jpg',
    alt: 'Détail intérieur',
    title: 'Intérieur luxueux'
  },
  {
    src: '/images/gallery/image5.jpg',
    alt: 'Vue aérienne circuit',
    title: 'Circuit vu du ciel'
  },
  {
    src: '/images/gallery/image6.jpg',
    alt: 'Équipe Honda',
    title: 'Notre équipe'
  }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">GALERIE HONDA</h2>
        <p className="text-center text-gray-400 mb-8">
          Découvrez les moments forts de nos précédents événements
        </p>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour l'image en plein écran */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-honda-red"
                onClick={() => setSelectedImage(null)}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold">{images[selectedImage].title}</h3>
              </div>
              {/* Navigation */}
              <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                  className="text-white hover:text-honda-red"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(
                      selectedImage === 0 ? images.length - 1 : selectedImage - 1
                    )
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                  className="text-white hover:text-honda-red"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(
                      selectedImage === images.length - 1 ? 0 : selectedImage + 1
                    )
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bouton "Voir plus" */}
        <div className="text-center mt-8">
          <Button variant="outline">Voir plus de photos</Button>
        </div>
      </div>
    </section>
  )
} 