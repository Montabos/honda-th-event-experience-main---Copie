import Image from 'next/image'


export default function ProgramPage() {
  const programItems = [
    {
      time: '9h00',
      title: 'Accueil des participants',
      description: 'Enregistrement et remise des badges',
      icon: '🎫'
    },
    {
      time: '10h00',
      title: 'Présentation des véhicules',
      description: 'Découverte de la gamme Honda',
      icon: '🚗'
    },
    {
      time: '11h30',
      title: 'Sessions statiques',
      description: 'Exploration détaillée des véhicules',
      icon: '🔍'
    },
    {
      time: '13h00',
      title: 'Pause déjeuner',
      description: 'Buffet et networking',
      icon: '🍽️'
    },
    {
      time: '14h30',
      title: 'Sessions sur piste',
      description: 'Test drive et expérience circuit',
      icon: '🏎️'
    },
    {
      time: '16h30',
      title: 'Session NSX Club',
      description: 'Expérience exclusive avec la NSX',
      icon: '🌟'
    }
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Programme de la journée</h1>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {programItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 w-24 text-center">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="text-honda-red font-semibold text-xl mt-2">{item.time}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Informations pratiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Horaires</h3>
              <p className="text-gray-600">
                L'événement se déroule de 9h00 à 17h00.<br />
                Merci d'arriver 15 minutes avant le début de l'événement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Lieu</h3>
              <p className="text-gray-600">
                Circuit de test Honda<br />
                123 rue Example<br />
                75000 Paris
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Équipement requis</h3>
              <p className="text-gray-600">
                - Vêtements confortables<br />
                - Chaussures fermées<br />
                - Permis de conduire valide
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Repas</h3>
              <p className="text-gray-600">
                Un buffet déjeuner est inclus dans tous nos packs.<br />
                Merci de nous informer de vos éventuelles restrictions alimentaires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 