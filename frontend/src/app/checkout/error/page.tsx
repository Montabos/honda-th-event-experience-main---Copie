'use client'

import Link from 'next/link'

export default function CheckoutErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
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
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Une erreur est survenue
          </h1>
          
          <p className="text-gray-600 mb-8">
            Désolé, une erreur est survenue lors du traitement de votre réservation. Veuillez réessayer ou nous contacter si le problème persiste.
          </p>

          <div className="space-y-4">
            <Link
              href="/checkout"
              className="block w-full bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Réessayer
            </Link>
            <Link
              href="/contact"
              className="block w-full bg-white text-honda-red border-2 border-honda-red px-6 py-3 rounded-full hover:bg-honda-red hover:text-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 