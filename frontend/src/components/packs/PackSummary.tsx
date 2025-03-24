import { formatPrice } from '@/lib/helpers'


interface PackSummaryProps {
  packDetails: {
    name: string
    description: string
    price: number
    duration: string
    maxParticipants: number
    includes: string[]
  }
  selectedDate?: string
  numberOfGuests: number
  promoCode?: string
  discount?: number
}


export default function PackSummary({
  packDetails,
  selectedDate,
  numberOfGuests,
  promoCode,
  discount
}: PackSummaryProps) {
  const subtotal = packDetails.price * numberOfGuests
  const discountAmount = discount ? subtotal * (discount / 100) : 0
  const total = subtotal - discountAmount

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Récapitulatif</h2>

      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-medium text-gray-900">Pack sélectionné</h3>
          <p className="text-gray-600">{packDetails.name}</p>
        </div>

        {selectedDate && (
          <div>
            <h3 className="font-medium text-gray-900">Date</h3>
            <p className="text-gray-600">
              {new Date(selectedDate).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}

        <div>
          <h3 className="font-medium text-gray-900">Nombre de participants</h3>
          <p className="text-gray-600">{numberOfGuests} personne{numberOfGuests > 1 ? 's' : ''}</p>
        </div>

        {promoCode && (
          <div>
            <h3 className="font-medium text-gray-900">Code promo</h3>
            <p className="text-gray-600">{promoCode}</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction ({discount}%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Ce pack comprend :</h3>
        <ul className="space-y-2">
          {packDetails.includes.map((item, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 text-honda-red mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 