import Image from 'next/image'
import { formatPrice } from '@/lib/helpers'


interface PackDetailsProps {
  packDetails: {
    name: string
    description: string
    price: number
    duration: string
    maxParticipants: number
    includes: string[]
    images?: string[]
  }
  onSelect?: () => void
}


export default function PackDetails({ packDetails, onSelect }: PackDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-64 md:h-96">
        {packDetails.images && packDetails.images.length > 0 ? (
          <Image
            src={packDetails.images[0]}
            alt={packDetails.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image non disponible</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{packDetails.name}</h2>
        <p className="text-gray-600 mb-4">{packDetails.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Prix</h3>
            <p className="text-xl font-semibold text-honda-red">
              {formatPrice(packDetails.price)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Durée</h3>
            <p className="text-xl font-semibold">{packDetails.duration}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Participants max</h3>
            <p className="text-xl font-semibold">{packDetails.maxParticipants}</p>
          </div>
        </div>

        <div className="mb-6">
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

        {onSelect && (
          <button
            onClick={onSelect}
            className="w-full bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Choisir ce pack
          </button>
        )}
      </div>
    </div>
  )
} 