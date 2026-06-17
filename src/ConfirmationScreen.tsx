import { CheckoutStepper } from '@/CheckoutStepper';
import { figmaAssets } from '@/constants/figmaAssets';
import { REFUND_DEADLINE_LINE } from '@/constants/refundCopy';
import { REVIEW_STAY_TRIP } from '@/constants/roomsRatesData';
import { GUTTER } from '@/constants/layout';
import { colors, textStyles as typo } from '@/constants/typography';
import type { RateRefundPolicy } from '@/navigation';
import { PriceSummaryContent } from '@/PriceSummaryContent';
import type { CSSProperties } from 'react';

const GREY_MAIN = '#1f1f1f';

export type ConfirmationScreenProps = {
  refundPolicy?: RateRefundPolicy;
};

/** Checkout northstar — Figma `hVsG4Uf9wEpsG5TfyY6nAr` / `1:2064` (cs / post booking). */
export default function ConfirmationScreen({ refundPolicy = 'refundable' }: ConfirmationScreenProps) {
  return (
    <main style={s.screen}>
      <div style={s.hairline} aria-hidden />

      <CheckoutStepper phase="confirmation" />

      <div style={s.hairline} aria-hidden />

      <div style={s.successBannerOuter}>
        <div style={s.successBannerInner} role="status">
          <p style={s.successBannerText}>🎉 Thank you! Your reservation is confirmed.</p>
        </div>
      </div>

      <ActionButtonsRow />

      <section style={s.yourStaySection} aria-label="Reservation confirmation">
        <h1 style={s.yourStayTitle}>Your Stay: Las Vegas, NV</h1>

        <div style={s.inlineRow}>
          <span style={s.labelBold14}>Status:</span>
          <span style={s.confirmedOnly}>Confirmed</span>
        </div>

        <div style={s.inlineRow}>
          <span style={s.labelBold14}>Confirmation Number:</span>
          <div style={s.cluster}>
            <span style={s.confirmBadge}>R123456789</span>
            <button type="button" style={s.iconBtn} aria-label="Copy confirmation number">
              <img src={figmaAssets.confirmationCopyIcon} alt="" width={16} height={16} style={icon} />
            </button>
          </div>
        </div>

        <div style={s.inlineRow}>
          <span style={s.labelBold14}>Email:</span>
          <span style={s.body14}>johnsmith@gmail.com</span>
        </div>

        <div style={s.inlineRow}>
          <span style={s.labelBold14}>Reservation Name:</span>
          <span style={s.body14}>John Smith</span>
        </div>
      </section>

      <section style={s.hotelSection} aria-label="Hotel and stay">
        <div style={s.heroPair}>
          <div style={s.heroHalf}>
            <img src={figmaAssets.reviewStayHeroHotel} alt="" style={s.heroImg} />
          </div>
          <div style={s.heroHalf}>
            <img src={figmaAssets.reviewStayHeroRoom} alt="" style={s.heroImg} />
          </div>
        </div>

        <div style={s.hotelCopyStack}>
          <p style={typo.hotelInfoName}>Caesars Palace Las Vegas</p>
          <div style={s.addressRow}>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={s.linkUnderline}>
              3570 S Las Vegas Blvd
            </a>
            <div style={s.vertRule} aria-hidden />
            <a href="tel:+18662275938" style={s.linkUnderline}>
              (866) 227-5938
            </a>
          </div>
        </div>

        <div style={s.suiteBlock}>
          <p style={s.suiteTitle}>1 King Deluxe Suite</p>
          <p style={s.suiteMeta}>1 Room, 2 Adults, 1 King Bed, Pool View</p>
          <p style={s.suiteMeta}>Free breakfast, Free parking</p>
        </div>

        <div style={s.datesSection}>
          <div style={s.dateCol}>
            <p style={typo.reviewCheckLabel}>Check-in @ 4pm</p>
            <p style={s.dateValue}>{REVIEW_STAY_TRIP.checkIn}</p>
          </div>
          <div style={s.dateCol}>
            <p style={typo.reviewCheckLabel}>Check-out @11am</p>
            <p style={s.dateValue}>{REVIEW_STAY_TRIP.checkOut}</p>
          </div>
        </div>
      </section>

      <div style={s.hairline} aria-hidden />

      <section style={s.manageSection} aria-label="Manage trip">
        <div style={s.manageHeadingStack}>
          <h2 style={s.sectionTitle20}>Manage Trip</h2>
          <RefundPolicyBlock policy={refundPolicy} />
        </div>
        <div style={s.manageButtons}>
          <button type="button" style={s.borderBtnPrimary}>
            <img src={figmaAssets.confirmationModifyTripIcon} alt="" width={18} height={18} style={icon} />
            <span style={s.borderBtnLabel}>Modify Trip</span>
          </button>
          <button type="button" style={s.borderBtnPrimary}>
            <img src={figmaAssets.confirmationCancelTripIcon} alt="" width={18} height={18} style={icon} />
            <span style={s.borderBtnLabel}>Cancel Trip</span>
          </button>
        </div>
      </section>

      <div style={s.hairline} aria-hidden />

      <section style={s.pricingPaymentSection} aria-label="Price summary and payment">
        <div style={s.pricePayColumn}>
          <PriceSummaryContent variant="confirmation" />

          <div style={s.paymentBlock}>
            <h2 style={s.sectionTitle20}>Payment Info</h2>
            <PaymentInfoRows />
            <p style={s.footnote}>Prices are in USD</p>
            <p style={s.footnote}>
              This payment will be processed in the United States and will appear on your statement as [billed_as].
            </p>
          </div>
        </div>
      </section>

      <div style={s.hairline} aria-hidden />

      <AdditionalInformation />

      <footer style={s.termsFooter}>
        <a href="https://www.guestreservations.com/about/termsofuse" target="_blank" rel="noreferrer" style={s.termsLink}>
          Terms
        </a>
      </footer>
    </main>
  );
}

