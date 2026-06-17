import siteHeaderLogoUrl from '@/assets/bundled/rooms-rates/site-header-logo.svg?url';
import { figmaAssets } from '@/constants/figmaAssets';
import { colors } from '@/constants/typography';
import { goToRoomsRates } from '@/navigation';
import type { CSSProperties } from 'react';

/** Site header — Figma `18:7597` */
export function RoomsRatesSiteHeader() {
  return (
    <header style={s.header}>
      <div style={s.menuBar}>
        <div style={s.menuLeft}>
          <a
            href="#"
            style={s.logoLink}
            aria-label="Guest Reservations — An independent travel network"
            onClick={(e) => {
              e.preventDefault();
              goToRoomsRates();
            }}
          >
            <img src={siteHeaderLogoUrl} alt="" width={181} height={34} style={s.logo} />
          </a>
        </div>
        <button type="button" style={s.menuBtn} aria-label="Menu">
          <img
            src={figmaAssets.roomsRatesSiteHeaderMenu}
            alt=""
            width={19}
            height={12}
            style={{ display: 'block' }}
          />
        </button>
      </div>
    </header>
  );
}

const s: Record<string, CSSProperties> = {
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.surfaceDark,
  },
  menuLeft: {
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logoLink: {
    display: 'block',
    flexShrink: 0,
    lineHeight: 0,
    textDecoration: 'none',
  },
  logo: {
    display: 'block',
    width: 181,
    height: 34,
    flexShrink: 0,
  },
  menuBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    border: 'none',
    borderLeft: `1px solid ${colors.surfaceMenuBorder}`,
    background: 'transparent',
    cursor: 'pointer',
  },
};
