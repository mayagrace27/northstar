import { figmaAssets } from '@/constants/figmaAssets';
import {
  FULLY_REFUNDABLE_HEADLINE,
  REFUNDABLE_CANCELLATION_DETAIL,
  REFUNDABLE_UPCHARGE,
} from '@/constants/refundCopy';
import { colors, textStyles as typo } from '@/constants/typography';
import type { RateRefundPolicy } from '@/navigation';
import { getDisplayRate, type RatePricing } from '@/utils/ratePricing';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TransitionEvent } from 'react';
import { createPortal } from 'react-dom';

const SCRIM_ON = 'rgba(0, 0, 0, 0.6)';
const SCRIM_OFF = 'rgba(0, 0, 0, 0)';
const SHEET_TRANSITION_MS = 250;

const FALLBACK_RATE: RatePricing = {
  perNight: '$89',
  totalStay: '$177',
  taxes: '+$9 taxes',
};

export type CustomizeCancellationRate = RatePricing;

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        boxSizing: 'border-box',
        border: selected ? 'none' : `1px solid ${colors.borderDark}`,
        backgroundColor: selected ? colors.reserveOrange : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {selected ? (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
          }}
        />
      ) : null}
    </div>
  );
}

export type RefundOptionsDrawerProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (policy: RateRefundPolicy) => void;
  /** Policy to restore when the sheet opens (Review Stay). Defaults to non-refundable. */
  initialPolicy?: RateRefundPolicy;
  /** Rate row pricing — omitted on Review Stay until that screen is updated. */
  rate?: CustomizeCancellationRate;
  confirmLabel?: string;
  /** When false, confirming keeps `open` true (e.g. return from Review Stay with sheet restored). */
  closeOnConfirm?: boolean;
};

