import { figmaAssets } from '@/constants/figmaAssets';

export type RoomAmenityKey = 'wifi' | 'breakfast';

export type RoomRate = {
  bestValue?: boolean;
  amenities: { key: RoomAmenityKey; label: string }[];
  perNight: string;
  totalStay: string;
  taxes: string;
};

export type RoomCardData = {
  id: string;
  title: string;
  image: string;
  mostPopular?: boolean;
  bedLabel: string;
  viewLabel?: string;
  /** Figma `19:8541` strip icon vs pool waves */
  viewIcon?: 'pool' | 'strip';
  rates: RoomRate[];
};

export type SelectedRoomReservation = Pick<
  RoomCardData,
  'id' | 'title' | 'image' | 'bedLabel' | 'viewLabel'
>;

export function formatReviewStayRoomDetails(bedLabel: string, viewLabel?: string): string {
  return viewLabel ? `${bedLabel}, ${viewLabel}` : bedLabel;
}

export const ROOMS_RATES_TRIP = {
  dates: 'Fri, Jul 10 - Sun, Jul 12',
  checkIn: 'Fri, Jul 10, 2026',
  checkOut: 'Sun, Jul 12, 2026',
  occupancy: 'Rooms: 1, Adults: 2',
} as const;

export const REVIEW_STAY_TRIP = {
  occupancy: '1 Room, 2 Adults',
  roomCount: 1,
  nightCount: 2,
  dates: ROOMS_RATES_TRIP.dates,
  checkIn: ROOMS_RATES_TRIP.checkIn,
  checkOut: ROOMS_RATES_TRIP.checkOut,
} as const;

/** Cancellation deadline for the demo trip — two days before check-in. */
export const TRIP_REFUND_DEADLINE = {
  short: 'before Jul 8, 2026',
  long: 'Jul 8, 2026',
} as const;

export const ROOMS_RATES_HOTEL = {
  name: 'Caesars Palace Las Vegas',
  address: '3570 Las Vegas Blvd. South, Las Vegas, NV, 89109, US',
  stars: 5,
} as const;

export const ROOMS_RATES_FILTERS = [
  'All Rooms',
  'Fully Refundable',
  '1 Bed',
  '2 Beds',
] as const;

export const ROOM_CARDS: RoomCardData[] = [
  {
    id: 'standard',
    title: 'Standard',
    image: figmaAssets.roomsRatesStandardImage,
    mostPopular: true,
    bedLabel: '1 King Bed',
    rates: [
      {
        bestValue: true,
        amenities: [{ key: 'wifi', label: 'Free Internet' }],
        perNight: '$93',
        totalStay: '$183',
        taxes: '+$10 taxes',
      },
    ],
  },
  {
    id: 'julius-deluxe',
    title: 'Julius Deluxe 2 Queen Beds',
    image: figmaAssets.roomsRatesJuliusImage,
    bedLabel: '2 Queen Beds',
    rates: [
      {
        amenities: [{ key: 'wifi', label: 'Free Internet' }],
        perNight: '$93',
        totalStay: '$183',
        taxes: '+$10 taxes',
      },
    ],
  },
  {
    id: 'deluxe-king',
    title: 'Deluxe 1 King Bed, Strip View',
    image: figmaAssets.roomsRatesDeluxeImage,
    bedLabel: '1 King Bed',
    viewLabel: 'Strip View',
    viewIcon: 'strip',
    rates: [
      {
        amenities: [{ key: 'wifi', label: 'Free Internet' }],
        perNight: '$102',
        totalStay: '$194',
        taxes: '+$12 taxes',
      },
      {
        amenities: [
          { key: 'wifi', label: 'Free Internet' },
          { key: 'breakfast', label: 'Free Breakfast' },
        ],
        perNight: '$102',
        totalStay: '$194',
        taxes: '+$12 taxes',
      },
    ],
  },
  {
    id: 'nobu-deluxe',
    title: 'Nobu Deluxe 1 King Bed, Pool View',
    image: figmaAssets.roomsRatesNobuImage,
    bedLabel: '1 King Bed',
    viewLabel: 'Pool View',
    rates: [
      {
        amenities: [{ key: 'wifi', label: 'Free Internet' }],
        perNight: '$130',
        totalStay: '$230',
        taxes: '+$15 taxes',
      },
    ],
  },
];
