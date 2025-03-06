
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Banner = () => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1630005128856-9b8473b3db83?q=80&w=2070&auto=format&fit=crop',
      alt: 'Honda NSX on track',
    },
    {
      url: 'https://images.unsplash.com/photo-1666919643134-d97687c1826c?q=80&w=2071&auto=format&fit=crop',
      alt: 'Honda Type R',
    },
    {
      url: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=2070&auto=format&fit=crop',
      alt: 'Honda S2000',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background images with fade transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-honda-dark via-honda-dark/50 to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="staggered-fade-in text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-shadow-lg">
            <span className="font-display">HONDA</span> <span className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span>
          </h1>
          <p className="text-xl md:text-3xl font-light mb-8 text-shadow">
            L'événement exclusif des passionnés Honda.
          </p>
          <p className="text-base md:text-lg font-light mb-12 max-w-2xl mx-auto text-white/80 text-shadow-sm">
            21-22 JUIN 2025 • CIRCUIT DE MORNAY
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-honda-red hover:bg-honda-hover-red text-white py-6 px-8 rounded-md text-lg hover:scale-105 transition-all duration-300">
              Je m'inscris
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 py-6 px-8 rounded-md text-lg">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white transition-opacity duration-300 hover:opacity-80 animate-float"
      >
        <ChevronDown size={32} />
      </button>
    </div>
  );
};

export default Banner;
