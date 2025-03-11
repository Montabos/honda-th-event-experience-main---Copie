import { useEffect } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import EventInfo from '@/components/EventInfo';
import Program from '@/components/Program';
import RegistrationCards from '@/components/Registration';
import CarShowcase from '@/components/CarShowcase';
import PracticalInfo from '@/components/PracticalInfo';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Apply dark theme to match design
    document.documentElement.classList.add('dark');
    
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-honda-dark text-white">
      <Header />
      <Banner />
      <EventInfo />
      <Program />
      <RegistrationCards />
      <CarShowcase />
      <PracticalInfo />
      <Reviews />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
