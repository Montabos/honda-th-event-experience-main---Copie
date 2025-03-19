import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User, Car, PanelTop, Award, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationCards = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: "visiteur",
      title: "Visiteur",
      price: "12€",
      icon: <User className="h-10 w-10 text-honda-red" />,
      description: "Accès visiteur à tout l'évènement",
      features: [
        "Accès au paddock",
        "Accès aux zones spectateurs",
        "Accès à l'exposition statique",
        "Accès aux animations et concerts"
      ],
      highlight: false,
      route: "/pack/visiteur"
    },
    {
      id: "static",
      title: "Exposition statique",
      price: "20€",
      icon: <Car className="h-10 w-10 text-honda-red" />,
      description: "Exposez votre Honda dans l'espace dédié",
      features: [
        "Tous les avantages du pack Visiteur",
        "Emplacement réservé pour votre véhicule",
        "Participation à la parade",
        "Ajoutez des accompagnants !"
      ],
      highlight: false,
      route: "/pack/statique"
    },
    {
      id: "track",
      title: "Accès piste",
      price: "150€",
      icon: <PanelTop className="h-10 w-10 text-honda-red" />,
      description: "Pilotez sur le Circuit de Mornay",
      features: [
        "Tous les avantages du pack Exposition",
        "Sessions de roulage (piste ouverte 6h/jour)",
        "Briefing de sécurité",
        "Ajoutez des pilotes/accompagnants !"
      ],
      highlight: true,
      route: "/pack/piste"
    },
    {
      id: "nsx-vip",
      title: "NSX Club VIP",
      price: "30€",
      icon: <Award className="h-10 w-10 text-honda-gold" />,
      description: "Pack exclusif pour les propriétaires NSX",
      features: [
        "Tous les avantages du pack Exposition",
        "Accès à l'espace NSX Club",
        "Session exclusive paradeNSX sur circuit",
        "Emplacement exclusif dans le parc du chateau"
      ],
      highlight: false,
      route: "/pack/nsx-club"
    }
  ];

  const handleRegistration = (pack) => {
    const packData = {
      id: pack.id,
      title: pack.title,
      price: pack.price,
      description: pack.description,
      features: pack.features,
      highlight: pack.highlight,
      route: pack.route
    };

    navigate(pack.route, { 
      state: { pack: packData },
      replace: false
    });
  };

  return (
    <section id="registration" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-honda-red font-display">INSCRIPTION</span>
          <span className="text-black/90 ml-2">& TARIFS</span>
        </h2>
        <p className="text-center mb-12 text-black/70 max-w-2xl mx-auto text-base md:text-lg">
          Choisissez la formule qui correspond à vos envies et à votre véhicule.
          Paiement sécurisé par carte bancaire.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`overflow-hidden transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                pkg.highlight ? 'shadow-xl border-t-2 border-t-honda-red border border-gray-100 relative bg-white' : 'shadow-md bg-white'
              } ${pkg.title === "NSX Club VIP" ? 'border-t-2 border-t-honda-gold border border-gray-100' : ''}`}
              onClick={() => handleRegistration(pkg)}
            >
              {pkg.highlight && (
                <div className="absolute top-2 right-4 bg-honda-red text-white px-3 py-0.5 text-[10px] font-medium rounded-full shadow-sm">
                  POPULAIRE
                </div>
              )}
              {pkg.title === "NSX Club VIP" && (
                <div className="absolute top-2 right-4 bg-honda-gold text-honda-dark px-3 py-0.5 text-[10px] font-medium rounded-full shadow-sm">
                  VIP
                </div>
              )}
              <div className={`absolute top-0 left-0 right-0 h-[183px] ${pkg.highlight ? 'bg-honda-red/5' : ''} ${pkg.title === "NSX Club VIP" ? 'bg-honda-gold/5' : ''}`} />
              <CardHeader className="pb-2 relative">
                <div className="flex justify-center mb-2">
                  <div className={`p-3 rounded-full ${
                    pkg.title === "NSX Club VIP" ? 'bg-honda-gold/10' : 'bg-honda-red/10'
                  }`}>
                    {pkg.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-center text-black/90">{pkg.title}</CardTitle>
                <CardDescription className="text-center text-black/60 min-h-[48px]">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 h-[280px]">
                <div className="text-center mb-6 h-[60px] flex flex-col justify-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-black/90">{pkg.price.replace('€', '')}</span>
                    <span className="text-xl font-medium text-black/90 ml-1">€</span>
                  </div>
                  <span className="text-sm text-black/60 mt-1">/ jour</span>
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 mr-2 shrink-0 mt-0.5 ${
                        pkg.title === "NSX Club VIP" ? 'text-honda-gold' : 'text-honda-red'
                      }`} />
                      <span className="text-sm text-black/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegistration(pkg);
                  }}
                  className={`w-full py-6 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    pkg.highlight 
                      ? 'bg-honda-red text-white shadow-md hover:shadow-lg hover:bg-honda-hover-red' 
                      : pkg.title === "NSX Club VIP"
                        ? 'bg-honda-gold text-honda-dark shadow-md hover:shadow-lg hover:bg-honda-gold/90'
                        : 'bg-honda-dark text-white shadow-md hover:shadow-lg hover:bg-honda-dark/90'
                  }`}
                >
                  Je m'inscris
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto text-center bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-black/90">Paiement sécurisé</h3>
          <p className="text-black/70 mb-8 text-base md:text-lg">
            Votre inscription n'est validée qu'après réception du paiement. Un email de confirmation
            vous sera envoyé avec tous les détails pratiques.
          </p>
          <div className="flex justify-center gap-6 items-center">
            <img src="/Pictures/cb1.png" alt="CB1" className="h-6 md:h-8 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <img src="/Pictures/cb2.png" alt="CB2" className="h-6 md:h-8 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <img src="/Pictures/cb3.png" alt="CB3" className="h-6 md:h-8 opacity-80 hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationCards;