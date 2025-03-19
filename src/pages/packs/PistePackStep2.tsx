import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar, Mail, Check, Gift, Receipt, ChevronLeft, ChevronRight, Info } from 'lucide-react';

const PistePackStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fonction pour charger les données sauvegardées
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem('pack_piste_data');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Error loading saved data:', error);
      return null;
    }
  };

  // Récupérer les données soit du state de navigation soit du localStorage
  const savedData = loadSavedData();
  const { selectedDate, packType, pilotCount, passengerCount } = location.state || savedData || {};

  // Initialiser les états avec les données de l'étape précédente
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(() => {
    // Calculer le sous-total initial
    const basePrice = packType === 'weekend' ? 270 : 150;
    // Chaque pilote supplémentaire coûte 10€
    const pilotCost = Math.max(0, pilotCount - 1) * 10;
    // Le premier accompagnant est gratuit, les suivants coûtent 5€ chacun
    const passengerCost = Math.max(0, passengerCount - 1) * 5;
    return basePrice + pilotCost + passengerCost;
  });
  const [total, setTotal] = useState(() => subtotal);

  // Mettre à jour le total quand le sous-total ou la remise change
  useEffect(() => {
    setTotal(subtotal - discount);
  }, [subtotal, discount]);

  const handlePromoCode = () => {
    // Logique de validation à implémenter
  };

  // Si nous n'avons pas les données nécessaires, rediriger vers la première étape
  useEffect(() => {
    if (!selectedDate || !packType || !pilotCount) {
      navigate('/pack/piste');
    }
  }, [selectedDate, packType, pilotCount, navigate]);

  // Nettoyer le localStorage quand on quitte le composant
  useEffect(() => {
    return () => {
      if (!location.pathname.includes('/checkout')) {
        localStorage.removeItem('pack_piste_data');
      }
    };
  }, [location.pathname]);

  // Formater la date pour l'affichage
  const getFormattedDate = () => {
    if (packType === 'weekend') {
      return "Week-end du 21 et 22 Juin 2025";
    }
    if (selectedDate.includes("Dimanche")) {
      return "Dimanche 22 Juin 2025";
    }
    return "Samedi 21 Juin 2025";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="hidden md:block mr-48 text-white font-medium text-sm">Circuit de Mornay</div>
          <div className="flex items-center">
            <h1 className={`text-xl md:text-2xl font-bold transition-all duration-300 text-white cursor-pointer hover:text-honda-red/80`} onClick={() => window.location.href = '/#registration'}>
              <span className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span> <span className="font-display">HONDA</span>
            </h1>
            <div className="hidden md:block ml-48 text-white font-medium text-sm">21-22 JUIN 2025</div>
          </div>
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
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <h2 className="text-base font-medium">
                        {packType === 'weekend' 
                          ? `Pass Week-end - Pack Piste`
                          : `Pass 1 jour - Pack Piste`
                        }
                      </h2>
                      <span className="text-base font-medium ml-4">{packType === 'weekend' ? '270' : '150'}€</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {pilotCount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            {pilotCount === 1 
                              ? '1 pilote'
                              : `${pilotCount} pilotes (1 offert)`
                            }
                          </span>
                          {pilotCount > 1 && (
                            <span className="text-sm text-gray-600 ml-4">{Math.max(0, pilotCount - 1) * 10}€</span>
                          )}
                        </div>
                      )}
                      {passengerCount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            + {passengerCount} {passengerCount > 1 ? 'accompagnants' : 'accompagnant'} ({passengerCount === 1 ? 'offert' : `${Math.min(1, passengerCount)} offert${Math.min(1, passengerCount) > 1 ? 's' : ''}`})
                          </span>
                          <span className="text-sm text-gray-600 ml-4">{Math.max(0, passengerCount - 1) * 5}€</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#E60012]" />
                    <span>Circuit de Mornay</span>
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
                  Mode d'Obtention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">E-ticket</p>
                      <p className="text-sm text-gray-500">Envoyé par email après confirmation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 3: Code Promo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[#E60012]" />
                  Code Promo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Entrez votre code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={handlePromoCode}
                    className="whitespace-nowrap"
                  >
                    Appliquer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 4: Récapitulatif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-gray-200">
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 pt-4">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-xl font-bold text-[#E60012]">{total}€</span>
                  </div>

                  {/* Logos de paiement */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-500 mb-2">Paiement 100% sécurisé</p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <img src="/Pictures/cb1.png" alt="Visa" className="h-6 w-auto" />
                      <img src="/Pictures/cb2.png" alt="MasterCard" className="h-6 w-auto" />
                      <img src="/Pictures/cb3.png" alt="PayPal" className="h-6 w-auto" />
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
                onClick={() => navigate('/pack/piste', {
                  state: {
                    selectedDate: packType === 'weekend' ? 'weekend' : selectedDate.includes("Dimanche") ? 'sunday' : 'saturday',
                    packType,
                    pilotCount,
                    passengerCount,
                    totalPrice: total
                  },
                  replace: true
                })}
                className="w-1/3"
              >
                Retour
              </Button>
              <Button
                onClick={() => navigate('/checkout', {
                  state: {
                    selectedDate,
                    packType,
                    pilotCount,
                    passengerCount,
                    totalPrice: total
                  }
                })}
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

export default PistePackStep2; 