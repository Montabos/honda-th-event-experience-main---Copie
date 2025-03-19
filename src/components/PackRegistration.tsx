import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

interface PackOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface PackRegistrationProps {
  packTitle: string;
  packDescription: string;
  packIcon: string;
  prices: {
    oneDay: number;
    twoDays: number;
  };
  includes: string[];
  isPopular?: boolean;
  isExclusive?: boolean;
  packType: 'visiteur' | 'piste' | 'statique' | 'nsx';
}

const packPrices = {
  piste: {
    saturday: 150,
    sunday: 150,
    weekend: 270
  },
  nsx: {
    saturday: 30,
    sunday: 30,
    weekend: 45
  },
  statique: {
    saturday: 20,
    sunday: 20,
    weekend: 30
  },
  visiteur: {
    saturday: 12,
    sunday: 12,
    weekend: 20
  }
};

const dateOptions: PackOption[] = [
  {
    id: 'saturday',
    name: 'Samedi 21 Juin',
    price: 0,
    description: 'Accès libre au village et aux animations'
  },
  {
    id: 'sunday',
    name: 'Dimanche 22 Juin',
    price: 0,
    description: 'Accès libre au village et aux animations'
  },
  {
    id: 'weekend',
    name: 'Pass Week-End',
    price: 0,
    description: 'Accès complet sur les deux jours'
  }
];

