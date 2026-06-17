import { colors } from '@/constants/typography';
import type { CSSProperties } from 'react';

/** Trademark disclaimer — Figma `18:8298` */
export function GuestReservationsDisclaimerSection() {
  return (
    <section style={s.section} aria-label="Guest Reservations disclaimer">
      <div style={s.inner}>
        <p style={s.text}>
          Guest Reservations™ is not owned or sponsored by any particular hotel or chain. The use of
          any hotel trademarks or information is solely for reference purposes in helping customers
          identify the travel destinations of their choice. All such property, brand, and company
          names are the registered trademarks or intellectual property of their respective owners.{' '}
          <button type="button" style={s.link}>
            Click here
          </button>{' '}
          for more information.
        </p>
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    boxSizing: 'border-box',
  },
  inner: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    minHeight: 198,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    color: colors.textPrimary,
    margin: 0,
  },
  link: {
    font: 'inherit',
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    display: 'inline',
  },
};
