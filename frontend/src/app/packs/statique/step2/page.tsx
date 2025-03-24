'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PackForm from '@/components/packs/PackForm'
import PackSummary from '@/components/packs/PackSummary'
import { getAvailableDates } from '@/lib/api'

const packDetails = {
  name: 'Pack Statique',
  description: 'Découvrez nos véhicules en exposition statique',
  price: 50,
  duration: '1 journée',
  maxParticipants: 2,
  includes: [
    'Accès à l\'exposition des véhicules',
    'Présentation détaillée des modèles',
    'Session photo avec les véhicules',
    'Buffet déjeuner inclus',
    'Goodies Honda offerts'
  ]
}

export default function StatiqueStep2Page() {
  const router = useRouter()
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: '',
    numberOfGuests: '1'
  })

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const dates = await getAvailableDates()
        setAvailableDates(dates)
      } catch (error) {
        console.error('Error fetching dates:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDates()
  }, [])

  const handleSubmit = (data: any) => {
    setFormData(data)
    router.push('/packs/statique/step3')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pack Statique - Étape 2</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PackForm
              packType="statique"
              packDetails={packDetails}
              availableDates={availableDates}
              onSuccess={handleSubmit}
            />
          </div>
          
          <div>
            <PackSummary
              packDetails={packDetails}
              selectedDate={formData.date}
              numberOfGuests={parseInt(formData.numberOfGuests)}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 