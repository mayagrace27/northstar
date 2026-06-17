/** Selected rate on Rooms & Rates — drives Review Stay policy copy. */
export type RateRefundPolicy = 'refundable' | 'non-refundable';

/** Hash route for Review Stay (Figma checkout step). */
export const REVIEW_STAY_HASH = '#review-stay';

/** Enter guest & payment details — Figma `614:29615`. */
export const ENTER_DETAILS_HASH = '#enter-details';

/** Booking confirmed — Figma `614:29213`. */
export const CONFIRMATION_HASH = '#confirmation';

/** Rooms & rates (first checkout step) — default route when hash is empty. */
export function goToRoomsRates() {
  if (typeof window === 'undefined') return;
  window.location.hash = '';
}

export function goToReviewStay() {
  if (typeof window === 'undefined') return;
  window.location.hash = REVIEW_STAY_HASH;
}

export function goToEnterDetails() {
  if (typeof window === 'undefined') return;
  window.location.hash = ENTER_DETAILS_HASH;
}

export function goToConfirmation() {
  if (typeof window === 'undefined') return;
  window.location.hash = CONFIRMATION_HASH;
}
