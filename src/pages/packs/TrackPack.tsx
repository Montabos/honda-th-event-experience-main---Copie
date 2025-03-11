import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const TrackPack = () => {
  const packData = {
    packTitle: 'Pack Piste',
    packDescription: 'Vivez l\'adrénaline sur circuit avec votre Honda !',
    packIcon: '🏁',
    prices: {
      oneDay: 150,
      twoDays: 270,
    },
    includes: [
      '1 voiture sur piste',
      '1 pilote prêt à défier le chrono',
      '1 passager gratuit pour partager l\'expérience',
    ],
    additionalOptions: [
      {
        name: 'Passager supplémentaire',
        price: 5,
        maxQuantity: 2,
      },
      {
        name: 'Pilote supplémentaire',
        price: 10,
        maxQuantity: 1,
      },
    ],
    isPopular: true,
  };

  return <PackRegistration {...packData} />;
};

export default TrackPack; 