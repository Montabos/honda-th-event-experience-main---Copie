'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PackSummary from '@/components/packs/PackSummary'
import Button from '@/components/ui/Button'
import { generateBookingReference } from '@/lib/helpers'

const packDetails = {
  name: 'Pack Visitor',
  description: 'Découvrez l\'univers Honda en tant que visiteur',
  price: 0,
  duration: '1 journée',
  maxParticipants: 4,
  includes: [
    'Accès à l\'exposition des véhicules',
    'Présentation de la gamme Honda',
    'Buffet déjeuner inclus',
    'Goodies Honda offerts'
  ]
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const bookingRef = generateBookingReference()

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // TODO: Implement payment processing
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated payment
      router.push('/checkout/success')
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Finaliser la réservation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Récapitulatif de la commande</h2>
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Paiement</h2>
              <p className="text-gray-600 mb-6">
                Le pack Visitor est gratuit. Aucun paiement n'est requis.
              </p>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Traitement en cours...' : 'Confirmer la réservation'}
              </Button>
            </div>
          </div>
          
          <div>
            <PackSummary
              packDetails={packDetails}
              numberOfGuests={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 