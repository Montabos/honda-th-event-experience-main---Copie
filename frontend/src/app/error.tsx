'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-honda-red mb-4">Erreur</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Une erreur est survenue</h2>
        <p className="text-gray-600 mb-8">
          Désolé, une erreur inattendue s'est produite. Veuillez réessayer.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-block bg-white text-honda-red border-2 border-honda-red px-6 py-3 rounded-full hover:bg-honda-red hover:text-white transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
} 