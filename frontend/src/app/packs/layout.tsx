import Link from 'next/link'
import { usePathname } from 'next/navigation'


const packTypes = [
  { id: 'visitor', name: 'Pack Visitor', path: '/packs/visitor' },
  { id: 'statique', name: 'Pack Statique', path: '/packs/statique' },
  { id: 'piste', name: 'Pack Piste', path: '/packs/piste' },
  { id: 'nsx-club', name: 'Pack NSX Club', path: '/packs/nsx-club' }
]


export default function PacksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentPack = pathname.split('/')[2] // Get the current pack type from URL


  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nos Packs</h2>
              <nav className="space-y-2">
                {packTypes.map((pack) => (
                  <Link
                    key={pack.id}
                    href={pack.path}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      currentPack === pack.id
                        ? 'bg-honda-red text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pack.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 