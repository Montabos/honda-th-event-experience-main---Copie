import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-honda-dark text-white pb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center pt-8 pb-12">
          <button 
            onClick={scrollToTop}
            className="bg-honda-red hover:bg-honda-hover-red rounded-full p-3 transition-all duration-300 hover:shadow-lg"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 justify-items-center">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Honda TH Exclusive</h3>
            <p className="text-honda-textMuted text-sm leading-relaxed">
              L'événement 2025 pour tous les passionnés de Honda de collection et d'exception.
              Circuit de Mornay, 21-22 juin 2025.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Documents</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-honda-textMuted hover:text-honda-red transition-colors duration-200">Règlement sur le circuit</a></li>
              <li><a href="#" className="text-honda-textMuted hover:text-honda-red transition-colors duration-200">Charte du pilote</a></li>
              <li><a href="#" className="text-honda-textMuted hover:text-honda-red transition-colors duration-200">Conditions générales de vente</a></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-sm text-honda-textMuted mb-2">Email :</p>
            <p className="text-sm mb-4">infos@thexclusivehonda.fr</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-honda-textMuted">
            © {new Date().getFullYear()} Honda TH Exclusive. Tous droits réservés.
          </p>
          <p className="text-xs text-white/60 mt-2">
            Honda, Type R, NSX et S2000 sont des marques déposées de Honda Motor Co., Ltd.
            TH Exclusive n'est pas affilié à Honda Motor Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
