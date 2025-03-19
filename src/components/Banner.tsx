import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Banner = () => {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    {
      url: '/Pictures/track.jpg',
      alt: 'Honda on track',
      duration: 10000, // 10 seconds for the track image
    },
    {
      url: '/Pictures/nsx.jpg',
      alt: 'Honda NSX',
      duration: 5000, // 5 seconds for other images
    },
    {
      url: '/Pictures/typer.jpg',
      alt: 'Honda Type R',
      duration: 5000,
    },
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const rotateImage = () => {
      const currentImage = images[activeImage];
      timeoutId = setTimeout(() => {
        setActiveImage((current) => (current + 1) % images.length);
      }, currentImage.duration);
    };

    rotateImage();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeImage, images]);

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
            <span  className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span> <span className="font-display">HONDA</span> 
          </h1>
          <p className="text-xl md:text-3xl font-light mb-8 text-shadow">
            L'événement exclusif des passionnés Honda.
          </p>
          <p className="text-base md:text-lg font-light mb-12 max-w-2xl mx-auto text-white/80 text-shadow-sm">
            21-22 JUIN 2025 • CIRCUIT DE MORNAY
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-honda-red hover:bg-honda-hover-red text-white py-6 px-8 rounded-md text-lg hover:scale-105 transition-all duration-300" onClick={() => {
              const registrationSection = document.getElementById('registration');
              if (registrationSection) {
                registrationSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Je m'inscris
            </Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 py-6 px-8 rounded-md text-lg" onClick={() => window.location.href = '/#about'}>
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
