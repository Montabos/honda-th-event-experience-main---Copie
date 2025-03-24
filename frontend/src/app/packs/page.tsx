import Image from 'next/image'
import Link from 'next/link'


const packs = [
  {
    id: 'visitor',
    name: 'Pack Visitor',
    description: 'Découvrez l\'univers Honda en tant que visiteur',
    price: 'Gratuit',
    image: '/images/packs/visitor.jpg',
    features: [
      'Accès à l\'exposition des véhicules',
      'Présentation de la gamme Honda',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ]
  },
  {
    id: 'statique',
    name: 'Pack Statique',
    description: 'Explorez nos véhicules à l\'arrêt',
    price: 'À partir de 99€',
    image: '/images/packs/statique.jpg',
    features: [
      'Accès à l\'exposition des véhicules',
      'Session statique avec un expert',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ]
  },
  {
    id: 'piste',
    name: 'Pack Piste',
    description: 'Vivez l\'expérience sur circuit',
    price: 'À partir de 199€',
    image: '/images/packs/piste.jpg',
    features: [
      'Accès à l\'exposition des véhicules',
      'Session sur piste avec instructeur',
      'Buffet déjeuner inclus',
      'Goodies Honda offerts'
    ]
  },
  {
    id: 'nsx-club',
    name: 'Pack NSX Club',
    description: 'L\'expérience ultime avec la NSX',
    price: 'À partir de 299€',
    image: '/images/packs/nsx.jpg',
    features: [
      'Accès à l\'exposition des véhicules',
      'Session exclusive avec la NSX',
      'Buffet déjeuner premium inclus',
      'Goodies Honda premium offerts'
    ]
  }
]


export default function PacksPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nos Packs d\'Expérience</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos différents packs d\'expérience et choisissez celui qui vous correspond le mieux.
          Chaque pack est conçu pour vous offrir une expérience unique avec Honda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packs.map((pack) => (
          <div key={pack.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={pack.image}
                alt={pack.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{pack.name}</h2>
              <p className="text-gray-600 mb-4">{pack.description}</p>
              <div className="text-honda-red font-semibold mb-4">{pack.price}</div>
              <ul className="space-y-2 mb-6">
                {pack.features.map((feature, index) => (
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
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/packs/${pack.id}/step1`}
                className="block w-full text-center bg-honda-red text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Choisir ce pack
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 