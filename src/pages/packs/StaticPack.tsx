import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const StaticPack = () => {
  const packData = {
    packTitle: 'Pack Statique',
    packDescription: 'Exposez votre Honda et partagez votre passion',
    packIcon: '🏁',
    prices: {
      oneDay: 30,
      twoDays: 45,
    },
    includes: [
      'Emplacement d\'exposition privilégié',
      'Badge exposant',
      'Accès à l\'espace détente',
      'Vote pour les concours',
    ],
    additionalOptions: [
      {
        name: 'Accompagnant',
        price: 5,
        maxQuantity: 3,
      },
      {
        name: 'Participation aux concours',
        price: 10,
        maxQuantity: 3,
      },
    ],
    isPopular: true,
    packType: 'statique' as const
  };

  return <PackRegistration {...packData} />;
};

export default StaticPack; 