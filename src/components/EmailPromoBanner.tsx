import { figmaAssets } from '@/constants/figmaAssets';
import type { CSSProperties } from 'react';

/** Email promo bar — Figma `18:7640` */
export function EmailPromoBanner() {
  return (
    <section style={s.banner} aria-label="Email promotion">
      <button type="button" style={s.link}>
        <img
          src={figmaAssets.roomsRatesEmailPromoTag}
          alt=""
          width={20}
          height={20}
          style={{ display: 'block', flexShrink: 0, marginRight: 8 }}
        />
        <span style={s.text}>
          <span style={s.highlight}>Unlock $25 off</span>
          <span style={s.rest}>{` today's booking`}</span>
        </span>
      </button>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  banner: {
    width: '100%',
    backgroundColor: '#0d6763',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    maxWidth: '100%',
  },
  text: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontSize: 16,
    lineHeight: '19.2px',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  highlight: {
    fontWeight: 800,
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
  },
  rest: {
    fontWeight: 400,
  },
};
