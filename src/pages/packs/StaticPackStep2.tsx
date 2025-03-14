import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar, Mail, Check, Gift, Receipt, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const StaticPackStep2 = () => {
  const navigate = useNavigate();
  const [packType, setPackType] = useState('1-day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [accompanying, setAccompanying] = useState(0);

  const handlePromoCode = () => {
    // Implement promo code validation logic here
    setIsPromoValid(true);
  };

  // Formater la date pour l'affichage
  const getFormattedDate = () => {
    if (packType === 'weekend') {
      return "Week-end du 21 et 22 Juin 2025";
    }
    const day = selectedDate.getDay();
    if (day === 0) { // 0 represents Sunday
      return "Dimanche 22 Juin 2025";
    }
    return "Samedi 21 Juin 2025";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img src="/logo.png" alt="Honda Logo" className="h-8" />
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-[#E60012] transition-colors text-sm">Accueil</a>
            <a href="/packs" className="hover:text-[#E60012] transition-colors text-sm">Packs</a>
            <a href="/contact" className="hover:text-[#E60012] transition-colors text-sm">Contact</a>
          </nav>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black text-sm">
            Connexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* En-tête de l'étape */}
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

        {/* Contenu principal */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Bloc 1: Détails de l'Offre */}
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
                      ? `Pass Week-end - Pack Statique${accompanying > 0 ? ` (${accompanying} ${accompanying > 1 ? 'accompagnants' : 'accompagnant'})` : ''}`
                      : `Pass 1 jour - Pack Statique${accompanying > 0 ? ` (${accompanying} ${accompanying > 1 ? 'accompagnants' : 'accompagnant'})` : ''}`
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

          {/* Bloc 2: Mode d'Obtention des Billets */}
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

          {/* Bloc 3: Documents à Déposer */}
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
                    Un email vous sera envoyé pour déposer les informations relatives à votre véhicule :
                    <ul className="list-disc pl-5">
                      <li>Marque / Modèle / Code moteur</li>
                      <li>1 Photo de la voiture</li>
                    </ul>
                    Assurez-vous d'avoir ces documents prêts avant l'inscription.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 4: Code Promo/Parrainage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#E60012]" />
                  Code Promo/Parrainage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Entrez votre code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={`text-sm ${isPromoValid ? 'border-green-500' : ''}`}
                    />
                    {isPromoValid && (
                      <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <Button 
                    onClick={handlePromoCode}
                    className="bg-[#E60012] hover:bg-[#E60012]/90 text-white min-w-[120px] text-sm"
                  >
                    Appliquer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 5: Récapitulatif de la Commande */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-[#E60012]" />
                  Récapitulatif de la Commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                    <span>1 x Pass {packType === '1-day' ? '1 jour' : 'week-end'} - Pack Statique</span>
                    <span className="font-medium">{subtotal}€</span>
                  </div>
                  {accompanying > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                      <span>{accompanying} Accompagnant(s)</span>
                      <span>{accompanying * 5}€</span>
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

                  {/* Logos de paiement */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-500 mb-3">Paiement 100% sécurisé</p>
                    <div className="flex gap-4 justify-center items-center">
                      <img src="/payment/visa.png" alt="Visa" className="h-6 opacity-75 hover:opacity-100 transition-opacity" />
                      <img src="/payment/mastercard.png" alt="MasterCard" className="h-6 opacity-75 hover:opacity-100 transition-opacity" />
                      <img src="/payment/paypal.png" alt="PayPal" className="h-6 opacity-75 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full pt-6"
          >
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/pack/statique', {
                  state: {
                    selectedDate: selectedDate,
                    packType: packType,
                    passengerCount: accompanying,
                    totalPrice: total
                  },
                  replace: true
                })}
                className="w-1/3"
              >
                Retour
              </Button>
              <Button
                onClick={() => navigate('/checkout')}
                className="w-2/3 bg-[#E60012] hover:bg-[#E60012]/90 text-white gap-2 text-sm"
              >
                Continuer <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white mt-12 py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-base font-bold mb-2">À propos</h3>
              <p className="text-sm text-gray-400">TH Exclusive Honda - L'expérience ultime pour les passionnés</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2">Contact</h3>
              <p className="text-sm text-gray-400">Email: contact@th-exclusive.com</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-2">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-gray-800" />
          <p className="text-center text-xs text-gray-400">© 2024 TH Exclusive Honda. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default StaticPackStep2; 