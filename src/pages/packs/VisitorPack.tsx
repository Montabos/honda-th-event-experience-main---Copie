import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const VisitorPack = () => {
  const packData = {
    packTitle: 'Pack Visiteur',
    packDescription: 'Découvrez l\'univers Honda et profitez des animations',
    packIcon: '🏁',
    prices: {
      oneDay: 15,
      twoDays: 25,
    },
    includes: [
      'Accès au site',
      'Animations et expositions',
      'Accès aux food trucks',
      'Parking visiteur',
    ],
    additionalOptions: [
      {
        name: 'Enfant (-12 ans)',
        price: 5,
        maxQuantity: 4,
      },
      {
        name: 'Pack photos digital',
        price: 15,
        maxQuantity: 1,
      },
    ],
  };

  return <PackRegistration {...packData} />;
};

export default VisitorPack; 