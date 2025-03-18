import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

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

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-black mb-4">
            Merci pour votre inscription !
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Votre commande a été confirmée. Vous recevrez un email de confirmation dans quelques instants avec tous les détails de votre inscription.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="bg-[#E60012] text-white hover:bg-[#ff1a1a] w-full md:w-auto px-8"
            >
              Retour à l'accueil
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 