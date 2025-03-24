import api from './axios'

export interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  packType: string
  date: string
  numberOfGuests: number
  specialRequests?: string
}

export interface PackDetails {
  id: string
  name: string
  description: string
  price: number
  duration: string
  maxParticipants: number
  includes: string[]
}

export const submitRegistration = async (data: RegistrationData) => {
  try {
    const response = await api.post('/registrations', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPackDetails = async (packId: string): Promise<PackDetails> => {
  try {
    const response = await api.get(`/packs/${packId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getAvailableDates = async () => {
  try {
    const response = await api.get('/dates')
    return response.data
  } catch (error) {
    throw error
  }
}

export const validatePromoCode = async (code: string) => {
  try {
    const response = await api.post('/validate-promo', { code })
    return response.data
  } catch (error) {
    throw error
  }
} 