import { colors } from '@/constants/typography';
import type { CSSProperties } from 'react';

const LINKS = ['Photos', 'Map', 'Groups(9+ Rooms)', 'Weddings'] as const;

/** Top quick links — Figma `18:7631` */
export function RoomsRatesQuickLinksMenu() {
  return (
    <nav style={s.menu} aria-label="Hotel quick links">
      {LINKS.map((label) => (
        <button key={label} type="button" style={s.linkBtn}>
          {label}
        </button>
      ))}
    </nav>
  );
}

const s: Record<string, CSSProperties> = {
  menu: {
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    boxSizing: 'border-box',
  },
  linkBtn: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '21px',
    color: colors.textPrimary,
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    background: 'none',
    border: 'none',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};
