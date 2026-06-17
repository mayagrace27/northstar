import { TRIP_REFUND_DEADLINE } from './roomsRatesData';

/**
 * Cancellation modal copy — Figma `4:5593` (Rooms & Rates customize flow).
 */
export const REFUND_DEADLINE_LINE = TRIP_REFUND_DEADLINE.short;

export const FULLY_REFUNDABLE_HEADLINE = `Fully Refundable ${REFUND_DEADLINE_LINE}`;

export const REFUNDABLE_CANCELLATION_DETAIL =
  `Cancel before ${TRIP_REFUND_DEADLINE.long} at 11:59 PM PST (hotel local time) to get a full refund.`;

/** Added to total stay when Fully Refundable is selected — Figma `4:5616`. */
export const REFUNDABLE_UPCHARGE = 30;
