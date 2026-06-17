import { RoomsRatesSiteHeader } from '@/components/RoomsRatesSiteHeader';
import { ChargeDetailsDrawer } from '@/ChargeDetailsDrawer';
import enterDetailsShieldUrl from '@/assets/bundled/enter-details-shield.svg?url';
import { GUTTER } from '@/constants/layout';
import { DISPLAY_ONLY_INPUT_PROPS, displayOnlyInputStyle } from '@/constants/uiInputProps';
import { colors, textStyles as typo } from '@/constants/typography';
import { REVIEW_STAY_TRIP } from '@/constants/roomsRatesData';
import type { RateRefundPolicy } from '@/navigation';
import {
  buildPriceSummary,
  formatUsd,
  RESORT_FEE,
  type RatePricing,
} from '@/utils/ratePricing';
import { useState, type CSSProperties } from 'react';

const INPUT_BORDER = '#e9e9ea';
const REQ_RED = '#e2121a';
const TERMS_URL = 'https://www.guestreservations.com/about/termsofuse';
const PRIVACY_URL = 'https://www.guestreservations.com/about/privacy';

/** Payment — Figma `4:6377` */
type EnterDetailsScreenProps = {
  selectedRate: RatePricing;
  selectedRefundPolicy: RateRefundPolicy;
};

export default function EnterDetailsScreen({
  selectedRate,
  selectedRefundPolicy,
}: EnterDetailsScreenProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const priceBreakdown = buildPriceSummary(
    selectedRate,
    selectedRefundPolicy,
    REVIEW_STAY_TRIP.roomCount,
    REVIEW_STAY_TRIP.nightCount,
  );

  return (
    <main style={s.screen}>
      <ChargeDetailsDrawer
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        breakdown={priceBreakdown}
      />

      <div style={s.siteHeaderWrap}>
        <RoomsRatesSiteHeader />
      </div>

      <div style={s.container}>
        <div style={s.summaryStrip}>
          <div style={s.summaryRow}>
            <div style={s.summaryLeft}>
              <p style={s.totalCharges}>Total Charges: {formatUsd(priceBreakdown.payToday)}</p>
              <button type="button" style={typo.enterDetailsLink}>
                Use a coupon
              </button>
            </div>
            <button type="button" style={s.detailsLink} onClick={() => setDetailsOpen(true)}>
              Details
            </button>
          </div>
        </div>

        <div style={s.ruleFull} aria-hidden />

        <div style={s.paymentOuter}>
          <form autoComplete="off" style={s.paymentStack} onSubmit={(e) => e.preventDefault()}>
            <div style={s.paymentHeaderRow}>
              <h2 style={typo.paymentSectionTitle}>Payment</h2>
              <div style={s.secureCheckoutWrap}>
                <img
                  src={enterDetailsShieldUrl}
                  alt=""
                  width={14}
                  height={14}
                  style={{ display: 'block', flexShrink: 0 }}
                />
                <span style={typo.secureCheckoutCaption}>Secure Checkout</span>
              </div>
            </div>

            <div style={s.formBox}>
              <ReqLabel text="Name on Card" />
              <input
                type="text"
                {...DISPLAY_ONLY_INPUT_PROPS}
                className="review-details-input"
                style={{ ...s.textInput, ...displayOnlyInputStyle }}
              />
            </div>

            <div style={s.formBox}>
              <ReqLabel text="Card Number" />
              <input
                type="text"
                {...DISPLAY_ONLY_INPUT_PROPS}
                inputMode="numeric"
                className="review-details-input"
                style={{ ...s.textInput, ...displayOnlyInputStyle }}
              />
            </div>

            <div style={s.expCvvRow}>
              <div style={s.expCvvCol}>
                <div style={s.formBox}>
                  <ReqLabel text="Expiration" />
                  <input
                    type="text"
                    {...DISPLAY_ONLY_INPUT_PROPS}
                    className="review-details-input"
                    style={{ ...s.textInput, ...displayOnlyInputStyle }}
                  />
                </div>
              </div>
              <div style={s.expCvvCol}>
                <div style={s.formBox}>
                  <ReqLabel text="CVV" />
                  <input
                    type="text"
                    {...DISPLAY_ONLY_INPUT_PROPS}
                    inputMode="numeric"
                    className="review-details-input"
                    style={{ ...s.textInput, ...displayOnlyInputStyle }}
                  />
                </div>
              </div>
            </div>

            <div style={s.formBox}>
              <ReqLabel text="Zip Code" />
              <input
                type="text"
                {...DISPLAY_ONLY_INPUT_PROPS}
                inputMode="numeric"
                className="review-details-input"
                style={{ ...s.textInput, ...displayOnlyInputStyle }}
              />
            </div>
          </form>

          <div style={s.encryptedRow}>
            <img
              src={enterDetailsShieldUrl}
              alt=""
              width={14}
              height={14}
              style={{ display: 'block', flexShrink: 0 }}
            />
            <p style={s.encryptedText}>Your information is encrypted and secure</p>
          </div>
        </div>

        <div style={s.ruleInset} aria-hidden />

        <div style={s.legalOuter}>
          <p style={typo.enterDetailsLegal}>
            <span>
              By clicking “Complete Reservation,” I understand that my credit card will be charged
              {formatUsd(priceBreakdown.payToday)}&nbsp;upon submitting the reservation request and agree to the&nbsp;
            </span>
            <a href={TERMS_URL} target="_blank" rel="noreferrer" style={s.legalA}>
              terms and conditions
            </a>
            <span>,&nbsp;</span>
            <a href={PRIVACY_URL} target="_blank" rel="noreferrer" style={s.legalA}>
              privacy policy
            </a>
            <span>, and </span>
            <span style={s.legalUnderline}>booking details</span>
            <span>
              {' '}
              including hotel and cancellation policies.&nbsp;Guest Reservations™&nbsp;is an independent
              travel network. Resort fees ({formatUsd(RESORT_FEE)}) will be collected by the property itself at check-in
              or check-out.
            </span>
          </p>
        </div>

        <div style={s.buttonWrap}>
          <button type="button" style={s.completeBtn}>
            <span style={typo.reviewStayNext}>Complete Reservation</span>
          </button>
        </div>
      </div>
    </main>
  );
}

