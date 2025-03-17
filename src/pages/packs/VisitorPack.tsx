import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const VisitorPack = () => {
  const packData = {
    packTitle: 'Pack Visiteur',
    packDescription: 'Découvrez l\'univers Honda et profitez des animations',
    packIcon: '🏁',
    prices: {
      oneDay: 12,
      twoDays: 20,
    },
    includes: [
      'Accès au site',
      'Animations et expositions',
      'Accès aux food trucks',
      'Parking visiteur',
    ],
    packType: 'visiteur' as const
  };

  return <PackRegistration {...packData} />;
};

export default VisitorPack; 