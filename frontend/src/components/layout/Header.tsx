import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Honda Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-honda-black hover:text-honda-red transition-colors">
              À propos
            </Link>
            <Link href="/program" className="text-honda-black hover:text-honda-red transition-colors">
              Programme
            </Link>
            <Link href="/packs" className="text-honda-black hover:text-honda-red transition-colors">
              Nos packs
            </Link>
            <Link href="/contact" className="text-honda-black hover:text-honda-red transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header 