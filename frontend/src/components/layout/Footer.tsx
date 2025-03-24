import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-honda-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Honda TH Event</h3>
            <p className="text-gray-400">
              Vivez une expérience unique avec Honda
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-honda-red transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-gray-400 hover:text-honda-red transition-colors">
                  Programme
                </Link>
              </li>
              <li>
                <Link href="/packs" className="text-gray-400 hover:text-honda-red transition-colors">
                  Nos packs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@honda-th.fr</li>
              <li>Tél: +33 1 23 45 67 89</li>
              <li>Adresse: 123 rue Example, Paris</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-honda-red transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-honda-red transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-honda-red transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Honda TH Event. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 