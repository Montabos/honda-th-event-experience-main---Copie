import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const carImages = [
    {
      type: "image",
      url: "/Pictures/nsx.jpg",
      alt: "Honda NSX",
      caption: "Honda NSX - L'excellence Honda"
    },
    {
      type: "image",
      url: "/Pictures/typer.jpg",
      alt: "Honda Civic Type R",
      caption: "Honda Civic Type R - La référence sur circuit"
    },
    {
      type: "image",
      url: "/Pictures/track.jpg",
      alt: "Honda on track",
      caption: "Honda en action sur le Circuit de Mornay"
    },
    {
      type: "image",
      url: "/Pictures/2020_honda_civic_type_r-50227.jpg",
      alt: "Honda Civic Type R",
      caption: "Type R - Performance ultime"
    },
    {
      type: "image",
      url: "/Pictures/2021-honda-civic-type-r-tcr-5.jpg",
      alt: "Honda Civic Type R TCR",
      caption: "Type R TCR - La compétition dans l'ADN"
    },
    {
      type: "image",
      url: "/Pictures/2023_Honda_Civic_FL5_TCR_1056-large.jpg",
      alt: "Honda Civic FL5 TCR",
      caption: "Nouvelle Civic FL5 TCR - L'évolution de la performance"
    },
    {
      type: "image",
      url: "/Pictures/a741fa4caa80ad5701902104c3fa84b1.jpg",
      alt: "Honda Type R Racing",
      caption: "Type R - L'esprit racing"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carImages.length) % carImages.length);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const x = e.clientX;
    const diff = startX - x;
    
    if (diff > 50) {
      nextSlide();
      setIsDragging(false);
    } else if (diff < -50) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const x = e.touches[0].clientX;
    const diff = startX - x;
    
    if (diff > 50) {
      nextSlide();
      setIsDragging(false);
    } else if (diff < -50) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="gallery" className="py-24 bg-honda-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          GALERIE <span className="text-honda-red">HONDA</span>
        </h2>
        <p className="text-center mb-12 text-honda-textMuted max-w-2xl mx-auto">
          Vibrez au cœur de la légende Honda.<br />
          Découvrez un rassemblement unique des plus belles Honda.
        </p>
        
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg shadow-xl">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-honda-red text-white p-2 rounded-full transition-colors duration-300"
            aria-label="Image précédente"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-honda-red text-white p-2 rounded-full transition-colors duration-300"
            aria-label="Image suivante"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="relative h-[300px] md:h-[500px] w-full overflow-hidden cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {carImages.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {item.type === "image" ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.url})` }}
                    aria-label={item.alt}
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <iframe
                      src={item.url}
                      className={`absolute inset-0 w-full h-full ${index === activeIndex ? '' : 'hidden'}`}
                      title={item.alt}
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                    />
                  </div>
                )}
                
                {/* Caption with improved readability */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-6">
                  <p className="text-white text-lg md:text-xl font-medium text-shadow">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-20">
            {carImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  index === activeIndex ? 'bg-honda-red' : 'bg-white/50 hover:bg-white'
                } transition-colors duration-300`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-honda-textMuted mb-6">
            Ces modèles et bien d'autres vous attendent lors de l'événement Honda TH Exclusive.
            Rejoignez-nous pour admirer ces véhicules d'exception en personne.
          </p>
          <Button className="bg-honda-red hover:bg-honda-hover-red text-white" onClick={() => window.location.href = '/#registration'}>
            Je veux y être
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
