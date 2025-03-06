import { useState } from 'react';
import { MapPin, Calendar, Users, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventInfo = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <section id="about" className="py-24 bg-honda-light relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-honda-red font-display drop-shadow-md">TH EXCLUSIVE</span> <span className="text-black">- L'ÉVÉNEMENT HONDA PAR EXCELLENCE</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-black mb-6 leading-relaxed">
                Honda TH Exclusive est un événement unique dédié aux passionnés de véhicules Honda rares et d'exception. 
                Durant deux jours, profitez d'un rassemblement exceptionnel au Circuit de Mornay et découvrez les plus 
                beaux modèles de la marque dans une ambiance conviviale entre passionnés.
              </p>
              
              <p className="text-black mb-6 leading-relaxed">
                Que vous soyez propriétaire d'un modèle d'exception ou simple amateur, rejoignez-nous pour célébrer 
                l'héritage et l'excellence Honda au travers de nombreuses activités et animations.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-honda-dark text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-honda-dark/80">Roulage sur circuit</span>
                <span className="px-4 py-2 bg-honda-dark text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-honda-dark/80">Exposition statique</span>
                <span className="px-4 py-2 bg-honda-dark text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-honda-dark/80">Parades</span>
                <span className="px-4 py-2 bg-honda-dark text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-honda-dark/80">Animations</span>
                <span className="px-4 py-2 bg-honda-dark text-white rounded-full text-sm font-medium transition-colors duration-200 hover:bg-honda-dark/80">Restauration</span>
              </div>
              
              <Button 
                variant="default" 
                className="bg-honda-red hover:bg-honda-hover-red text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin className="mr-2 h-5 w-5" /> Voir l'emplacement
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card className="overflow-hidden hover-scale group bg-honda-dark text-white">
                <CardContent className="p-0 relative">
                  <div className="bg-honda-red h-1 w-full"></div>
                  <div className="p-6 flex items-center">
                    <Calendar className="h-6 w-6 mr-4 text-honda-red" />
                    <div>
                      <h3 className="font-medium mb-1">Date et lieu</h3>
                      <p className="font-medium text-white/90 mb-1">21-22 Juin 2025</p>
                      <p className="text-white/70">Circuit de Mornay, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover-scale group bg-honda-dark text-white">
                <CardContent className="p-0 relative">
                  <div className="bg-honda-red h-1 w-full"></div>
                  <div className="p-6 flex items-center">
                    <Users className="h-6 w-6 mr-4 text-honda-red" />
                    <div>
                      <h3 className="font-medium mb-1">Public concerné</h3>
                      <p className="font-medium text-white/90 mb-1">Passionnés Honda</p>
                      <p className="text-white/70">Propriétaires et amateurs de modèles rares Honda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover-scale group bg-honda-dark text-white">
                <CardContent className="p-0 relative">
                  <div className="bg-honda-red h-1 w-full"></div>
                  <div className="p-6 flex items-center">
                    <Trophy className="h-6 w-6 mr-4 text-honda-red" />
                    <div>
                      <h3 className="font-medium mb-1">Points forts</h3>
                      <p className="font-medium text-white/90 mb-1">Exposition NSX & Type R</p>
                      <p className="text-white/70">Accès piste, parades, concerts et tombola</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-11/12 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Circuit de Mornay</h3>
              <Button variant="ghost" onClick={() => setIsMapOpen(false)}>
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44962.48857591783!2d2.2693127!3d48.8249663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6715116e8688d%3A0x9dbc488c2f49b19d!2sCircuit%20de%20Montlh%C3%A9ry!5e0!3m2!1sfr!2sfr!4v1687960432682!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Le Circuit de Mornay est situé à environ 30 minutes de Paris. Accès facile par l'autoroute A6, sortie Mornay.
              </p>
              <div className="mt-4 flex justify-end">
                <Button className="bg-honda-red hover:bg-honda-hover-red text-white">
                  Itinéraire
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventInfo;
