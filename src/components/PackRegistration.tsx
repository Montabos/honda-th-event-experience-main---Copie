import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

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
  additionalOptions?: {
    name: string;
    price: number;
    maxQuantity: number;
  }[];
  isPopular?: boolean;
  isExclusive?: boolean;
}

const dateOptions: PackOption[] = [
  {
    id: 'saturday',
    name: 'Samedi 21 Juin',
    price: 20,
    description: 'Accès libre au village et aux animations'
  },
  {
    id: 'sunday',
    name: 'Dimanche 22 Juin',
    price: 20,
    description: 'Accès libre au village et aux animations'
  },
  {
    id: 'weekend',
    name: 'Pass Week-End',
    price: 45,
    description: 'Accès complet sur les deux jours'
  }
];

export const PackRegistration: React.FC<PackRegistrationProps> = ({
  packTitle,
  packDescription,
  packIcon,
  prices,
  includes,
  additionalOptions,
  isPopular,
  isExclusive
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = (date: string, options: Record<string, number>) => {
    let total = 0;
    
    // Prix de base selon la date
    if (date === 'weekend') {
      total += prices.twoDays;
    } else if (date) {
      total += prices.oneDay;
    }

    // Ajouter le prix des options
    Object.entries(options).forEach(([optionId, quantity]) => {
      const option = additionalOptions?.find(opt => opt.name === optionId);
      if (option) {
        total += option.price * quantity;
      }
    });

    return total;
  };

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    setTotalPrice(calculateTotalPrice(value, selectedOptions));
  };

  const handleOptionChange = (optionName: string, quantity: number) => {
    const newOptions = { ...selectedOptions, [optionName]: quantity };
    setSelectedOptions(newOptions);
    setTotalPrice(calculateTotalPrice(selectedDate, newOptions));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img src="/logo.png" alt="Honda Logo" className="h-8" />
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-honda-red transition-colors">Accueil</a>
            <a href="/packs" className="hover:text-honda-red transition-colors">Packs</a>
            <a href="/contact" className="hover:text-honda-red transition-colors">Contact</a>
          </nav>
          <Button variant="outline" className="text-white border-white hover:bg-honda-red">
            Connexion
          </Button>
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

          {/* Sélection des dates et options */}
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
                  onValueChange={handleDateChange}
                  className="grid gap-4"
                >
                  {dateOptions.map((option) => (
                    <div key={option.id} className="relative">
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={option.id}
                        className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-honda-red peer-checked:bg-red-50 transition-all duration-300"
                      >
                        <span className="font-semibold">{option.name}</span>
                        <span className="text-sm text-gray-500">{option.description}</span>
                        <span className="mt-2 font-bold text-honda-red">{option.price}€</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>

          {additionalOptions && additionalOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Options additionnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {additionalOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{option.name}</span>
                        <div className="flex items-center gap-4">
                          <span>+{option.price}€</span>
                          <select
                            className="border rounded p-1"
                            value={selectedOptions[option.name] || 0}
                            onChange={(e) => handleOptionChange(option.name, parseInt(e.target.value))}
                          >
                            {Array.from({ length: option.maxQuantity + 1 }).map((_, i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Récapitulatif et navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-honda-red">{totalPrice}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-1/3"
              >
                Retour
              </Button>
              <Button
                disabled={!selectedDate}
                onClick={() => {/* Handle next step */}}
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