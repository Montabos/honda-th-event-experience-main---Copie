import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-honda-red mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
} 