function ReqLabel({ text }: { text: string }) {
  return (
    <div style={s.reqLabelRow}>
      <span style={typo.formFieldLabel}>{text}</span>
      <span style={s.reqStar} aria-hidden>
        *
      </span>
    </div>
  );
}

const font = '"Nunito Sans", system-ui, sans-serif';

const s: Record<string, CSSProperties> = {
  screen: {
    backgroundColor: '#ffffff',
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  siteHeaderWrap: {
    width: '100%',
    flexShrink: 0,
  },
  /** Figma `9:1576` */
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 24,
    boxSizing: 'border-box',
  },
  /** Figma `9:1577` */
  summaryStrip: {
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
  /** Figma `9:1578` */
  summaryRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  /** Figma `9:1579` */
  summaryLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    flex: '1 1 0',
    minWidth: 0,
  },
  totalCharges: {
    fontFamily: font,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  detailsLink: {
    ...typo.enterDetailsLink,
    alignSelf: 'flex-start',
    textAlign: 'right',
    flexShrink: 0,
  },
  /** Figma `9:1583` */
  ruleFull: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  /** Figma `9:1584` */
  paymentOuter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    boxSizing: 'border-box',
  },
  /** Figma `9:1585` */
  paymentStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  /** Figma `9:1586` */
  paymentHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  /** Figma `9:1588` */
  secureCheckoutWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingTop: 4,
    paddingBottom: 4,
    flexShrink: 0,
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
  },
  reqLabelRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  reqStar: {
    fontFamily: font,
    fontWeight: 800,
    fontSize: 14,
    lineHeight: '16px',
    color: REQ_RED,
  },
  /** Figma `9:1649` */
  expCvvRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    width: '100%',
  },
  expCvvCol: {
    flex: '1 1 0',
    minWidth: 0,
  },
  textInput: {
    width: '100%',
    height: 45,
    boxSizing: 'border-box',
    paddingLeft: 12,
    paddingRight: 12,
    margin: 0,
    fontFamily: font,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    color: colors.textPrimary,
    backgroundColor: '#ffffff',
    border: `1px solid ${INPUT_BORDER}`,
    borderRadius: 0,
    outline: 'none',
  },
  /** Figma `9:1656` */
  encryptedRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  encryptedText: {
    fontFamily: font,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSecondary,
    margin: 0,
  },
  /** Figma `9:1661` — inset divider above legal */
  ruleInset: {
    height: 1,
    marginLeft: GUTTER,
    marginRight: GUTTER,
    backgroundColor: colors.border,
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  /** Figma `9:1662` */
  legalOuter: {
    display: 'flex',
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  legalA: {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    cursor: 'pointer',
  },
  legalUnderline: {
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    cursor: 'default',
  },
  /** Figma `9:1664` */
  buttonWrap: {
    width: '100%',
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    boxSizing: 'border-box',
  },
  completeBtn: {
    width: '100%',
    backgroundColor: colors.reserveOrange,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    boxSizing: 'border-box',
  },
};
