import { LazyWhenVisible } from '@/components/LazyWhenVisible';
import { figmaAssets } from '@/constants/figmaAssets';
import { HOTEL_ABOUT, HOTEL_AMENITIES, HOTEL_FAQ } from '@/constants/hotelAboutData';
import { HotelFaqSection } from '@/components/HotelFaqSection';
import { HotelLocationSection } from '@/components/HotelLocationSection';
import { PopularHotelsNearbySection } from '@/components/PopularHotelsNearbySection';
import { AboutGuestReservationsSection } from '@/components/AboutGuestReservationsSection';
import { GuestReservationsDisclaimerSection } from '@/components/GuestReservationsDisclaimerSection';
import { GuestReservationsFooterSection } from '@/components/GuestReservationsFooterSection';
import { colors, textStyles as typo } from '@/constants/typography';
import type { CSSProperties } from 'react';

function AmenityItem({ label }: { label: string }) {
  return (
    <li style={s.amenityItem}>
      <img
        src={figmaAssets.roomsRatesAmenityCheck}
        alt=""
        width={18}
        height={18}
        style={{ display: 'block', flexShrink: 0, marginTop: 2 }}
      />
      <span style={s.amenityLabel}>{label}</span>
    </li>
  );
}

/** About + Amenities — Figma `18:7913` */
export function HotelAboutSection() {
  return (
    <section style={s.section} aria-label="Hotel information">
      <h2 style={typo.pageTitle}>{HOTEL_ABOUT.title}</h2>

      <div style={s.aboutClip}>
        <p style={typo.bodyTight}>{HOTEL_ABOUT.body}</p>
        <div style={s.aboutFade} aria-hidden />
      </div>

      <button type="button" style={s.moreLink}>
        More
      </button>

      <h2 style={typo.pageTitle}>Amenities</h2>

      <ul style={s.amenityGrid}>
        {HOTEL_AMENITIES.map((label) => (
          <AmenityItem key={label} label={label} />
        ))}
      </ul>

      <HotelFaqSection items={HOTEL_FAQ} />

      <LazyWhenVisible minHeight={480}>
        <HotelLocationSection />
      </LazyWhenVisible>

      <LazyWhenVisible minHeight={280}>
        <PopularHotelsNearbySection />
      </LazyWhenVisible>

      <LazyWhenVisible minHeight={320}>
        <AboutGuestReservationsSection />
      </LazyWhenVisible>

      <LazyWhenVisible>
        <GuestReservationsDisclaimerSection />
      </LazyWhenVisible>

      <LazyWhenVisible>
        <GuestReservationsFooterSection />
      </LazyWhenVisible>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  aboutClip: {
    position: 'relative',
    width: '100%',
    maxHeight: 359,
    overflow: 'hidden',
  },
  aboutFade: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)',
    pointerEvents: 'none',
  },
  moreLink: {
    ...typo.tripSummaryLinkNorthstar,
    alignSelf: 'flex-start',
  },
  amenityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: 0,
    rowGap: 0,
    width: '100%',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  amenityItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 22,
    paddingRight: 8,
    minWidth: 0,
  },
  amenityLabel: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '20.8px',
    color: colors.textBody,
    margin: 0,
  },
};
