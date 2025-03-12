import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Mail, Check, Info } from 'lucide-react';

const PistePackStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, packType, pilotCount, passengerCount } = location.state || {};

  // Initialiser les états avec les données de l'étape précédente
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(() => {
    // Calculer le sous-total initial
    const basePrice = packType === 'weekend' ? 270 : 150;
    const pilotCost = Math.max(0, pilotCount - 1) * 10;
    const passengerCost = Math.max(0, passengerCount) * 5;
    return basePrice + pilotCost + passengerCost;
  });
  const [total, setTotal] = useState(() => subtotal);

  // Mettre à jour le total quand le sous-total ou la remise change
  useEffect(() => {
    setTotal(subtotal - discount);
  }, [subtotal, discount]);

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
    // Logic to calculate discount based on promo code
    setDiscount(10); // Example discount
  };

  // Si nous n'avons pas les données nécessaires, rediriger vers la première étape
  useEffect(() => {
    if (!selectedDate || !packType || !pilotCount) {
      navigate('/pack/piste');
    }
  }, [selectedDate, packType, pilotCount, navigate]);

  // Formater la date pour l'affichage
  const getFormattedDate = () => {
    if (packType === 'weekend') {
      return "Week-end du 21 et 22 Juin 2025";
    }
    if (selectedDate === 'sunday') {
      return "Dimanche 22 Juin 2025";
    }
    return "Samedi 21 Juin 2025";
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img src="/logo.png" alt="Honda Logo" className="h-8" />
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-[#E60012] transition-colors">Accueil</a>
            <a href="/packs" className="hover:text-[#E60012] transition-colors">Packs</a>
            <a href="/contact" className="hover:text-[#E60012] transition-colors">Contact</a>
          </nav>
          <Button variant="outline" className="text-white border-white hover:bg-[#E60012]">
            Connexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-3 bg-[#E60012] text-white text-sm py-1 px-4">
            Étape 2/3
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Finalisation de votre commande
          </h1>
          <p className="text-base text-gray-600">
            Plus qu'une étape avant de vivre l'expérience exclusive Honda
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#E60012]" />
                  Détails de votre Pack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <h2 className="text-base font-medium">
                    {packType === 'weekend' 
                      ? `Pass Week-end - Pack Piste (${pilotCount} ${pilotCount > 1 ? 'pilotes' : 'pilote'}${passengerCount > 0 ? `, ${passengerCount} ${passengerCount > 1 ? 'accompagnants' : 'accompagnant'}` : ''})`
                      : `Pass 1 jour - Pack Piste (${pilotCount} ${pilotCount > 1 ? 'pilotes' : 'pilote'}${passengerCount > 0 ? `, ${passengerCount} ${passengerCount > 1 ? 'accompagnants' : 'accompagnant'}` : ''})`
                    }
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#E60012]" />
                    <span>Circuit de Morney</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#E60012]" />
                    <span>{getFormattedDate()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#E60012]" />
                  Mode d'Obtention des Billets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                  <Check className="h-5 w-5 text-[#E60012] mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Vous recevrez un email récapitulatif de votre commande avec les billets à télécharger quelques minutes après votre achat.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#E60012]" />
                  Documents à Déposer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                  <Check className="h-5 w-5 text-[#E60012] mt-0.5" />
                  <p className="text-sm text-gray-700">
                    Vous recevrez un email avec un lien pour déposer les documents obligatoires :
                    <ul className="list-disc pl-5">
                      <li>Véhicule : Marque / Modèle / Code moteur / Photo / Nom assureur / N° police / Carte grise / Responsabilité civile circuit</li>
                      <li>Pilote(s) : Nom / Copie du permis de conduire.</li>
                    </ul>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#E60012]" />
                  Code Promo/Parrainage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Entrez votre code promo"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  className="mb-4"
                />
                <p>Remise appliquée : {discount}€</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#E60012]" />
                  Récapitulatif de la Commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                    <span>Pack Piste {packType === 'weekend' ? 'Week-end' : '1 jour'}</span>
                    <span className="font-medium">{packType === 'weekend' ? '270€' : '150€'}</span>
                  </div>
                  {pilotCount > 1 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                      <span>{pilotCount - 1} Pilote(s) supplémentaire(s)</span>
                      <span>{(pilotCount - 1) * 10}€</span>
                    </div>
                  )}
                  {passengerCount > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                      <span>{passengerCount} Accompagnant(s)</span>
                      <span>{passengerCount * 5}€</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg text-sm text-green-700">
                      <span>Remise parrainage</span>
                      <span>-{discount}€</span>
                    </div>
                  )}
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center p-3">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-xl font-bold text-[#E60012]">{total}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/pack/piste', {
                state: {
                  selectedDate: selectedDate,
                  packType: packType,
                  pilotCount: pilotCount,
                  passengerCount: passengerCount,
                  totalPrice: total
                },
                replace: true
              })}
              className="w-1/3"
            >
              Retour
            </Button>
            <Button
              onClick={() => navigate('/next-step')}
              className="w-2/3 bg-[#E60012] hover:bg-[#E60012]/90 text-white"
            >
              Continuer
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">À propos</h3>
              <p className="text-gray-400">TH Exclusive Honda - L'expérience ultime pour les passionnés</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Email: contact@th-exclusive.com</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#E60012]">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-[#E60012]">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-[#E60012]">Twitter</a>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <p className="text-center text-gray-400">© 2024 TH Exclusive Honda. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default PistePackStep2; 