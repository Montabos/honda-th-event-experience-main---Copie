import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Mail, Check, Info } from 'lucide-react';

const RoadPackStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, packType, pilotCount, passengerCount } = location.state || {};

  // Initialiser les états avec les données de l'étape précédente
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(() => {
    // Calculer le sous-total initial
    const basePrice = packType === 'weekend' ? 220 : 120;
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
      navigate('/pack/route');
    }
  }, [selectedDate, packType, pilotCount, navigate]);

  // Formater la date pour l'affichage
  const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-white">
      {/* ... Header reste inchangé ... */}

      <main className="container mx-auto px-4 py-8">
        {/* ... En-tête de l'étape reste inchangé ... */}

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
                    Pass {packType === 'weekend' ? 'Week-end' : '1 jour'} - Pack Route
                    ({pilotCount} {pilotCount > 1 ? 'pilotes' : 'pilote'}
                    {passengerCount > 0 ? `, ${passengerCount} ${passengerCount > 1 ? 'accompagnants' : 'accompagnant'}` : ''})
                  </h2>
                  <Badge variant="outline" className="text-[#E60012] bg-red-50 border-[#E60012] font-semibold px-4 py-1">
                    {packType === 'weekend' ? 'Week-end' : 'Journée'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#E60012]" />
                    <span>Circuit de Morney</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#E60012]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ... Reste du composant inchangé ... */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
                    <span>Pack Route {packType === 'weekend' ? 'Week-end' : '1 jour'}</span>
                    <span className="font-medium">{packType === 'weekend' ? '220€' : '120€'}</span>
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
              onClick={() => navigate('/pack/route', {
                state: {
                  selectedDate: selectedDate,
                  pilotCount: pilotCount,
                  passengerCount: passengerCount,
                  totalPrice: total
                }
              })}
              className="w-1/3"
            >
              Retour
            </Button>
          </div>
        </div>
      </main>

      {/* ... Footer reste inchangé ... */}
    </div>
  );
};

export default RoadPackStep2; 