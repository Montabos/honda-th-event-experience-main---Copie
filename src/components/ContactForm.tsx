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
    <section id="contact" className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-honda-red">CONTACT</span>
        </h2>
        <p className="text-center mb-8 text-black max-w-2xl mx-auto">
          Une question sur l'événement ? Contactez-nous par email ou suivez-nous sur les réseaux sociaux pour les dernières actualités.
        </p>
        <div className="text-center">
          <a href="mailto:infos@thexclusivehonda.fr" className="text-honda-red hover:underline">
            infos@thexclusivehonda.fr
          </a>
        </div>
        <div className="text-center mt-6">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-black hover:text-honda-red transition-colors">
              <img src="/Pictures/facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#" className="text-black hover:text-honda-red transition-colors">
              <img src="/Pictures/insta.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="text-black hover:text-honda-red transition-colors">
              <img src="/Pictures/tiktok.png" alt="TikTok" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
