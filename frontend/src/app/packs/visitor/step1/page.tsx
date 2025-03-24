'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PackDetails from '@/components/packs/PackDetails'
import PackSummary from '@/components/packs/PackSummary'
import { getPackDetails, getAvailableDates } from '@/lib/api'

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
  ],
  images: ['/images/packs/visitor.jpg']
}

export default function VisitorStep1Page() {
  const router = useRouter()
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const handleSelect = () => {
    router.push('/packs/visitor/step2')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Pack Visitor - Étape 1</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PackDetails
              packDetails={packDetails}
              onSelect={handleSelect}
            />
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