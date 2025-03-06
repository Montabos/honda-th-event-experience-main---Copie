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

const Registration = () => {
  const packages = [
    {
      title: "Visiteur",
      price: "20€",
      icon: <User className="h-10 w-10 text-honda-red" />,
      description: "Accès visiteur pour tout le week-end",
      features: [
        "Accès au paddock",
        "Accès aux zones spectateurs",
        "Accès à l'exposition statique",
        "Accès aux animations et concerts"
      ],
      highlight: false
    },
    {
      title: "Exposition statique",
      price: "30€",
      icon: <Car className="h-10 w-10 text-honda-red" />,
      description: "Exposez votre Honda dans l'espace dédié",
      features: [
        "Tous les avantages du pack Visiteur",
        "Emplacement réservé pour votre véhicule",
        "Accès à l'expo par modèle",
        "Badge participant exclusif"
      ],
      highlight: false
    },
    {
      title: "Accès piste",
      price: "270€",
      icon: <PanelTop className="h-10 w-10 text-honda-red" />,
      description: "Pilotez sur le Circuit de Mornay",
      features: [
        "Tous les avantages du pack Exposition",
        "Sessions de roulage (4 x 20 min par jour)",
        "Briefing de sécurité",
        "Assurance RC Circuit incluse"
      ],
      highlight: true
    },
    {
      title: "NSX Club VIP",
      price: "45€",
      icon: <Award className="h-10 w-10 text-honda-gold" />, /* Updated to gold for VIP */
      description: "Pack exclusif pour les propriétaires NSX",
      features: [
        "Tous les avantages du pack Exposition",
        "Accès à l'espace NSX Club",
        "Session exclusive NSX sur circuit",
        "Goodies exclusifs NSX Club"
      ],
      highlight: false
    }
  ];

  return (
    <section id="registration" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-honda-red font-display">INSCRIPTION</span>
          <span className="text-black/90 ml-2">& TARIFS</span>
        </h2>
        <p className="text-center mb-12 text-black/70 max-w-2xl mx-auto text-base md:text-lg">
          Choisissez la formule qui correspond à vos envies et à votre véhicule.
          Paiement sécurisé par carte bancaire ou PayPal.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card 
              key={index} 
              className={`overflow-hidden transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                pkg.highlight ? 'shadow-xl border-honda-red relative bg-white' : 'shadow-md bg-white'
              } ${pkg.title === "NSX Club VIP" ? 'border-honda-gold' : ''}`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 right-4 bg-honda-red text-white px-4 py-1 text-xs font-medium rounded-full shadow-md">
                  POPULAIRE
                </div>
              )}
              {pkg.title === "NSX Club VIP" && (
                <div className="absolute -top-4 right-4 bg-honda-gold text-honda-dark px-4 py-1 text-xs font-medium rounded-full shadow-md">
                  VIP
                </div>
              )}
              <CardHeader className={`pb-4 ${pkg.highlight ? 'bg-honda-red/5' : ''} ${pkg.title === "NSX Club VIP" ? 'bg-honda-gold/5' : ''}`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${
                    pkg.title === "NSX Club VIP" ? 'bg-honda-gold/10' : 'bg-honda-red/10'
                  }`}>
                    {pkg.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-center text-black/90">{pkg.title}</CardTitle>
                <CardDescription className="text-center text-black/60">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-black/90">{pkg.price}</span>
                  <span className="text-black/60"> / week-end</span>
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
            <img src="https://cdn.worldvectorlogo.com/logos/visa-2.svg" alt="Visa" className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <img src="https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" alt="Mastercard" className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <img src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" alt="PayPal" className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
