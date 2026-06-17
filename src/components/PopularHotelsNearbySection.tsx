import { figmaAssets } from '@/constants/figmaAssets';
import type { NearbyHotel } from '@/constants/nearbyHotelsData';
import { NEARBY_HOTELS } from '@/constants/nearbyHotelsData';
import { colors } from '@/constants/typography';
import type { CSSProperties } from 'react';

/** Figma slider `18:8172` — 343px viewport, container at -492px, slides at 266px intervals. */
const SLIDER_DESIGN_WIDTH = 343;
const TRACK_OFFSET_PX = -226; // -492 + 266
const SLIDE_WIDTH_PX = 266;

const CARD_GRADIENT =
  'radial-gradient(ellipse 88% 71% at 50% 100%, rgba(15, 24, 26, 0.7) 0%, rgba(4, 15, 18, 0.35) 16%, rgba(4, 15, 18, 0) 70%)';

function StarRating({ count }: { count: number }) {
  return (
    <div style={s.starsRow} aria-label={`${count} stars`}>
      {Array.from({ length: count }, (_, i) => (
        <img key={i} src={figmaAssets.nearbyHotelStar} alt="" width={12} height={12} style={{ display: 'block' }} />
      ))}
    </div>
  );
}

function HotelSlide({ hotel }: { hotel: NearbyHotel }) {
  const label = hotel.nameLines?.join(' ') ?? 'Red Rock Casino Resort Spa';

  if (hotel.compositeCard) {
    return (
      <div style={s.slide}>
        <button type="button" style={s.cardBtn} aria-label={label}>
          <div style={s.card}>
            <img src={hotel.compositeCard} alt="" style={s.compositeCardImg} loading="lazy" decoding="async" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div style={s.slide}>
      <button type="button" style={s.cardBtn} aria-label={hotel.nameLines?.join(' ') ?? 'Nearby hotel'}>
        <div style={s.card}>
          <div
            style={{
              ...s.imageWrap,
              top: hotel.imageOffsetY ?? 0,
              height: hotel.imageHeight ?? 200,
            }}
          >
            <img src={hotel.image} alt="" style={s.cardImg} loading="lazy" decoding="async" />
          </div>
          <div
            style={{
              ...s.caption,
              top: hotel.captionOffsetY ?? 0,
            }}
          >
            <div
              style={{
                ...s.captionInner,
                paddingTop: hotel.nameLines ? 0 : 73.59,
              }}
            >
              {hotel.nameLines ? (
                <div style={s.titleBlock}>
                  {hotel.nameLines.map((line) => (
                    <p key={line} style={s.cardTitle}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : null}
              <StarRating count={hotel.stars} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/** Popular hotels carousel — Figma `18:8169` / slider `18:8172` (fixed clip, no scroll) */
export function PopularHotelsNearbySection() {
  return (
    <section style={s.section} aria-label="Popular hotels nearby">
      <h2 style={s.sectionTitle}>Popular Hotels Nearby</h2>
      <div style={s.slider}>
        <div style={s.track}>
          {NEARBY_HOTELS.map((hotel) => (
            <HotelSlide key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}

const trackOffset = `${(TRACK_OFFSET_PX / SLIDER_DESIGN_WIDTH) * 100}%`;
const trackWidth = `${((SLIDE_WIDTH_PX * NEARBY_HOTELS.length) / SLIDER_DESIGN_WIDTH) * 100}%`;

const s: Record<string, CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: '100%',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  slider: {
    position: 'relative',
    width: '100%',
    height: 220.5,
    overflow: 'hidden',
  },
  track: {
    position: 'absolute',
    top: 0,
    left: trackOffset,
    width: trackWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '100%',
  },
  slide: {
    flex: `0 0 ${100 / NEARBY_HOTELS.length}%`,
    width: `${100 / NEARBY_HOTELS.length}%`,
    padding: '8px 8px 12.5px',
    boxSizing: 'border-box',
  },
  cardBtn: {
    display: 'block',
    width: '100%',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  card: {
    position: 'relative',
    width: '100%',
    height: 200,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageWrap: {
    position: 'absolute',
    left: 'calc(-25 / 250 * 100%)',
    width: 'calc(300 / 250 * 100%)',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    objectFit: 'cover',
    display: 'block',
  },
  compositeCardImg: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  caption: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundImage: CARD_GRADIENT,
    pointerEvents: 'none',
  },
  captionInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4.8,
    padding: '0 20px 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 24.79,
  },
  cardTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '22px',
    color: '#ffffff',
    margin: 0,
  },
  starsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
};
