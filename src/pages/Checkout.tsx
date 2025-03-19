import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { User, MapPin, Receipt, ChevronLeft, ChevronRight, Info, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sendConfirmationEmail } from '@/services/emailService';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, packType, pilotCount, passengerCount, nsxType, totalPrice, accompanying, quantity } = location.state || {};

  // Fonction pour charger les données sauvegardées
  const loadSavedFormData = () => {
    try {
      const savedData = localStorage.getItem('checkout_form_data');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error('Error loading saved form data:', error);
      return null;
    }
  };

  // États pour les champs du formulaire avec initialisation depuis le localStorage
  const [formData, setFormData] = useState(() => {
    const savedData = loadSavedFormData();
    return savedData || {
      firstName: '',
      lastName: '',
      email: '',
      emailConfirm: '',
      phone: '',
      birthDate: '',
      country: '',
      address: '',
      postalCode: '',
      city: '',
      acceptTerms: false
    };
  });

  // Sauvegarder les données du formulaire dans le localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem('checkout_form_data', JSON.stringify(formData));
  }, [formData]);

  // Fonction pour vérifier si tous les champs sont remplis
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.emailConfirm.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.birthDate.trim() !== '' &&
      formData.country.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.postalCode.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.acceptTerms
    );
  };

  // Gestionnaire de changement des champs avec sauvegarde dans le localStorage
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(newFormData);
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simuler le processus de paiement
      // Dans un environnement de production, vous devriez intégrer un vrai système de paiement ici
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation d'un délai de traitement

      // Préparer les données pour l'email
      const emailData = {
        to_name: formData.firstName,
        to_email: formData.email,
        pack_type: getPackType(),
        date: getFormattedDate(),
        total_price: totalPrice,
        pilot_count: pilotCount,
        passenger_count: passengerCount,
        accompanying_count: getAccompanyingCount(),
        nsx_type: nsxType,
        quantity: quantity
      };

      // Envoyer l'email de confirmation
      await sendConfirmationEmail(emailData);

      // Nettoyer le localStorage
      localStorage.removeItem('checkout_form_data');
      
      // Rediriger vers une page de confirmation
      navigate('/confirmation');
    } catch (error) {
      console.error('Error during form submission:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
    }
  };

  // Formater la date pour l'affichage
  const getFormattedDate = () => {
    if (packType === 'weekend') {
      return "Week-end du 21 et 22 Juin 2025";
    }
    if (selectedDate?.includes("Dimanche")) {
      return "Dimanche 22 Juin 2025";
    }
    return "Samedi 21 Juin 2025";
  };

  // Déterminer le type de pack
  const getPackType = () => {
    if (nsxType) {
      return `NSX ${nsxType === 'piste' ? 'Piste' : 'Statique'}`;
    }
    if (pilotCount !== undefined) {
      return 'Piste';
    }
    if (accompanying !== undefined) {
      return 'Statique';
    }
    if (quantity !== undefined) {
      return 'Visiteur';
    }
    return '';
  };

  // Obtenir le nombre d'accompagnants
  const getAccompanyingCount = () => {
    if (passengerCount !== undefined) {
      return passengerCount;
    }
    if (accompanying !== undefined) {
      return accompanying;
    }
    return 0;
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
            Étape 3/3
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Finalisation de votre commande
          </h1>
          <p className="text-base text-gray-600">
            Encore quelques informations avant de valider votre inscription
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          {/* Bloc 1: Vos coordonnées */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-[#E60012]" />
                  Vos coordonnées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailConfirm">Confirmation de l'adresse e-mail</Label>
                  <Input
                    id="emailConfirm"
                    name="emailConfirm"
                    type="email"
                    value={formData.emailConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Date de naissance</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 2: Adresse de facturation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#E60012]" />
                  Adresse de facturation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="belgium">Belgique</SelectItem>
                      <SelectItem value="switzerland">Suisse</SelectItem>
                      <SelectItem value="luxembourg">Luxembourg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 3: Récapitulatif de la commande */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-[#E60012]" />
                  Récapitulatif de la commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
                  <h2 className="text-base font-medium">
                    {packType === 'weekend' 
                      ? `Pass Week-end - Pack ${getPackType()}`
                      : `Pass 1 jour - Pack ${getPackType()}`
                    }
                  </h2>
                  {quantity > 0 && (
                    <span className="text-sm text-gray-600">
                      {quantity} {quantity > 1 ? 'visiteurs' : 'visiteur'}
                    </span>
                  )}
                  {getAccompanyingCount() > 0 && (
                    <span className="text-sm text-gray-600">
                      {getAccompanyingCount()} {getAccompanyingCount() > 1 ? 'accompagnants' : 'accompagnant'}
                    </span>
                  )}
                  {pilotCount > 0 && (
                    <span className="text-sm text-gray-600">
                      {pilotCount} {pilotCount > 1 ? 'pilotes' : 'pilote'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info className="h-4 w-4 text-[#E60012]" />
                    <span>Circuit de Morney</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-[#E60012]" />
                    <span>{getFormattedDate()}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center p-3">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-xl font-bold text-[#E60012]">{totalPrice}€</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloc 4: Validation et conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#E60012]" />
                  Validation et conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="acceptTerms" className="text-sm">
                      J'accepte les <a href="/conditions-generales" className="text-[#E60012] hover:underline">Conditions Générales de Vente</a> et le <a href="/reglement" className="text-[#E60012] hover:underline">Règlement de l'événement</a>
                    </Label>
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
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-1/3"
              >
                Retour
              </Button>
              <div className="w-2/3 relative">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        disabled={!isFormValid()}
                        className="w-full bg-[#E60012] hover:bg-[#E60012]/90 text-white gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                          console.log('Button clicked');
                          console.log('Form valid:', isFormValid());
                        }}
                      >
                        Confirmer et payer <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    {!isFormValid() && (
                      <TooltipContent side="top" className="bg-black text-white">
                        <p>Veuillez remplir tous les champs</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </motion.div>
        </form>
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

export default Checkout; 