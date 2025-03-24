'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { generateBookingReference } from '@/lib/helpers'

export default function CheckoutSuccessPage() {
  const [bookingRef] = useState(generateBookingReference())

  useEffect(() => {
    // TODO: Send confirmation email
    console.log('Sending confirmation email for booking:', bookingRef)
  }, [bookingRef])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Réservation confirmée !
          </h1>
          
          <p className="text-gray-600 mb-8">
            Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation avec tous les détails.
          </p>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Détails de la réservation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Référence de réservation</h3>
                <p className="text-gray-600">{bookingRef}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Date de réservation</h3>
                <p className="text-gray-600">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/packs"
              className="block w-full bg-white text-honda-red border-2 border-honda-red px-6 py-3 rounded-full hover:bg-honda-red hover:text-white transition-colors"
            >
              Voir les autres packs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 