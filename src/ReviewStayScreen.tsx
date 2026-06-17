import { RoomsRatesSiteHeader } from '@/components/RoomsRatesSiteHeader';
import { figmaAssets } from '@/constants/figmaAssets';
import { GUTTER } from '@/constants/layout';
import {
  FULLY_REFUNDABLE_HEADLINE,
  REFUNDABLE_CANCELLATION_DETAIL,
} from '@/constants/refundCopy';
import {
  formatReviewStayRoomDetails,
  REVIEW_STAY_TRIP,
  ROOMS_RATES_HOTEL,
  type SelectedRoomReservation,
} from '@/constants/roomsRatesData';
import { colors, textStyles as typo } from '@/constants/typography';
import { UI_INPUT_PROPS } from '@/constants/uiInputProps';
import { goToEnterDetails, type RateRefundPolicy } from '@/navigation';
import { useState, type CSSProperties } from 'react';

type ReviewStayScreenProps = {
  onContinueToDetails?: () => void;
  selectedRefundPolicy?: RateRefundPolicy;
  selectedRoom: SelectedRoomReservation;
};

export default function ReviewStayScreen({
  onContinueToDetails = goToEnterDetails,
  selectedRefundPolicy = 'non-refundable',
  selectedRoom,
}: ReviewStayScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isRefundable = selectedRefundPolicy === 'refundable';

  return (
    <main style={s.screen}>
      <div style={s.siteHeaderWrap}>
        <RoomsRatesSiteHeader />
      </div>

      <div style={s.container}>
        <div style={s.headerSection}>
          <div style={s.hero} aria-hidden>
            <div style={s.heroHalf}>
              <img
                src={figmaAssets.reviewStayHeroHotel}
                alt=""
                style={s.heroImg}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div style={s.heroHalf}>
              <img
                src={selectedRoom.image}
                alt=""
                style={s.heroImg}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div style={s.stayInfo}>
            <p style={s.hotelTitle}>{ROOMS_RATES_HOTEL.name}</p>
            <div style={s.guestInfo}>
              <p style={s.roomTitle}>{selectedRoom.title}</p>
              <div style={s.roomDetailsRow}>
                <div style={s.roomDetailWithRule}>
                  <span style={s.roomMeta}>{REVIEW_STAY_TRIP.occupancy}</span>
                </div>
                <span style={s.roomMeta}>
                  {formatReviewStayRoomDetails(selectedRoom.bedLabel, selectedRoom.viewLabel)}
                </span>
              </div>
              <p style={s.datesLine}>{REVIEW_STAY_TRIP.dates}</p>
            </div>
          </div>

          <div style={s.ruleInset} aria-hidden />

          <div style={s.policySection}>
            <div style={s.policyTitleRow}>
              <span style={isRefundable ? s.policyTitleGreen : s.policyTitle}>
                {isRefundable ? FULLY_REFUNDABLE_HEADLINE : 'Non-Refundable'}
              </span>
              <img
                src={isRefundable ? figmaAssets.iconCancellationInfo : figmaAssets.northstarNonRefundableInfo}
                alt=""
                width={14}
                height={14}
                style={{ display: 'block', flexShrink: 0 }}
              />
            </div>
            <p style={s.policyBody}>
              {isRefundable
                ? REFUNDABLE_CANCELLATION_DETAIL
                : 'This reservation is not eligible for a refund.'}
            </p>
          </div>
        </div>

        <div style={s.ruleFull} aria-hidden />

        <div style={s.detailsSection}>
          <div style={s.detailsInner}>
            <p style={s.detailsTitle}>Your Details</p>

            <form autoComplete="off" style={{ display: 'contents' }} onSubmit={(e) => e.preventDefault()}>
            <div style={s.nameFields}>
              <div style={s.formBox}>
                <div style={s.fieldLabelRow}>
                  <span style={s.fieldLabel}>Guest Name</span>
                  <span style={s.requiredStar} aria-hidden>
                    *
                  </span>
                </div>
                <input
                  type="text"
                  {...UI_INPUT_PROPS}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="review-details-input"
                  style={s.detailsInput}
                />
              </div>
              <input
                type="text"
                {...UI_INPUT_PROPS}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                aria-label="Last name"
                className="review-details-input"
                style={s.detailsInput}
              />
            </div>

            <div style={s.formBox}>
              <div style={s.fieldLabelRow}>
                <span style={s.fieldLabel}>Email Address</span>
                <span style={s.requiredStar} aria-hidden>
                  *
                </span>
              </div>
              <input
                type="text"
                {...UI_INPUT_PROPS}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="review-details-input"
                style={s.detailsInput}
              />
            </div>

            <div style={s.formBox}>
              <div style={s.fieldLabelRow}>
                <span style={s.fieldLabel}>Phone</span>
                <span style={s.requiredStar} aria-hidden>
                  *
                </span>
              </div>
              <input
                type="text"
                {...UI_INPUT_PROPS}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="review-details-input"
                style={s.detailsInput}
              />
            </div>
            </form>
          </div>
        </div>

        <div style={s.buttonWrap}>
          <button type="button" style={s.continueBtn} onClick={onContinueToDetails}>
            <span style={typo.reviewStayNext}>Continue to Payment</span>
          </button>
        </div>
      </div>
    </main>
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
  /** Figma `7:614` — site header */
  siteHeaderWrap: {
    width: '100%',
    flexShrink: 0,
  },
  /** Figma `4:6342` */
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 24,
    boxSizing: 'border-box',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  /** Figma `4:6611` — 100px hero */
  hero: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    flexShrink: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  heroHalf: {
    flex: '1 1 0',
    minWidth: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  /** Figma `4:6345` */
  stayInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  hotelTitle: {
    fontFamily: font,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '24px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  guestInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    width: '100%',
  },
  roomTitle: {
    fontFamily: font,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  roomDetailsRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '2px 8px',
    width: '100%',
  },
  roomDetailWithRule: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 18,
    paddingRight: 8,
    borderRight: `1px solid ${colors.border}`,
  },
  roomMeta: {
    fontFamily: font,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSecondary,
    whiteSpace: 'nowrap',
  },
  datesLine: {
    fontFamily: font,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSecondary,
    margin: 0,
    width: '100%',
  },
  /** Figma `4:6354` — inset divider */
  ruleInset: {
    height: 1,
    marginLeft: GUTTER,
    marginRight: GUTTER,
    backgroundColor: colors.border,
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  /** Figma `4:6355` */
  policySection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  policyTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  policyTitle: {
    fontFamily: font,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
  },
  policyTitleGreen: {
    fontFamily: font,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textSuccess,
  },
  policyBody: {
    fontFamily: font,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textSecondary,
    margin: 0,
    width: '100%',
  },
  /** Figma `4:6364` */
  ruleFull: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  /** Figma `9:1402` */
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    width: '100%',
    boxSizing: 'border-box',
  },
  detailsInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  detailsTitle: {
    fontFamily: font,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '22px',
    color: colors.textPrimary,
    margin: 0,
    width: '100%',
  },
  nameFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
    width: '100%',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
  },
  fieldLabelRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  fieldLabel: {
    fontFamily: font,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '19.2px',
    color: colors.textPrimary,
  },
  requiredStar: {
    fontFamily: font,
    fontWeight: 800,
    fontSize: 14,
    lineHeight: '16px',
    color: '#e2121a',
  },
  detailsInput: {
    width: '100%',
    height: 45,
    boxSizing: 'border-box',
    margin: 0,
    paddingLeft: 12,
    paddingRight: 12,
    border: '1px solid #e9e9ea',
    backgroundColor: '#ffffff',
    fontFamily: font,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
    borderRadius: 0,
  },
  /** Figma `4:6605` */
  buttonWrap: {
    width: '100%',
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    boxSizing: 'border-box',
  },
  continueBtn: {
    width: '100%',
    backgroundColor: colors.reserveOrange,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 24px',
    boxSizing: 'border-box',
  },
};
