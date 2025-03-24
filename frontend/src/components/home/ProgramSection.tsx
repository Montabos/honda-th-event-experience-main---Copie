'use client'

const programSteps = [
  {
    time: '09:00',
    title: 'Accueil des participants',
    description: 'Café et viennoiseries de bienvenue'
  },
  {
    time: '09:30',
    title: 'Présentation de la journée',
    description: 'Briefing et consignes de sécurité'
  },
  {
    time: '10:00',
    title: 'Début des activités',
    description: 'Selon le pack choisi'
  },
  {
    time: '12:30',
    title: 'Déjeuner',
    description: 'Buffet gastronomique'
  },
  {
    time: '14:00',
    title: 'Reprise des activités',
    description: 'Suite du programme'
  },
  {
    time: '16:30',
    title: 'Session photos',
    description: 'Photos souvenirs avec les véhicules'
  },
  {
    time: '17:00',
    title: 'Remise des goodies',
    description: 'Cadeaux exclusifs Honda'
  },
  {
    time: '17:30',
    title: 'Fin de la journée',
    description: 'Remerciements et au revoir'
  }
]

export default function ProgramSection() {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">PROGRAMME DÉTAILLÉ</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-honda-red" />
            
            {/* Programme */}
            <div className="space-y-8">
              {programSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Point sur la timeline */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-honda-red rounded-full" />
                  
                  {/* Contenu */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-gray-900 rounded-lg p-6">
                      <div className="text-honda-red font-bold mb-2">{step.time}</div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Espace pour l'alignement */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 