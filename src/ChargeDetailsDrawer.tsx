import { PriceSummaryContent } from '@/PriceSummaryContent';
import { GUTTER } from '@/constants/layout';
import { colors, textStyles as typo } from '@/constants/typography';
import { useCallback, useEffect, useRef, useState, type TransitionEvent } from 'react';
import { createPortal } from 'react-dom';

const SCRIM_ON = 'rgba(0, 0, 0, 0.6)';
const SCRIM_OFF = 'rgba(0, 0, 0, 0)';
const SHEET_TRANSITION_MS = 250;

function CloseIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden style={{ display: 'block' }}>
      <path
        d="M18 6L6 18M6 6l12 12"
        fill="none"
        stroke={colors.textPrimary}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

import type { PriceSummaryBreakdown } from '@/utils/ratePricing';

type ChargeDetailsDrawerProps = {
  open: boolean;
  onClose: () => void;
  breakdown: PriceSummaryBreakdown;
};

/** Bottom sheet: “Price Summary” header + breakdown — Figma `614:29444`. */
export function ChargeDetailsDrawer({ open, onClose, breakdown }: ChargeDetailsDrawerProps) {
  const [sheetIn, setSheetIn] = useState(false);
  const closePendingRef = useRef(false);

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
        aria-labelledby="charge-price-summary-drawer-title"
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
        <header
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: GUTTER,
            paddingRight: GUTTER,
            paddingTop: 16,
            paddingBottom: 16,
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: '#fff',
          }}
        >
          <h2 id="charge-price-summary-drawer-title" style={{ ...typo.hotelInfoName, margin: 0 }}>
            Price Summary
          </h2>
          <button
            type="button"
            onClick={startClose}
            aria-label="Close price summary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              margin: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <CloseIcon />
          </button>
        </header>
        <div
          style={{
            paddingLeft: GUTTER,
            paddingRight: GUTTER,
            paddingTop: 20,
            paddingBottom: 28,
          }}
        >
          <PriceSummaryContent breakdown={breakdown} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
