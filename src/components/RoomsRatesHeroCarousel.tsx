import { figmaAssets } from '@/constants/figmaAssets';
import type { CSSProperties } from 'react';

const SLIDE_COUNT = 5;
const ACTIVE_SLIDE = 0;

/** Image hero carousel — Figma `18:7598` */
export function RoomsRatesHeroCarousel() {
  return (
    <section style={s.hero} aria-label="Hotel photos">
      <div style={s.imageWrap}>
        <img
          src={figmaAssets.roomsRatesHeroImage}
          alt=""
          style={s.image}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <button type="button" style={s.arrowLeft} aria-label="Previous photo">
        <img
          src={figmaAssets.roomsRatesHeroArrowLeft}
          alt=""
          width={40}
          height={220}
          style={{ display: 'block', width: 40, height: '100%' }}
        />
      </button>
      <button type="button" style={s.arrowRight} aria-label="Next photo">
        <img
          src={figmaAssets.roomsRatesHeroArrowRight}
          alt=""
          width={40}
          height={220}
          style={{ display: 'block', width: 40, height: '100%' }}
        />
      </button>

      <div style={s.dots} aria-hidden>
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <span key={i} style={i === ACTIVE_SLIDE ? s.dotActive : s.dot} />
        ))}
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  hero: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imageWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 220,
    transform: 'translateY(-50%)',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    objectFit: 'cover',
    display: 'block',
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  dots: {
    position: 'absolute',
    top: 196,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    flexShrink: 0,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexShrink: 0,
  },
};
