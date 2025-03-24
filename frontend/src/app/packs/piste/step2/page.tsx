'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PackForm from '@/components/packs/PackForm'
import PackSummary from '@/components/packs/PackSummary'
import { getAvailableDates } from '@/lib/api'

const packDetails = {
  name: 'Pack Piste',
  description: 'Vivez une expérience unique sur circuit',
  price: 150,
  duration: '1 journée',
  maxParticipants: 1,
  includes: [
    'Session de pilotage sur circuit',
    'Formation sécurité et briefing',
    'Équipement de protection fourni',
    'Photos et vidéos de votre session',
    'Buffet déjeuner inclus',
    'Goodies Honda offerts'
  ]
}

export default function PisteStep2Page() {
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
    router.push('/packs/piste/step3')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pack Piste - Étape 2</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PackForm
              packType="piste"
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