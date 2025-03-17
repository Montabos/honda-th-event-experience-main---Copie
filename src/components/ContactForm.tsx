
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Instagram, Youtube, Mail, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-honda-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-honda-red">CONTACT</span>
        </h2>
        <p className="text-center mb-12 text-honda-textMuted max-w-2xl mx-auto">
          Une question sur l'événement ? Contactez-nous directement via ce formulaire
          ou par email à infos@thexclusivehonda.fr
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Nom complet
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Sujet
                </label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inscription">Inscription</SelectItem>
                    <SelectItem value="vehicule">Éligibilité véhicule</SelectItem>
                    <SelectItem value="programme">Programme</SelectItem>
                    <SelectItem value="hebergement">Hébergement</SelectItem>
                    <SelectItem value="autre">Autre question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Votre message..."
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-honda-red hover:bg-honda-hover-red text-white py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
              
              {isSuccess && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-md text-green-400 text-sm">
                  Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                </div>
              )}
            </form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-honda-red" />
                Email direct
              </h3>
              <p className="text-honda-textMuted mb-2">Pour toute question concernant l'événement :</p>
              <a href="mailto:infos@thexclusivehonda.fr" className="text-honda-red hover:underline">
                infos@thexclusivehonda.fr
              </a>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-honda-red" />
                Réseaux sociaux
              </h3>
              <p className="text-honda-textMuted mb-4">
                Suivez-nous sur les réseaux sociaux pour les dernières actualités et photos de l'événement.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Nous contacter par téléphone</h3>
              <p className="text-honda-textMuted mb-2">Service client (horaires d'ouverture) :</p>
              <p className="text-xl font-medium">+33 (0)1 23 45 67 89</p>
              <p className="text-sm text-honda-textMuted mt-2">Du lundi au vendredi, 9h - 18h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
