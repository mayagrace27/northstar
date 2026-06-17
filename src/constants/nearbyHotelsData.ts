import { figmaAssets } from '@/constants/figmaAssets';

export type NearbyHotel = {
  id: string;
  image: string;
  /** Single composite card asset — Figma `18:8192` */
  compositeCard?: string;
  nameLines?: string[];
  stars: number;
  /** Figma link/image frame offset — Red Rock `18:8193` */
  imageOffsetY?: number;
  imageHeight?: number;
  /** Figma figcaption offset — Red Rock `18:8196` */
  captionOffsetY?: number;
};

export const NEARBY_HOTELS: NearbyHotel[] = [
  {
    id: 'waldorf',
    image: figmaAssets.nearbyHotelWaldorf,
    stars: 5,
  },
  {
    id: 'red-rock',
    image: figmaAssets.nearbyHotelRedRock,
    compositeCard: figmaAssets.nearbyHotelRedRockCard,
    stars: 5,
  },
  {
    id: 'luxury-suites',
    image: figmaAssets.nearbyHotelLuxurySuites,
    nameLines: ['Luxury Suites', 'International at The', 'Signature'],
    stars: 3,
  },
];