/** Customize Cancellation bottom sheet — Figma `4:5593`. */
export function RefundOptionsDrawer({
  open,
  onClose,
  onConfirm,
  initialPolicy = 'non-refundable',
  rate,
  confirmLabel = 'Continue to Reserve',
  closeOnConfirm = true,
}: RefundOptionsDrawerProps) {
  const [sheetIn, setSheetIn] = useState(false);
  const [choice, setChoice] = useState<RateRefundPolicy>(initialPolicy);
  const closePendingRef = useRef(false);

  const baseRate = rate ?? FALLBACK_RATE;

  const displayRate = useMemo(
    () => getDisplayRate(baseRate, choice),
    [baseRate, choice],
  );

  useEffect(() => {
    if (open) setChoice(initialPolicy);
  }, [open, initialPolicy]);

  useEffect(() => {
    if (!open) {
      closePendingRef.current = false;
      setSheetIn(false);
      return;
    }
    closePendingRef.current = false;
    setSheetIn(false);
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSheetIn(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const finishClose = useCallback(() => {
    if (!closePendingRef.current) return;
    closePendingRef.current = false;
    onClose();
  }, [onClose]);

  const startClose = useCallback(() => {
    if (!open || closePendingRef.current) return;
    closePendingRef.current = true;
    setSheetIn(false);
  }, [open]);

  const onSheetTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== 'transform') return;
      finishClose();
    },
    [finishClose],
  );

  useEffect(() => {
    if (!closePendingRef.current || sheetIn) return;
    const t = window.setTimeout(() => finishClose(), SHEET_TRANSITION_MS + 60);
    return () => window.clearTimeout(t);
  }, [sheetIn, finishClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, startClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleConfirm = useCallback(() => {
    onConfirm(choice);
    if (closeOnConfirm) startClose();
  }, [choice, closeOnConfirm, onConfirm, startClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: sheetIn ? SCRIM_ON : SCRIM_OFF,
        transition: `background-color ${SHEET_TRANSITION_MS}ms ease-out`,
      }}
      onClick={startClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-cancellation-title"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxHeight: 'min(90vh, 100%)',
          overflowY: 'auto',
          boxSizing: 'border-box',
          transform: sheetIn ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform ${SHEET_TRANSITION_MS}ms ease-out`,
          WebkitOverflowScrolling: 'touch',
        }}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={onSheetTransitionEnd}
      >
        {/* Figma `4:5593` — column gap 16, pb 24 */}
        <div style={drawer.container}>
          {/* Figma `4:5594` header — title, options, divider, price */}
          <div style={drawer.headerSection}>
            {/* Figma `4:5595` info — p 16, gap 16 between title + each option row + divider */}
            <div style={drawer.infoBlock}>
              <div style={drawer.titleRow}>
                <h2 id="customize-cancellation-title" style={drawer.title}>
                  Customize Cancellation
                </h2>
                <button
                  type="button"
                  onClick={startClose}
                  aria-label="Close customize cancellation"
                  style={drawer.closeBtn}
                >
                  <img
                    src={figmaAssets.roomsRatesCustomizeClose}
                    alt=""
                    width={24}
                    height={24}
                    style={{ display: 'block' }}
                  />
                </button>
              </div>

              <div
                role="radiogroup"
                aria-labelledby="customize-cancellation-title"
                style={drawer.optionsGroup}
              >
                <button
                  type="button"
                  style={drawer.optionRow}
                  onClick={() => setChoice('non-refundable')}
                  aria-checked={choice === 'non-refundable'}
                  role="radio"
                >
                  <div style={drawer.optionTextCol}>
                    <p style={drawer.optionTitle}>Non-Refundable</p>
                    <p style={drawer.optionBody}>This reservation is not eligible for a refund.</p>
                  </div>
                  <div style={drawer.optionRight}>
                    <span style={drawer.price}>+$0</span>
                    <RadioDot selected={choice === 'non-refundable'} />
                  </div>
                </button>

                <div style={drawer.optionHairline} aria-hidden />

                <button
                  type="button"
                  style={drawer.optionRow}
                  onClick={() => setChoice('refundable')}
                  aria-checked={choice === 'refundable'}
                  role="radio"
                >
                  <div style={drawer.optionTextCol}>
                    <p style={drawer.optionTitleGreen}>{FULLY_REFUNDABLE_HEADLINE}</p>
                    <p style={drawer.optionBody}>{REFUNDABLE_CANCELLATION_DETAIL}</p>
                  </div>
                  <div style={drawer.optionRight}>
                    <span style={drawer.price}>+${REFUNDABLE_UPCHARGE}</span>
                    <RadioDot selected={choice === 'refundable'} />
                  </div>
                </button>
              </div>
            </div>

            {/* Figma `4:7094` — full-bleed section divider */}
            <div style={drawer.sectionHairline} aria-hidden />
          </div>

          {/* Figma `4:7064` Details — full width with 16px horizontal inset */}
          <div style={drawer.priceDetails}>
            <div style={drawer.priceInner}>
              <div style={drawer.priceCol}>
                <div style={drawer.pricePerNight}>
                  <span style={typo.priceLg}>{displayRate.perNight}</span>
                  <span style={typo.perNight}>per night</span>
                </div>
                <div style={drawer.priceTotalsBlock}>
                  <p style={typo.totalLabel}>
                    Total stay: <span style={typo.totalValue}>{displayRate.totalStay}</span>
                  </p>
                  <p style={typo.taxes}>{displayRate.taxes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Figma `4:5621` Link — 16px below price via container gap */}
          <div style={drawer.buttonWrap}>
            <button type="button" style={drawer.confirmBtn} onClick={handleConfirm}>
              <span style={typo.customizeReserve}>{confirmLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const drawer: Record<string, CSSProperties> = {
  /** Figma `4:5593` */
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
    paddingBottom: 24,
    width: '100%',
    boxSizing: 'border-box',
  },
  /** Figma `4:5594` */
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  /** Figma `4:5595` */
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '24px',
    color: colors.textPrimary,
    margin: 0,
    whiteSpace: 'nowrap',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    width: 24,
    height: 24,
  },
  /** Title + option rows + divider — all gap 16 siblings in Figma */
  optionsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
  /** Figma `4:5602` / `4:5611` */
  optionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  optionTextCol: {
    flex: '1 0 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  optionTitle: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
  },
  optionTitleGreen: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSuccess,
  },
  optionBody: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textSecondary,
  },
  optionRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  price: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
  },
  /** Figma `4:5610` — inset divider between options */
  optionHairline: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  /** Figma `4:7094` — full-bleed divider above price */
  sectionHairline: {
    height: 1,
    width: '100%',
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  /** Figma `4:7064` — full width, 16px horizontal inset (matches button row) */
  priceDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  /** Figma `4:7072` */
  priceInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2,
    width: '100%',
    boxSizing: 'border-box',
  },
  priceCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
    textAlign: 'right',
  },
  pricePerNight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceTotalsBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  /** Figma `4:5621` */
  buttonWrap: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    boxSizing: 'border-box',
  },
  confirmBtn: {
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
