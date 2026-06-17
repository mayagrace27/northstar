import { figmaAssets } from '@/constants/figmaAssets';
import { colors, textStyles as typo } from '@/constants/typography';
import type { CSSProperties } from 'react';
import type { PriceSummaryBreakdown } from '@/utils/ratePricing';
import { formatUsd, formatRoomsNightsLabel } from '@/utils/ratePricing';

/** Confirmation page — Figma `1:2064` / `1:2252`. */
const CONFIRMATION_CHARGED = 241.15;
const CONFIRMATION_RESORT = 68.02;

function formatUsdConfirmation(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const GREY_MAIN = '#1f1f1f';
const GREY_MUTED = '#404040';

const icon = { display: 'block' as const, flexShrink: 0 as const };

export type PriceSummaryContentProps = {
  /** Confirmation shows past tense; Review drawer uses default “You Pay Today”. */
  paidRowLabel?: string;
  /** Slim summary on confirmation — Figma `1:2252`. */
  variant?: 'default' | 'confirmation';
  /** Checkout drawer — derived from selected room rate + cancellation policy. */
  breakdown?: PriceSummaryBreakdown;
};

/** Price breakdown rows — Figma `614:29444` (drawer); `1:2252` (confirmation). */
export function PriceSummaryContent({
  paidRowLabel = 'You Pay Today:',
  variant = 'default',
  breakdown,
}: PriceSummaryContentProps = {}) {
  if (variant === 'confirmation') {
    return (
      <div style={p.confirmationColumn}>
        <div style={p.confirmationHeaderRow}>
          <h3 style={p.confirmationTitle}>Price Summary</h3>
          <button type="button" style={{ ...typo.enterDetailsLink, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Details
          </button>
        </div>
        <div style={p.row14}>
          <p style={p.cellLeft14}>Total Charged:</p>
          <p style={p.cellRight14}>{formatUsdConfirmation(CONFIRMATION_CHARGED)}</p>
        </div>
        <div style={p.resortBlock}>
          <div style={p.row14Between}>
            <p style={p.cellLeft14}>Resort fee:</p>
            <p style={p.cellRight14}>{formatUsdConfirmation(CONFIRMATION_RESORT)}</p>
          </div>
          <div style={p.hintRow}>
            <span style={p.hint}>Due at check-in</span>
            <img src={figmaAssets.priceSummaryInfoIcon} alt="" width={16} height={16} style={icon} />
          </div>
        </div>
      </div>
    );
  }

  if (!breakdown) return null;

  const row16: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  };
  const row16Flush: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  };
  const cellLeft: CSSProperties = {
    flex: '1 0 0',
    minWidth: 0,
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.2,
    color: GREY_MAIN,
  };
  const cellRight: CSSProperties = {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.2,
    color: GREY_MAIN,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  return (
    <div style={p.column}>
      <div style={p.borderedBlock}>
        <div style={p.subtotalStack}>
          <div style={row16Flush}>
            <p style={cellLeft}>
              {formatRoomsNightsLabel(breakdown.roomCount, breakdown.nightCount)}
            </p>
            <p style={cellRight}>{formatUsd(breakdown.roomSubtotal)}</p>
          </div>
          <div style={p.hintRow}>
            <span style={p.hint}>Avg nightly rate {formatUsd(breakdown.avgNightlyRate)}</span>
            <img src={figmaAssets.priceSummaryInfoIcon} alt="" width={16} height={16} style={icon} />
          </div>
        </div>
        <div style={row16}>
          <p style={cellLeft}>Taxes and fees:</p>
          <p style={cellRight}>{formatUsd(breakdown.taxesAndFees)}</p>
        </div>
      </div>

      <div style={p.paidBlock}>
        <div style={row16}>
          <p style={{ ...cellLeft, fontWeight: 600 }}>{paidRowLabel}</p>
          <p style={{ ...cellRight, fontWeight: 600 }}>{formatUsd(breakdown.payToday)}</p>
        </div>
        <div style={p.subtotalStack}>
          <div style={row16Flush}>
            <p style={cellLeft}>Resort fee:</p>
            <p style={cellRight}>{formatUsd(breakdown.resortFee)}</p>
          </div>
          <div style={p.hintRow}>
            <span style={p.hint}>Due at check-in</span>
            <img src={figmaAssets.priceSummaryInfoIcon} alt="" width={16} height={16} style={icon} />
          </div>
        </div>
      </div>

      <div style={{ ...row16, minHeight: 19 }}>
        <p style={cellLeft}>Total:</p>
        <p style={cellRight}>{formatUsd(breakdown.total)}</p>
      </div>
    </div>
  );
}

const p: Record<string, CSSProperties> = {
  confirmationColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'flex-start',
    width: '100%',
  },
  confirmationHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  confirmationTitle: {
    flex: '1 0 0',
    minWidth: 0,
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 'normal',
    color: colors.textPrimary,
  },
  row14: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
  },
  row14Between: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: 14,
    lineHeight: '18px',
    color: GREY_MAIN,
  },
  cellLeft14: {
    flex: '1 0 0',
    minWidth: 0,
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: colors.textPrimary,
  },
  cellRight14: {
    margin: 0,
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '18px',
    color: GREY_MAIN,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  resortBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'stretch',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  borderedBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 16,
    borderBottom: `1px solid ${colors.border}`,
    boxSizing: 'border-box',
  },
  subtotalStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-end',
    width: '100%',
  },
  hintRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    width: '100%',
  },
  hint: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.2,
    color: GREY_MUTED,
    whiteSpace: 'nowrap',
  },
  paidBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
};
