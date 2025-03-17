import { useState } from 'react';
import { MapPin, Calendar, Users, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EventInfo = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <section id="about" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            <span className="text-honda-red font-display tracking-wider">TH EXCLUSIVE</span>
            <span className="text-black/90 block md:inline text-2xl md:text-4xl mt-2 md:mt-0 md:ml-2">- L'ÉVÉNEMENT HONDA PAR EXCELLENCE</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-black/80 mb-6 leading-relaxed text-base md:text-lg">
                Honda TH Exclusive est un événement unique dédié aux passionnés de véhicules Honda rares et d'exception. 
                Durant deux jours, profitez d'un rassemblement exceptionnel au Circuit de Mornay et découvrez les plus 
                beaux modèles de la marque dans une ambiance conviviale entre passionnés.
              </p>
              
              <p className="text-black/80 mb-8 leading-relaxed text-base md:text-lg">
                Que vous soyez propriétaire d'un modèle d'exception ou simple amateur, rejoignez-nous pour célébrer 
                l'héritage et l'excellence Honda au travers de nombreuses activités et animations.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                <span className="px-4 py-2 bg-black/90 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-sm">Roulage sur circuit</span>
                <span className="px-4 py-2 bg-black/90 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-sm">Exposition statique</span>
                <span className="px-4 py-2 bg-black/90 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-sm">Parades</span>
                <span className="px-4 py-2 bg-black/90 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-sm">Animations</span>
                <span className="px-4 py-2 bg-black/90 text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black hover:shadow-sm">Restauration</span>
              </div>
              
              <Button 
                variant="default" 
                className="w-full md:w-auto bg-honda-red text-white shadow-sm transition-all duration-300 hover:bg-honda-hover-red hover:shadow-md"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin className="mr-2 h-5 w-5" /> Voir l'emplacement
              </Button>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="h-1 w-full bg-honda-red"></div>
                  <div className="p-5 md:p-6 flex items-start">
                    <Calendar className="h-6 w-6 mr-4 text-honda-red shrink-0" />
                    <div>
                      <h3 className="font-medium mb-2 text-black/90">Date et lieu</h3>
                      <p className="font-medium text-black/90 mb-1 text-lg">21-22 Juin 2025</p>
                      <p className="text-black/60">Circuit de Mornay, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="h-1 w-full bg-honda-red"></div>
                  <div className="p-5 md:p-6 flex items-start">
                    <Users className="h-6 w-6 mr-4 text-honda-red shrink-0" />
                    <div>
                      <h3 className="font-medium mb-2 text-black/90">Public concerné</h3>
                      <p className="font-medium text-black/90 mb-1 text-lg">Passionnés Honda</p>
                      <p className="text-black/60">Propriétaires et amateurs de modèles rares Honda</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="h-1 w-full bg-honda-red"></div>
                  <div className="p-5 md:p-6 flex items-start">
                    <Trophy className="h-6 w-6 mr-4 text-honda-red shrink-0" />
                    <div>
                      <h3 className="font-medium mb-2 text-black/90">Points forts</h3>
                      <p className="font-medium text-black/90 mb-1 text-lg">Exposition NSX & Type R</p>
                      <p className="text-black/60">Accès piste, parades, concerts et tombola</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-all duration-300">
          <div className="bg-white p-4 md:p-6 rounded-xl max-w-3xl w-[95%] md:w-11/12 max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black/90">Circuit de Mornay</h3>
              <Button 
                variant="ghost" 
                onClick={() => setIsMapOpen(false)}
                className="hover:bg-honda-red/10 hover:text-honda-red transition-colors duration-200"
              >
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44962.48857591783!2d2.2693127!3d48.8249663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6715116e8688d%3A0x9dbc488c2f49b19d!2sCircuit%20de%20Montlh%C3%A9ry!5e0!3m2!1sfr!2sfr!4v1687960432682!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="mt-6 text-sm md:text-base text-black/70">
              <p>
                Le Circuit de Mornay est situé à environ 30 minutes de Paris. Accès facile par l'autoroute A6, sortie Mornay.
              </p>
              <div className="mt-4 flex justify-end">
                <Button className="bg-honda-red text-white shadow-sm hover:bg-honda-hover-red hover:shadow-md transition-all duration-300">
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
