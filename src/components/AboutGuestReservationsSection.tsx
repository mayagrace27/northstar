import { figmaAssets } from '@/constants/figmaAssets';
import { colors } from '@/constants/typography';
import type { CSSProperties } from 'react';

/** About Guest Reservations banner — Figma `18:8259` */
export function AboutGuestReservationsSection() {
  return (
    <section style={s.section} aria-label="About Guest Reservations">
      <div style={s.bgWrap} aria-hidden>
        <img src={figmaAssets.aboutGrBackground} alt="" style={s.bgImg} loading="lazy" decoding="async" />
      </div>

      <div style={s.content}>
        <div style={s.logoRow}>
          <img
            src={figmaAssets.aboutGrLogoBell}
            alt=""
            width={21}
            height={17}
            style={s.logoBell}
          />
          <img
            src={figmaAssets.aboutGrLogoWordmark}
            alt=""
            height={17}
            style={s.logoWordmark}
          />
          <img src={figmaAssets.aboutGrLogoTm} alt="" width={8} height={4} style={s.logoTm} />
        </div>

        <div style={s.copy}>
          <p style={s.copyLine}>We are an independent travel network</p>
          <p style={s.copyLine}>offering over 100,000 hotels worldwide</p>
        </div>

        <button type="button" style={s.learnMoreBtn}>
          <span style={s.learnMoreLabel}>Learn more</span>
          <img
            src={figmaAssets.aboutGrLearnMoreArrow}
            alt=""
            width={10}
            height={10}
            style={{ display: 'block', flexShrink: 0 }}
          />
        </button>
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    paddingTop: 98,
    paddingBottom: 98,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  bgWrap: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  bgImg: {
    position: 'absolute',
    height: '100%',
    left: '-54%',
    top: 0,
    width: '208%',
    maxWidth: 'none',
    objectFit: 'cover',
    display: 'block',
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 48,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  logoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 240,
    maxWidth: '100%',
    height: 17,
  },
  logoBell: {
    display: 'block',
    flexShrink: 0,
    width: 21,
    height: 17,
    objectFit: 'contain',
  },
  logoWordmark: {
    display: 'block',
    flex: '1 1 auto',
    minWidth: 0,
    height: 17,
    width: 'auto',
    maxWidth: 195,
    objectFit: 'contain',
  },
  logoTm: {
    display: 'block',
    flexShrink: 0,
    width: 8,
    height: 4,
    objectFit: 'contain',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  copy: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  copyLine: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '24px',
    color: '#ffffff',
    margin: 0,
  },
  learnMoreBtn: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  learnMoreLabel: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 800,
    fontSize: 14,
    lineHeight: '21px',
    color: colors.reserveOrange,
    margin: 0,
  },
};
