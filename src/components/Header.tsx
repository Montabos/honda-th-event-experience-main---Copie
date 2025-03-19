import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleRegistration = () => {
    setMobileMenuOpen(false); // Ferme le menu mobile si ouvert
    navigate('/pack/visiteur', { 
      state: { 
        pack: {
          id: "visitor",
          title: "Visiteur",
          price: "20€",
          description: "Accès visiteur pour tout le week-end",
          features: [
            "Accès au paddock",
            "Accès aux zones spectateurs",
            "Accès à l'exposition statique",
            "Accès aux animations et concerts"
          ]
        }
      }
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-honda-dark/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-xl md:text-2xl font-bold transition-all duration-300 text-white ${scrolled ? 'scale-90' : ''}`}>
            <span className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span> <span className="font-display">HONDA</span> 
          </h1>
          <div className="hidden md:block ml-6 text-white font-medium text-sm">21-22 JUIN 2025</div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">À propos</a>
          <a href="#program" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">Programme</a>
          <a href="#registration" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">Inscription</a>
          <a href="#vehicles" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">Véhicules</a>
          <a href="#info" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">Infos</a>
          <a href="#contact" className="text-white hover:text-honda-red transition-colors duration-200 link-hover-effect">Contact</a>
          <Button 
            variant="default" 
            className="bg-honda-red hover:bg-honda-hover-red text-white px-6 hover:scale-105 transition-transform duration-200"
            onClick={() => {
              const registrationSection = document.getElementById('registration');
              if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Inscription
          </Button>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" className="text-white p-2" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-honda-dark pt-16 z-40 w-full min-h-screen overflow-y-auto transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center space-y-6 pt-10 px-4">
          <a href="#about" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>À propos</a>
          <a href="#program" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Programme</a>
          <a href="#registration" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Inscription</a>
          <a href="#vehicles" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Véhicules</a>
          <a href="#info" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Infos</a>
          <a href="#contact" className="text-white text-xl hover:text-honda-red transition-colors duration-200" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="mt-4 text-white">21-22 JUIN 2025</div>
          <Button 
            variant="default" 
            className="bg-honda-red hover:bg-honda-hover-red text-white px-8 py-6 mt-6"
            onClick={handleRegistration}
          >
            Inscription
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
