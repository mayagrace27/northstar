export const HOTEL_ABOUT = {
  title: 'About Caesars Palace Las Vegas',
  body: `This hotel and casino on the Las Vegas Strip features celebrity-owned restaurants, The Forum Shops, an upscale spa and 7 swimming pools. All guest rooms offer a flat-screen cable TV. Caesars Palace rooms include an private bathroom with free toiletries. Room service is offered 24 hours a day. Dining options include Gordon Ramsay's Pub & Grill, Gordon Ramsay Hell's Kitchen, Mr. Chow and Restaurant Guy Savoy. The 500-item Bacchanal Buffet and casual dining choices like Beijing Noodle No. 9 are located on site. The Palace casino features slot machines and table games. The casino also offers a race & sports book. Guests can enjoy specialty cocktails at Caspians and Vanderpump's Cocktail Garden or visit the`,
} as const;

/** Two-column amenity list — Figma `18:7921` (row-major: left, right). */
export const HOTEL_AMENITIES = [
  'Room Service',
  'Car Rental',
  '24 hour front desk',
  'Cable/Satellite TV',
  'Fitness Center',
  'Property is cleaned with disinfectant',
  'Restaurant',
  'Property confirms they are implementing guest safety measures',
  'Gift Shop',
  'Bed sheets and towels are washed at a temperature of at least 60°C/140°F',
  'Hot Tub or Spa',
  'Concierge',
  'Hair Dryer',
  'Wheelchair Access',
  'Property uses a professional cleaning service',
  'Masks are available to guests',
  'Swimming Pool - Outdoor',
  'Contactless check-in and check-out are available',
  'Sundries shop',
  'Guests are provided with free hand sanitizer',
  'Individually-wrapped food options are available',
  'In room safe',
  'Social distancing measures are in place',
  'Internet Access - Public Access for fee',
  'ATM Machine',
  'Currency Exchange',
  'Parking - Self',
  'Acrylic shield between guests and staff in main contact areas',
  'Parking - Valet',
  'Laundry',
  'Non-Smoking Facility',
  'Pet Friendly',
  'Lounge/Bar',
] as const;

export type HotelFaqItem = {
  question: string;
  answer?: string;
  defaultOpen?: boolean;
};

export const HOTEL_FAQ: HotelFaqItem[] = [
  {
    question: 'What is the address for Caesars Palace Las Vegas?',
    answer: 'The property is located at 3570 Las Vegas Blvd. South in Las Vegas.',
    defaultOpen: true,
  },
  {
    question: 'What is the address for Caesars Palace Las Vegas?',
  },
  {
    question: 'What is the address for Caesars Palace Las Vegas?',
  },
];

export const HOTEL_LOCATION = {
  name: 'Caesars Palace Las Vegas',
  address: '3570 Las Vegas Blvd. South, Las Vegas, NV, 89109',
} as const;