export const PackRegistration: React.FC<PackRegistrationProps> = ({
  packTitle,
  packDescription,
  packIcon,
  prices,
  includes,
  isPopular,
  isExclusive,
  packType
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const savedState = location.state || {};

  // Fonction pour charger les données sauvegardées
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem(`pack_${packType}_data`);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Error loading saved data:', error);
      return null;
    }
  };

  // Fonction pour sauvegarder les données
  const saveData = (data: any) => {
    try {
      localStorage.setItem(`pack_${packType}_data`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Initialiser les états avec les données sauvegardées
  const savedData = loadSavedData();
  const initialState = savedData || savedState;

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (initialState.selectedDate) {
      // Si on a déjà l'ID de la date (saturday, sunday, weekend), on l'utilise directement
      if (['saturday', 'sunday', 'weekend'].includes(initialState.selectedDate)) {
        return initialState.selectedDate;
      }
      // Sinon on convertit le format texte en ID
      if (initialState.selectedDate.includes("Week-end")) {
        return 'weekend';
      } else if (initialState.selectedDate.includes("Dimanche")) {
        return 'sunday';
      } else {
        return 'saturday';
      }
    }
    return '';
  });

  const [totalPrice, setTotalPrice] = useState<number>(initialState.totalPrice || 0);
  const [visitorCount, setVisitorCount] = useState(initialState.visitorCount || 1);
  const [pilotCount, setPilotCount] = useState(initialState.pilotCount || 1);
  const [passengerCount, setPassengerCount] = useState(() => {
    if (packType === 'statique') {
      return initialState.accompanying || 0;
    }
    return initialState.passengerCount || 0;
  });
  const [nsxType, setNsxType] = useState<'statique' | 'piste'>(initialState.nsxType || 'statique');
  const [shouldScrollToRegistration, setShouldScrollToRegistration] = useState(false);

  const calculateTotalPrice = (dateId?: string) => {
    let total = 0;
    const basePrice = (dateId || selectedDate) === 'weekend' ? prices.twoDays : prices.oneDay;

    switch (packType) {
      case 'visiteur':
        total = basePrice * visitorCount;
        break;
      case 'piste':
        total = basePrice + 
                (Math.max(0, pilotCount - 1) * 10) + 
                (Math.max(0, passengerCount) * 5);
        break;
      case 'statique':
        total = basePrice + (Math.max(0, passengerCount) * 5);
        break;
      case 'nsx':
        if (nsxType === 'statique') {
          total = ((dateId || selectedDate) === 'weekend' ? 45 : 30) + 
                  (Math.max(0, passengerCount) * 5);
        } else {
          total = ((dateId || selectedDate) === 'weekend' ? 270 : 150) + 
                  (Math.max(0, pilotCount - 1) * 10) + 
                  (Math.max(0, passengerCount) * 5);
        }
        break;
    }

    return total;
  };

  useEffect(() => {
    if (selectedDate) {
      setTotalPrice(calculateTotalPrice());
    }
  }, [selectedDate, visitorCount, pilotCount, passengerCount, nsxType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (shouldScrollToRegistration) {
      const registrationSection = document.getElementById('registration');
      if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
      }
      setShouldScrollToRegistration(false);
    }
  }, [shouldScrollToRegistration]);

  // Sauvegarder les données quand elles changent
  useEffect(() => {
    if (selectedDate) {
      saveData({
        selectedDate, // On sauvegarde directement l'ID (saturday, sunday, weekend)
        totalPrice,
        visitorCount,
        pilotCount,
        passengerCount,
        nsxType,
        packType
      });
    }
  }, [selectedDate, totalPrice, visitorCount, pilotCount, passengerCount, nsxType, packType]);

  // Nettoyer le localStorage quand on quitte le composant
  useEffect(() => {
    return () => {
      if (!location.pathname.includes('/step2')) {
        localStorage.removeItem(`pack_${packType}_data`);
      }
    };
  }, [location.pathname, packType]);

  const renderOptions = () => {
    switch (packType) {
      case 'visiteur':
        return (
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Nombre de visiteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Nombre de visiteurs</span>
                <select
                  className="border rounded p-2"
                  value={visitorCount}
                  onChange={(e) => setVisitorCount(parseInt(e.target.value))}
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        );

      case 'piste':
        return (
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Composition de votre équipage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Nombre de pilotes total (chaque pilote supplémentaire = +10€)</span>
                <select
                  className="border rounded p-2"
                  value={pilotCount}
                  onChange={(e) => setPilotCount(parseInt(e.target.value))}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Nombre d'accompagnants (non pilote) (premier offert, +5€/pers.)</span>
                <select
                  className="border rounded p-2"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        );

      case 'statique':
        return (
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Composition de votre équipage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Nombre d'accompagnants (premier offert, +5€/pers.)</span>
                <select
                  className="border rounded p-2"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        );

      case 'nsx':
        return (
          <>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Type de participation</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={nsxType}
                  onValueChange={(value: 'statique' | 'piste') => setNsxType(value)}
                  className="grid gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="statique" id="statique" className="peer sr-only" />
                    <Label
                      htmlFor="statique"
                      className={cn(
                        "flex flex-col p-4 border rounded-lg cursor-pointer relative",
                        "hover:bg-gray-50 transition-all duration-300",
                        nsxType === 'statique' ? "border-[#E60012] border-2 bg-red-50 shadow-md" : "border-gray-200",
                        "group"
                      )}
                    >
                      <span className={cn(
                        "font-semibold",
                        nsxType === 'statique' ? "text-[#E60012]" : "text-gray-900"
                      )}>Statique</span>
                      <span className="text-sm text-[#E60012] font-bold">
                        {selectedDate === 'weekend' ? packPrices.nsx.weekend : packPrices.nsx.saturday}€
                      </span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="piste" id="piste" className="peer sr-only" />
                    <Label
                      htmlFor="piste"
                      className={cn(
                        "flex flex-col p-4 border rounded-lg cursor-pointer relative",
                        "hover:bg-gray-50 transition-all duration-300",
                        nsxType === 'piste' ? "border-[#E60012] border-2 bg-red-50 shadow-md" : "border-gray-200",
                        "group"
                      )}
                    >
                      <span className={cn(
                        "font-semibold",
                        nsxType === 'piste' ? "text-[#E60012]" : "text-gray-900"
                      )}>Piste</span>
                      <span className="text-sm text-[#E60012] font-bold">
                        {selectedDate === 'weekend' ? packPrices.piste.weekend : packPrices.piste.saturday}€
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {nsxType === 'statique' ? (
              <Card className="hover:shadow-lg transition-shadow duration-300 mt-6">
                <CardHeader>
                  <CardTitle>Composition de votre équipage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span>Nombre d'accompagnants (premier offert, +5€/pers.)</span>
                    <select
                      className="border rounded p-2"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="hover:shadow-lg transition-shadow duration-300 mt-6">
                <CardHeader>
                  <CardTitle>Composition de votre équipage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Nombre de pilotes total (chaque pilote supplémentaire = +10€)</span>
                    <select
                      className="border rounded p-2"
                      value={pilotCount}
                      onChange={(e) => setPilotCount(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Nombre d'accompagnants (non pilote) (premier offert, +5€/pers.)</span>
                    <select
                      className="border rounded p-2"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        );
    }
  };

  const handleNextStep = () => {
    if (packType === 'visiteur') {
      navigate('/pack/visiteur/step2', {
        state: {
          selectedDate: selectedDate === 'weekend' ? dateOptions[2].name : selectedDate === 'sunday' ? dateOptions[1].name : dateOptions[0].name,
          selectedDateId: selectedDate,
          packType: selectedDate === 'weekend' ? 'weekend' : '1-day',
          quantity: visitorCount,
          totalPrice: totalPrice
        },
        replace: true
      });
    } else if (packType === 'statique') {
      navigate('/pack/statique/step2', {
        state: {
          selectedDate: selectedDate === 'weekend' ? dateOptions[2].name : selectedDate === 'sunday' ? dateOptions[1].name : dateOptions[0].name,
          selectedDateId: selectedDate,
          packType: selectedDate === 'weekend' ? 'weekend' : '1-day',
          accompanying: passengerCount,
          totalPrice: totalPrice
        },
        replace: true
      });
    } else if (packType === 'piste') {
      navigate('/pack/piste/step2', {
        state: {
          selectedDate: selectedDate === 'weekend' ? dateOptions[2].name : selectedDate === 'sunday' ? dateOptions[1].name : dateOptions[0].name,
          selectedDateId: selectedDate,
          packType: selectedDate === 'weekend' ? 'weekend' : '1-day',
          pilotCount: pilotCount,
          passengerCount: passengerCount,
          totalPrice: totalPrice
        },
        replace: true
      });
    } else if (packType === 'nsx') {
      navigate('/pack/nsx/step2', {
        state: {
          selectedDate: selectedDate === 'weekend' ? dateOptions[2].name : selectedDate === 'sunday' ? dateOptions[1].name : dateOptions[0].name,
          selectedDateId: selectedDate,
          packType: selectedDate === 'weekend' ? 'weekend' : '1-day',
          pilotCount: pilotCount,
          passengerCount: passengerCount,
          nsxType: nsxType,
          totalPrice: totalPrice
        },
        replace: true
      });
    }
  };

  const handleReturn = () => {
    navigate('/#registration', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="hidden md:block mr-48 text-white font-medium text-sm">Circuit de Mornay</div>
          <div className="flex items-center">
            <h1 className={`text-xl md:text-2xl font-bold transition-all duration-300 text-white`}>
              <span className="font-light">TH</span> <span className="text-honda-red">EXCLUSIVE</span> <span className="font-display">HONDA</span>
            </h1>
            <div className="hidden md:block ml-48 text-white font-medium text-sm">21-22 JUIN 2025</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* En-tête du pack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">{packIcon}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{packTitle}</h1>
            {isPopular && (
              <span className="bg-honda-red text-white px-4 py-1 rounded-full text-sm font-semibold">
                Populaire
              </span>
            )}
            {isExclusive && (
              <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                Exclusif
              </span>
            )}
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{packDescription}</p>
        </motion.div>

        {/* Contenu principal */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Inclus dans l'offre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Inclus dans l'offre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {includes.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="text-honda-red">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sélection des dates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Sélection de la date</CardTitle>
                <CardDescription>Choisissez le jour qui vous convient</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedDate}
                  onValueChange={setSelectedDate}
                  className="grid gap-4"
                >
                  {dateOptions.map((option) => (
                    <div key={option.id}>
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={option.id}
                        className={`
                          block border rounded-lg cursor-pointer transition-all duration-200
                          hover:bg-gray-50
                          ${selectedDate === option.id ? 'border-[#E60012] border-2 bg-red-50/50 shadow-md' : 'border-gray-200'}
                        `}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className={`
                                font-semibold
                                ${selectedDate === option.id ? 'text-[#E60012]' : 'text-gray-900'}
                              `}>{option.name}</span>
                              <span className="text-sm text-gray-500">{option.description}</span>
                            </div>
                            {packType !== 'nsx' && (
                              <span className="text-[#E60012] font-bold text-sm ml-4">
                                {packPrices[packType][option.id]}€
                              </span>
                            )}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>

          {/* Options spécifiques au pack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            {renderOptions()}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleReturn}
                className="w-1/3"
              >
                Retour
              </Button>
              <Button
                disabled={!selectedDate}
                onClick={handleNextStep}
                className="w-2/3 bg-honda-red hover:bg-honda-red/90 text-white"
              >
                Suivant
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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
                <a href="#" className="text-gray-400 hover:text-honda-red">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-honda-red">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-honda-red">Twitter</a>
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