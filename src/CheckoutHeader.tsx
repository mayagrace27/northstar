import { figmaAssets } from '@/constants/figmaAssets';
import { colors } from '@/constants/typography';
import { GUTTER } from '@/constants/layout';
import type { CSSProperties } from 'react';

const s: Record<string, CSSProperties> = {
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.surfaceDark,
    width: '100%',
    flexShrink: 0,
  },
  menuLeft: {
    flex: 1,
    paddingLeft: GUTTER,
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 0,
  },
  logoBtn: {
    display: 'block',
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    lineHeight: 0,
  },
  menuActions: { display: 'flex', flexDirection: 'row' },
  menuIconCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 16px',
    borderLeft: `1px solid ${colors.surfaceMenuBorder}`,
    background: 'transparent',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    cursor: 'pointer',
  },
};

type CheckoutHeaderProps = {
  onLogoClick?: () => void;
};

export function CheckoutHeader({ onLogoClick }: CheckoutHeaderProps) {
  return (
    <header style={s.menuBar}>
      <div style={s.menuLeft}>
        <div style={s.logoRow}>
          <button
            type="button"
            onClick={onLogoClick}
            aria-label="Guest Reservations — go to rooms and rates"
            disabled={!onLogoClick}
            style={{
              ...s.logoBtn,
              cursor: onLogoClick ? 'pointer' : 'default',
            }}
          >
            <img
              src={figmaAssets.logoHeader}
              alt=""
              width={180}
              height={34}
              style={{ display: 'block', width: 180, height: 34, objectFit: 'contain' }}
            />
          </button>
        </div>
      </div>
      <div style={s.menuActions}>
        <button type="button" style={s.menuIconCell} aria-label="Menu">
          <img src={figmaAssets.iconMenu} alt="" width={24} height={24} />
        </button>
        <button type="button" style={s.menuIconCell} aria-label="Phone">
          <img src={figmaAssets.iconPhone} alt="" width={19} height={16} />
        </button>
      </div>
    </header>
  );
}
