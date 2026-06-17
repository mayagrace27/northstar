import { figmaAssets } from '@/constants/figmaAssets';
import { ROOMS_RATES_HOTEL } from '@/constants/roomsRatesData';
import { colors } from '@/constants/typography';
import type { CSSProperties } from 'react';

/** Hotel title block — Figma `18:7616` */
export function RoomsRatesHotelTitle() {
  return (
    <section style={s.section} aria-label="Hotel details">
      <h1 style={s.title}>{ROOMS_RATES_HOTEL.name}</h1>
      <p style={s.address}>{ROOMS_RATES_HOTEL.address}</p>
      <div style={s.starsRow} aria-label={`${ROOMS_RATES_HOTEL.stars} stars`}>
        {Array.from({ length: ROOMS_RATES_HOTEL.stars }, (_, i) => (
          <img
            key={i}
            src={figmaAssets.roomsRatesHotelTitleStar}
            alt=""
            width={20}
            height={20}
            style={{ display: 'block' }}
          />
        ))}
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '32px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  address: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    color: colors.textSecondary,
    margin: 0,
    width: '100%',
  },
  starsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4.6,
    width: '100%',
  },
};
