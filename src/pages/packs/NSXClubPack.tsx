import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const NSXClubPack = () => {
  const packData = {
    packTitle: 'Pack NSX Club',
    packDescription: 'Une expérience exclusive réservée aux propriétaires de NSX',
    packIcon: '🏁',
    prices: {
      oneDay: 200,
      twoDays: 350,
    },
    includes: [
      'Accès VIP au circuit',
      'Session de roulage dédiée NSX',
      'Déjeuner gastronomique',
      'Photo souvenir professionnelle',
      'Cadeau exclusif Honda NSX',
    ],
    additionalOptions: [
      {
        name: 'Invité VIP',
        price: 50,
        maxQuantity: 2,
      },
      {
        name: 'Pack photos premium',
        price: 75,
        maxQuantity: 1,
      },
    ],
    isExclusive: true,
  };

  return <PackRegistration {...packData} />;
};

export default NSXClubPack; 