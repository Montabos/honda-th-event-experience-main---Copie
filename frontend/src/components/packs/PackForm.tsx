'use client'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { validateEmail, validatePhone } from '@/lib/helpers'
import { submitRegistration } from '@/lib/api'


interface PackFormProps {
  packType: string
  packDetails: {
    name: string
    price: number
    duration: string
    maxParticipants: number
  }
  availableDates: string[]
  onSuccess?: (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    date: string
    numberOfGuests: string
    specialRequests: string
  }) => void
}


export default function PackForm({ packType, packDetails, availableDates, onSuccess }: PackFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    numberOfGuests: '1',
    specialRequests: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }


  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide'
    }
    
    if (!formData.date) {
      newErrors.date = 'La date est requise'
    }
    
    if (!formData.numberOfGuests) {
      newErrors.numberOfGuests = 'Le nombre de participants est requis'
    } else if (parseInt(formData.numberOfGuests) > packDetails.maxParticipants) {
      newErrors.numberOfGuests = `Maximum ${packDetails.maxParticipants} participants`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      await submitRegistration({
        ...formData,
        packType,
        numberOfGuests: parseInt(formData.numberOfGuests)
      })
      onSuccess?.(formData)
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors(prev => ({
        ...prev,
        submit: 'Une erreur est survenue lors de l\'envoi du formulaire'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          options={[
            { value: '', label: 'Sélectionnez une date' },
            ...availableDates.map(date => ({
              value: date,
              label: new Date(date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }))
          ]}
        />
        <Select
          label="Nombre de participants"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          error={errors.numberOfGuests}
          options={[
            { value: '', label: 'Sélectionnez le nombre de participants' },
            ...Array.from({ length: packDetails.maxParticipants }, (_, i) => ({
              value: (i + 1).toString(),
              label: `${i + 1} participant${i > 0 ? 's' : ''}`
            }))
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Demandes spéciales
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-honda-red focus:border-transparent"
          placeholder="Avez-vous des demandes particulières ? (allergies, préférences, etc.)"
        />
      </div>

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Réserver maintenant'}
      </Button>
    </form>
  )
} 