import { figmaAssets } from '@/constants/figmaAssets';
import {
  FOOTER_GET_IN_TOUCH_LINKS,
  FOOTER_LEARN_MORE_LINKS,
  FOOTER_SOCIAL_LINKS,
} from '@/constants/footerData';
import { colors } from '@/constants/typography';
import type { CSSProperties, ReactNode } from 'react';

const SOCIAL_ICONS: Record<(typeof FOOTER_SOCIAL_LINKS)[number]['id'], string> = {
  facebook: figmaAssets.footerSocialFacebook,
  twitter: figmaAssets.footerSocialTwitter,
  instagram: figmaAssets.footerSocialInstagram,
  pinterest: figmaAssets.footerSocialPinterest,
  youtube: figmaAssets.footerSocialYoutube,
};

function FooterLinkColumn({
  title,
  links,
  children,
}: {
  title: string;
  links?: readonly string[];
  children?: ReactNode;
}) {
  return (
    <div style={s.linkColumn}>
      <p style={s.columnTitle}>{title}</p>
      <div style={s.linkList}>
        {links?.map((label) => (
          <button key={label} type="button" style={s.linkBtn}>
            {label}
          </button>
        ))}
        {children}
      </div>
    </div>
  );
}

function FooterLogo() {
  return (
    <div style={s.logoBlock}>
      <div style={s.logoMarkRow}>
        <img src={figmaAssets.footerLogoBell} alt="" width={17} height={14} style={s.logoBell} />
        <img src={figmaAssets.footerLogoWordmark} alt="" height={14} style={s.logoWordmark} />
      </div>
      <p style={s.logoTagline}>An independent travel network</p>
    </div>
  );
}

/** Site footer — Figma `18:8300` */
export function GuestReservationsFooterSection() {
  return (
    <footer style={s.footer} aria-label="Site footer">
      <div style={s.inner}>
        <div style={s.linkColumns}>
          <FooterLinkColumn title="Learn More" links={FOOTER_LEARN_MORE_LINKS} />
          <FooterLinkColumn title="Get in Touch" links={FOOTER_GET_IN_TOUCH_LINKS}>
            <div style={s.privacyRow}>
              <button type="button" style={s.linkBtn}>
                Privacy Choices
              </button>
              <img
                src={figmaAssets.footerPrivacyChoicesIcon}
                alt=""
                width={34}
                height={16}
                style={{ display: 'block', flexShrink: 0 }}
              />
            </div>
          </FooterLinkColumn>
        </div>

        <div style={s.socialRow}>
          {FOOTER_SOCIAL_LINKS.map(({ id, label }) => (
            <button key={id} type="button" style={s.socialBtn} aria-label={label}>
              <img src={SOCIAL_ICONS[id]} alt="" width={15} height={15} style={{ display: 'block' }} />
            </button>
          ))}
        </div>

        <FooterLogo />

        <p style={s.legalCopy}>
          Guest Reservations
          <sup style={s.tm}>TM</sup> is an independent travel network offering over 100,000 hotels
          worldwide.
        </p>
        <p style={s.legalCopy}>
          Copyright 2025 Guest Reservations
          <sup style={s.tm}>TM</sup>
        </p>
      </div>
    </footer>
  );
}

const s: Record<string, CSSProperties> = {
  footer: {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    backgroundColor: '#f5f5f5',
    padding: 16,
    boxSizing: 'border-box',
  },
  inner: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  linkColumns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  linkColumn: {
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  columnTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
    margin: 0,
    textAlign: 'center',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  linkBtn: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
    margin: 0,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  },
  privacyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  socialRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: `1px solid ${colors.border}`,
    paddingTop: 1,
    paddingBottom: 1,
    minHeight: 59,
    boxSizing: 'border-box',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  logoBlock: {
    position: 'relative',
    width: 180,
    height: 33,
    flexShrink: 0,
  },
  logoMarkRow: {
    position: 'absolute',
    left: 0,
    top: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 14,
    width: 180,
  },
  logoBell: {
    display: 'block',
    flexShrink: 0,
    width: 17,
    height: 14,
    objectFit: 'contain',
  },
  logoWordmark: {
    display: 'block',
    flex: '1 1 auto',
    minWidth: 0,
    height: 14,
    width: 'auto',
    objectFit: 'contain',
  },
  logoTagline: {
    position: 'absolute',
    left: 1,
    top: 19,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: '14px',
    letterSpacing: '0.7px',
    color: colors.textPrimary,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  legalCopy: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textSecondary,
    margin: 0,
    textAlign: 'center',
    width: '100%',
  },
  tm: {
    fontSize: 9,
    lineHeight: '16px',
    verticalAlign: 'baseline',
  },
};
