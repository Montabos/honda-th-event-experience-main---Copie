import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">À propos de Honda TH Event</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-4">
              Honda TH Event est née de la passion pour l'automobile et le désir de partager
              l'excellence Honda avec nos clients. Depuis notre création, nous nous engageons
              à offrir des expériences uniques et mémorables.
            </p>
            <p className="text-gray-600">
              Notre mission est de permettre à chacun de découvrir et d'expérimenter
              l'innovation et la performance Honda dans un cadre privilégié.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/about/history.jpg"
              alt="Histoire Honda"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-honda-red text-4xl font-bold mb-4">10+</div>
            <h3 className="text-xl font-semibold mb-2">Années d'expérience</h3>
            <p className="text-gray-600">
              Plus de 10 ans d'expertise dans l'organisation d'événements automobiles
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-honda-red text-4xl font-bold mb-4">1000+</div>
            <h3 className="text-xl font-semibold mb-2">Clients satisfaits</h3>
            <p className="text-gray-600">
              Des milliers de participants ravis de leur expérience
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-honda-red text-4xl font-bold mb-4">4</div>
            <h3 className="text-xl font-semibold mb-2">Packs différents</h3>
            <p className="text-gray-600">
              Des expériences adaptées à tous les profils
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Notre Équipe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Notre équipe passionnée est là pour vous accompagner dans votre expérience
            Honda TH Event. Des experts automobiles aux organisateurs d'événements,
            nous mettons tout en œuvre pour vous offrir un service d'excellence.
          </p>
        </div>
      </div>
    </div>
  )
} 