function RefundPolicyBlock({ policy }: { policy: RateRefundPolicy }) {
  if (policy === 'refundable') {
    return (
      <div style={s.refundWrap}>
        <p style={s.fullyRefundableTitle}>Fully Refundable</p>
        <div style={s.refundSubRow}>
          <span style={s.refundBefore}>{REFUND_DEADLINE_LINE}</span>
          <img src={figmaAssets.iconCancellationInfo} alt="" width={14} height={14} style={icon} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={s.policyTitleRow}>
        <span style={typo.reviewPolicyTitle}>Non-Refundable</span>
        <img src={figmaAssets.northstarNonRefundableInfo} alt="" width={14} height={14} style={icon} />
      </div>
      <p style={typo.reviewPolicyBody}>This reservation is not eligible for a refund.</p>
    </>
  );
}

function ActionButtonsRow() {
  return (
    <div style={s.actionsBar}>
      <div style={s.actionsRow}>
        <button type="button" style={s.actionBtn}>
          <img src={figmaAssets.confirmationEmailIcon} alt="" width={18} height={18} style={icon} />
          <span style={s.actionBtnLabel}>Email</span>
        </button>
        <button type="button" style={s.actionBtn}>
          <img src={figmaAssets.confirmationPrintIcon} alt="" width={16} height={16} style={icon} />
          <span style={s.actionBtnLabel}>Print</span>
        </button>
      </div>
    </div>
  );
}

function PaymentInfoRows() {
  const row: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    fontSize: 14,
    lineHeight: '18px',
    color: GREY_MAIN,
  };
  const left: CSSProperties = {
    flex: '1 0 0',
    minWidth: 0,
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: GREY_MAIN,
  };
  const right: CSSProperties = {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: GREY_MAIN,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  return (
    <>
      <div style={row}>
        <p style={left}>Billing Name:</p>
        <p style={right}>John Smith</p>
      </div>
      <div style={row}>
        <p style={left}>Payment Method:</p>
        <p style={right}>Card</p>
      </div>
      <div style={row}>
        <p style={left}>Card Number:</p>
        <p style={right}>Ending in XXXX</p>
      </div>
      <div style={row}>
        <p style={left}>Amount Charged:</p>
        <p style={right}>$241.15</p>
      </div>
    </>
  );
}

function AdditionalInformation() {
  return (
    <section style={s.otherOuter} aria-label="Additional information">
      <h2 style={s.additionalMainTitle}>Additional Information</h2>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Customer Service</p>
        <p style={s.otherBody}>
          If you have any questions about your booking, you can contact customer service at 1 (866) 913-0695. Please have your
          Trip Number [trip_number] ready when calling.
        </p>
      </div>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Additional Fees Collected by the Property</p>
        <p style={s.otherBody}>
          The following additional fees will apply to your reservation and will be charged to you by the property.
        </p>
        <p style={s.otherBody}>Resort Fee per Night: [$XX.XX]</p>
      </div>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Cancellation Policy</p>
        <p style={s.otherBody}>
          Each room in this reservation is subject to the following cancellation policy: Cancellations before [MM/DD/YYYY], [XX:XX
          PM] [time_zone] are fully refundable. Bookings cancelled after [MM/DD/YYYY], [XX:XX PM] [time_zone] are non-refundable.
          There is no refund for no-shows or early checkouts.
        </p>
      </div>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Check-in Requirements</p>
        <p style={s.otherBody}>The guest checking in will need a valid photo ID and a major credit card for incidentals.</p>
      </div>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Additional Policies</p>
        <p style={s.otherBody}>
          Guarantee Policy: If you don&apos;t check-in to the hotel on the first day of your reservation and you do not alert the
          hotel in advance, your entire reservation will be canceled and you will not be entitled to a refund. The reservation
          holder must be 21 years of age or older.
        </p>
        <p style={s.otherBody}>
          Photo Policy: The reservation holder must present a valid photo ID and credit card at check-in. The credit card is
          required for <strong>the mandatory fee listed above as well as</strong> any additional hotel incidental charges such as
          parking, phone calls or minibar charges which are not included in the room rate.
        </p>
        <p style={s.otherBody}>
          Hotel Occupancy Policy: All rooms will accommodate up to 2 adults. Requests for bed types (King, Queen, 2 Doubles,
          etc.) or other special request (including preferences for smoking or non-smoking rooms) should be requested through your
          confirmed hotel and cannot be guaranteed by .
        </p>
        <p style={s.otherBody}>
          Room Charge Disclosure: Your credit card is charged the total cost at time of purchase. Prices and room availability are
          not guaranteed until full payment is received.
        </p>
        <p style={s.otherBody}>Hotel Pet Policy: Pets are allowed. Charges may apply.</p>
        <p style={s.otherBody}>
          Important Information: Room service hours are limited. Please contact property for details. A USD 50.00 security deposit
          required per night. The minimum age of check-in is 21 years old and a government issued ID is required, with no
          exceptions. The resort fee is taxable and includes: - In-room WiFi - Fitness center access - In-room local/toll-free
          calls Please note: Valet parking is available and subject to a parking fee. Please note: Public parking is available
          and subject to a parking fee.Guests are required to show a photo ID and credit card upon check-in. Please note that all
          Special Requests are subject to availability and additional charges may apply. A damage deposit of USD 150.0 is required
          at checkin. This will be collected by credit card. You should be reimbursed within 14 days of checkout via credit card,
          subject to an inspection of the property.
        </p>
      </div>

      <div style={s.otherSub}>
        <p style={s.otherSubTitle}>Check-in Instructions</p>
        <p style={s.otherBody}>
          Due to COVID-19 it is recommended that you review the local health and safety ordinances of your destination before you
          travel. As requirements and restrictions continue to change your travel may be impacted, as well as your ability to
          check-in to your reserved accommodation. Please consider checking the hotel chain global website or contacting the hotel
          directly prior to arrival for the most up-to-date information.
        </p>
      </div>
    </section>
  );
}

const icon = { display: 'block' as const, flexShrink: 0 as const };

const s: Record<string, CSSProperties> = {
  screen: {
    backgroundColor: '#ffffff',
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hairline: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  successBannerOuter: {
    width: '100%',
    boxSizing: 'border-box',
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexShrink: 0,
  },
  /** Figma `1:2127` — rgba(82,172,98,0.1), caption bold */
  successBannerInner: {
    backgroundColor: 'rgba(82, 172, 98, 0.1)',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBannerText: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  actionsBar: {
    paddingTop: 20,
    paddingBottom: 0,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  actionsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'stretch',
    width: '100%',
  },
  /** `1:2130` — border primary-dark */
  actionBtn: {
    flex: '1 0 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 34,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    border: `1px solid ${colors.borderDark}`,
    cursor: 'pointer',
  },
  actionBtnLabel: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '16px',
    color: colors.textBody,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  yourStaySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  yourStayTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 'normal',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  hotelSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  heroPair: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    height: 100,
    width: '100%',
    alignItems: 'stretch',
  },
  heroHalf: {
    flex: '1 0 0',
    minWidth: 0,
    overflow: 'hidden',
    backgroundColor: colors.hero,
  },
  heroImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  hotelCopyStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  addressRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    width: '100%',
  },
  linkUnderline: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
    textDecoration: 'underline',
  },
  vertRule: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  suiteBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    width: '100%',
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    color: colors.textPrimary,
  },
  suiteTitle: {
    margin: 0,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },
  suiteMeta: {
    margin: 0,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 'normal',
  },
  datesSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dateCol: {
    flex: '1 0 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  dateValue: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
  },
  inlineRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'center',
    width: '100%',
  },
  labelBold14: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  body14: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
    margin: 0,
  },
  confirmedOnly: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSuccess,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  cluster: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    flexShrink: 0,
  },
  /** Figma `1:2188` — teal pill */
  confirmBadge: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: '#07211e',
    margin: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#e1f2f2',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  manageHeadingStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
    width: '100%',
  },
  manageSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  sectionTitle20: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 'normal',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  refundWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
    width: '100%',
  },
  fullyRefundableTitle: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSuccess,
  },
  refundSubRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  refundBefore: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSuccess,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  policyTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  manageButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
    width: '100%',
  },
  /** `1:2224` — border primary-dark */
  borderBtnPrimary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 10,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    border: `1px solid ${colors.borderDark}`,
    cursor: 'pointer',
  },
  borderBtnLabel: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '16px',
    color: colors.textBody,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  pricingPaymentSection: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  pricePayColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'stretch',
    width: '100%',
  },
  paymentBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
    width: '100%',
  },
  footnote: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '16px',
    color: '#666666',
    margin: 0,
    width: '100%',
  },
  otherOuter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
    color: '#000000',
  },
  /** Figma `1:2287` — H5 semibold */
  additionalMainTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '28px',
    margin: 0,
    color: '#000000',
  },
  otherSub: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
    width: '100%',
    fontSize: 14,
    lineHeight: '18px',
  },
  otherSubTitle: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '18px',
    margin: 0,
  },
  otherBody: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    margin: 0,
    width: '100%',
    color: '#000000',
  },
  termsFooter: {
    width: '100%',
    boxSizing: 'border-box',
    borderTop: `1px solid ${colors.borderDark}`,
    backgroundColor: '#ffffff',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  termsLink: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 11,
    lineHeight: '16px',
    color: '#000000',
    textDecoration: 'none',
  },
};
