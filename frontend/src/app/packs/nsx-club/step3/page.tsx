'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PackForm from '@/components/packs/PackForm'
import PackSummary from '@/components/packs/PackSummary'
import { validatePromoCode } from '@/lib/api'

const packDetails = {
  name: 'Pack NSX Club',
  description: 'Une expérience exclusive pour les membres du club NSX',
  price: 200,
  duration: '1 journée',
  maxParticipants: 2,
  includes: [
    'Accès VIP à l\'exposition NSX',
    'Session de pilotage sur circuit',
    'Formation sécurité et briefing',
    'Équipement de protection fourni',
    'Photos et vidéos de votre session',
    'Déjeuner gastronomique inclus',
    'Goodies NSX exclusifs'
  ]
}

export default function NSXClubStep3Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState<number>()
  const [isValidatingPromo, setIsValidatingPromo] = useState(false)
  const [promoError, setPromoError] = useState('')

  const handlePromoCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return

    setIsValidatingPromo(true)
    setPromoError('')

    try {
      const response = await validatePromoCode(promoCode)
      setDiscount(response.discount)
    } catch (error) {
      setPromoError('Code promo invalide')
    } finally {
      setIsValidatingPromo(false)
    }
  }

  const handleSubmit = async (data: any) => {
    setFormData(data)
    router.push('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pack NSX Club - Étape 3</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PackForm
              packType="nsx-club"
              packDetails={packDetails}
              availableDates={[]}
              onSuccess={handleSubmit}
            />

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Code promo</h2>
              <form onSubmit={handlePromoCodeSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Entrez votre code promo"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-honda-red focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isValidatingPromo}
                  className="bg-honda-red text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {isValidatingPromo ? 'Validation...' : 'Valider'}
                </button>
              </form>
              {promoError && (
                <p className="mt-2 text-red-500 text-sm">{promoError}</p>
              )}
            </div>
          </div>
          
          <div>
            <PackSummary
              packDetails={packDetails}
              numberOfGuests={1}
              promoCode={promoCode}
              discount={discount}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 