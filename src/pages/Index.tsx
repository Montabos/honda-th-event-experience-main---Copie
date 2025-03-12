import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    // Apply dark theme to match design
    document.documentElement.classList.add('dark');
    
    // Handle scroll to registration section if hash is present
    if (location.hash === '#registration') {
      // Prevent default scroll to top
      const preventScroll = (e: Event) => {
        e.preventDefault();
        window.removeEventListener('scroll', preventScroll);
      };
      window.addEventListener('scroll', preventScroll, { once: true });

      // Scroll directly to registration section
      const registrationSection = document.getElementById('registration');
      if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'instant' });
      }
    } else {
      // Only scroll to top if not targeting registration
      window.scrollTo(0, 0);
    }
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [location.hash]);

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
