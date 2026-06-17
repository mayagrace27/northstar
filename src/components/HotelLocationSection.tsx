import { figmaAssets } from '@/constants/figmaAssets';
import { HOTEL_LOCATION } from '@/constants/hotelAboutData';
import { colors, textStyles as typo } from '@/constants/typography';
import type { CSSProperties } from 'react';

/** Location map — Figma `18:8145` / map section `18:8150` */
export function HotelLocationSection() {
  return (
    <section style={s.section} aria-label="Hotel location">
      <div style={s.heading}>
        <h2 style={s.locationTitle}>Location</h2>
        <p style={typo.bodyTight}>{HOTEL_LOCATION.name}</p>
        <p style={typo.bodyTight}>{HOTEL_LOCATION.address}</p>
      </div>

      <div style={s.mapWrap}>
        <div style={s.mapImgClip}>
          <img src={figmaAssets.roomsRatesMapImage} alt="" style={s.mapImg} loading="lazy" decoding="async" />
        </div>
        <button type="button" style={s.viewMapBtn}>
          <img
            src={figmaAssets.roomsRatesMapLocationPin}
            alt=""
            width={20}
            height={20}
            style={{ display: 'block', flexShrink: 0 }}
          />
          <span style={s.viewMapLabel}>View Map</span>
        </button>
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    backgroundColor: '#fff',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },
  locationTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  mapWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: '343 / 374.18',
    overflow: 'hidden',
  },
  mapImgClip: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  mapImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    display: 'block',
    pointerEvents: 'none',
  },
  viewMapBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 2.58,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: 'none',
    cursor: 'pointer',
    padding: '5.97px 11.2px 7.97px',
  },
  viewMapLabel: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '21px',
    color: '#ffffff',
    margin: 0,
    whiteSpace: 'nowrap',
  },
};
