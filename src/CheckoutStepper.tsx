import { figmaAssets } from '@/constants/figmaAssets';
import { GUTTER } from '@/constants/layout';
import { colors, textStyles as typo } from '@/constants/typography';
import type { CSSProperties } from 'react';

export type CheckoutStepperPhase = 'review' | 'enter-details' | 'confirmation';

const stepperBase: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr) auto minmax(0, 1fr) auto',
  alignItems: 'center',
  columnGap: 4,
  paddingTop: 12,
  paddingBottom: 12,
  width: '100%',
  boxSizing: 'border-box',
  flexShrink: 0,
};

/** Pagination — Figma `1:3685` → `1:3727`: flex row, `gap: 4`, `px: 16`, `py: 12`. */
const stepperEnterDetails: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  width: '100%',
  boxSizing: 'border-box',
  flexShrink: 0,
};

const stepClusterEnterDetails: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  minWidth: 0,
};

/** Grows between steps — matches `flex-[1_0_0] min-w-px` + vertically centered stroke */
const stepConnectorSlot: CSSProperties = {
  flex: '1 0 0',
  minWidth: 0,
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
};

const stepClusterStart: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  paddingLeft: GUTTER,
  minWidth: 0,
};

const stepClusterMid: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  minWidth: 0,
};

const stepClusterEnd: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
  paddingRight: GUTTER,
  minWidth: 0,
};

const stepLineSolid: CSSProperties = {
  height: 1,
  alignSelf: 'center',
  minWidth: 0,
  width: '100%',
  backgroundColor: colors.textPrimary,
};

const stepLineDashed: CSSProperties = {
  height: 0,
  alignSelf: 'center',
  minWidth: 0,
  width: '100%',
  borderTop: `1px dashed ${colors.borderDark}`,
};

/** 1px track inside flex connector slot (Enter Details only) */
const enterDetailsTrackSolid: CSSProperties = {
  height: 1,
  width: '100%',
  backgroundColor: colors.textPrimary,
};

const enterDetailsTrackDashed: CSSProperties = {
  height: 0,
  width: '100%',
  borderTop: `1px dashed ${colors.borderDark}`,
};

const icon = { display: 'block' as const, flexShrink: 0 as const };

/**
 * Checkout progress — Review Stay: Figma `614:29523`. Enter Details: `1:3685`. Confirmation: `1:2064`.
 */
export function CheckoutStepper({ phase }: { phase: CheckoutStepperPhase }) {
  /** Done — Figma `1:2064` / Pagination `1:2107`: all steps complete, solid connectors. */
  if (phase === 'confirmation') {
    return (
      <nav style={stepperEnterDetails} aria-label="Checkout steps">
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepChooseRoomComplete} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabel}>Review</span>
        </div>
        <div style={stepConnectorSlot} aria-hidden>
          <div style={enterDetailsTrackSolid} />
        </div>
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepChooseRoomComplete} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabel}>Payment</span>
        </div>
        <div style={stepConnectorSlot} aria-hidden>
          <div style={enterDetailsTrackSolid} />
        </div>
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepChooseRoomComplete} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabel}>Done</span>
        </div>
      </nav>
    );
  }

  if (phase === 'enter-details') {
    return (
      <nav style={stepperEnterDetails} aria-label="Checkout steps">
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepChooseRoomComplete} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabel}>Review</span>
        </div>
        <div style={stepConnectorSlot} aria-hidden>
          <div style={enterDetailsTrackSolid} />
        </div>
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepCurrent} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabel}>Payment</span>
        </div>
        <div style={stepConnectorSlot} aria-hidden>
          <div style={enterDetailsTrackDashed} />
        </div>
        <div style={stepClusterEnterDetails}>
          <img src={figmaAssets.reviewStepTodo} alt="" width={14} height={14} style={icon} />
          <span style={typo.checkoutStepLabelMuted}>Done</span>
        </div>
      </nav>
    );
  }

  return (
    <nav style={stepperBase} aria-label="Checkout steps">
      <div style={stepClusterStart}>
        <img src={figmaAssets.reviewStepChooseRoomComplete} alt="" width={14} height={14} style={icon} />
        <span style={typo.checkoutStepLabel}>Choose Room</span>
      </div>
      <div style={stepLineSolid} aria-hidden />
      <div style={stepClusterMid}>
        <img src={figmaAssets.reviewStepCurrent} alt="" width={14} height={14} style={icon} />
        <span style={typo.checkoutStepLabel}>Review Stay</span>
      </div>
      <div style={stepLineDashed} aria-hidden />
      <div style={stepClusterEnd}>
        <img src={figmaAssets.reviewStepTodo} alt="" width={14} height={14} style={icon} />
        <span style={typo.checkoutStepLabelMuted}>Enter Details</span>
      </div>
    </nav>
  );
}
