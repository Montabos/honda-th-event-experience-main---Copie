import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
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

  const reviews = [
    {
      name: "Thomas Laurent",
      role: "Propriétaire NSX",
      year: "2024",
      rating: 5,
      text: "Un événement exceptionnel qui m'a permis de rencontrer d'autres passionnés Honda. Les sessions de roulage étaient parfaitement organisées et la parade NSX restera un moment inoubliable.",
      image: "/Pictures/nsx.jpg",
      featured: true
    },
    {
      name: "Marie Dubois",
      role: "Propriétaire Civic Type R",
      year: "2024",
      rating: 5,
      text: "La qualité de l'organisation et l'ambiance étaient au rendez-vous. Les food trucks étaient délicieux et les animations très variées.",
      featured: false
    },
    {
      name: "Pierre Martin",
      role: "Propriétaire S2000",
      year: "2023",
      rating: 5,
      text: "Une expérience unique qui m'a permis de découvrir le circuit de Mornay dans des conditions optimales. Les sessions de roulage étaient parfaitement encadrées.",
      image: "/Pictures/track.jpg",
      featured: true
    },
    {
      name: "Sophie Bernard",
      role: "Propriétaire Type R",
      year: "2023",
      rating: 5,
      text: "L'événement était à la hauteur de mes attentes. L'organisation était impeccable et l'ambiance entre participants était fantastique.",
      featured: false
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-honda-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          TÉMOIGNAGES <span className="text-honda-red">DES PARTICIPANTS</span>
        </h2>
        <p className="text-center mb-16 text-honda-textMuted max-w-2xl mx-auto">
          Découvrez les retours d'expérience des participants des années précédentes.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className={`overflow-hidden bg-transparent border border-white/10 hover:border-honda-red/30 transition-all duration-300 ${
                review.featured ? 'md:col-span-2' : ''
              }`}
            >
              <CardContent className="p-0">
                {review.image && (
                  <div 
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${review.image})` }}
                  />
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-honda-red fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-honda-red mb-4 opacity-50" />
                  <p className="text-lg mb-6 text-white/90 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{review.name}</p>
                      <p className="text-sm text-white/60">{review.role}</p>
                    </div>
                    <span className="text-sm text-white/40">{review.year}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-honda-textMuted mb-6">
            Rejoignez-nous cette année pour vivre une expérience inoubliable.
          </p>
          <Button 
            variant="default"
            className="bg-honda-red hover:bg-honda-hover-red text-white px-8 py-3 rounded-md transition-all duration-300"
            onClick={handleRegistration}
          >
            Je m'inscris
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 