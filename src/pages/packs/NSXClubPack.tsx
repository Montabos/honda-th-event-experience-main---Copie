import React from 'react';
import { PackRegistration } from '../../components/PackRegistration';

const NSXClubPack = () => {
  const packData = {
    packTitle: 'Pack NSX Club',
    packDescription: 'Une expérience exclusive réservée aux propriétaires de NSX',
    packIcon: '🏁',
    prices: {
      oneDay: 30,
      twoDays: 45,
    },
    includes: [
      'Accès VIP au circuit',
      'Session de roulage dédiée NSX',
      'Déjeuner gastronomique',
      'Photo souvenir professionnelle',
      'Cadeau exclusif Honda NSX',
    ],
    isExclusive: true,
    packType: 'nsx' as const
  };

  return <PackRegistration {...packData} />;
};

export default NSXClubPack; 