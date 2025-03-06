import { Volume2, Home, Map, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PracticalInfo = () => {
  return (
    <section id="info" className="py-24 bg-honda-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-black">INFORMATIONS</span> <span className="text-honda-red">PRATIQUES</span>
        </h2>
        <p className="text-center mb-12 text-black max-w-2xl mx-auto">
          Tout ce que vous devez savoir pour profiter pleinement de l'événement
          Honda TH Exclusive au Circuit de Mornay.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="hover-scale">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-honda-red/10">
                  <Volume2 className="h-8 w-8 text-honda-red" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Normes sonores</h3>
              <p className="text-sm text-center text-honda-gray">
                Limite de 95 dB en dynamique. Contrôles réguliers pendant les sessions de roulage.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-honda-red/10">
                  <Home className="h-8 w-8 text-honda-red" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Hébergement</h3>
              <p className="text-sm text-center text-honda-gray">
                Gîtes et hôtels à proximité. Camping non autorisé sur le circuit.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-honda-red/10">
                  <Map className="h-8 w-8 text-honda-red" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Accès & Parking</h3>
              <p className="text-sm text-center text-honda-gray">
                Parking visiteurs gratuit. Plan d'accès détaillé fourni après inscription.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-honda-red/10">
                  <Utensils className="h-8 w-8 text-honda-red" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Restauration</h3>
              <p className="text-sm text-center text-honda-gray">
                Food trucks variés sur place. Options végétariennes disponibles.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center text-black">Questions fréquentes</h3>
          <Accordion type="single" collapsible className="w-full">
          
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-black">Quels équipements sont requis pour les sessions de roulage ?</AccordionTrigger>
              <AccordionContent className="text-black">
                Pour les sessions de roulage, le casque homologué est obligatoire. Pour votre 
                sécurité, nous recommandons également le port de gants homologués et d'une 
                combinaison. Votre véhicule doit être en bon état général et équipé de pneus adaptés.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-black">Les animaux sont-ils autorisés ?</AccordionTrigger>
              <AccordionContent className="text-black">
                Pour des raisons de sécurité et de confort, les animaux ne sont pas autorisés 
                sur le site de l'événement, à l'exception des chiens d'assistance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-black">Y a-t-il des hébergements recommandés à proximité ?</AccordionTrigger>
              <AccordionContent className="text-black">
                Nous avons des partenariats avec plusieurs établissements à proximité du circuit. 
                La liste complète avec codes de réduction sera envoyée par email après votre inscription.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-black">Les accompagnateurs doivent-ils payer l'entrée ?</AccordionTrigger>
              <AccordionContent className="text-black">
                Oui, tous les accompagnateurs doivent s'acquitter du tarif visiteur de 20€. 
                Les enfants de moins de 12 ans bénéficient d'une entrée gratuite (sous surveillance 
                d'un adulte).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mt-16 px-4 py-8 rounded-lg bg-honda-red/5 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center text-black">À propos de la restauration</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2 text-black">Little Tokyo</h4>
              <p className="text-sm text-black mb-2">Cuisine japonaise</p>
              <p className="text-sm font-medium text-honda-red">Plats à partir de 10€</p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2 text-black">Pit Stop Burger</h4>
              <p className="text-sm text-black mb-2">Burgers & Frites</p>
              <p className="text-sm font-medium text-honda-red">Plats à partir de 9€</p>
            </div>
            
            <div className="text-center bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2 text-black">Green Paddock</h4>
              <p className="text-sm text-black mb-2">Options végétariennes</p>
              <p className="text-sm font-medium text-honda-red">Plats à partir de 8€</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;
