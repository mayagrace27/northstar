import { REFUNDABLE_UPCHARGE } from '@/constants/refundCopy';
import type { RateRefundPolicy } from '@/navigation';

export type RatePricing = {
  perNight: string;
  totalStay: string;
  taxes: string;
};

export function parseDollars(value: string): number {
  const n = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export function parseTaxes(value: string): number {
  return parseDollars(value);
}

export function formatDollars(amount: number): string {
  return `$${amount}`;
}

export function formatTaxes(amount: number): string {
  return `+$${amount} taxes`;
}

function inferNights(perNight: number, totalStay: number): number {
  if (perNight <= 0) return 1;
  return Math.max(1, Math.round(totalStay / perNight));
}

export const RESORT_FEE = 65.5;

export type PriceSummaryBreakdown = {
  roomCount: number;
  nightCount: number;
  roomSubtotal: number;
  avgNightlyRate: number;
  taxesAndFees: number;
  payToday: number;
  resortFee: number;
  total: number;
};

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export function formatRoomsNightsLabel(roomCount: number, nightCount: number): string {
  const rooms = `${roomCount} room${roomCount === 1 ? '' : 's'}`;
  const nights = `${nightCount} night${nightCount === 1 ? '' : 's'}`;
  return `${rooms} x ${nights}:`;
}

/** Line items for Price Summary — matches room card + payment total. */
export function buildPriceSummary(
  rate: RatePricing,
  policy: RateRefundPolicy,
  roomCount = 1,
  nightCount = 1,
  resortFee = RESORT_FEE,
): PriceSummaryBreakdown {
  const display = getDisplayRate(rate, policy);
  const roomSubtotal = parseDollars(display.totalStay);
  const taxesAndFees = parseTaxes(display.taxes);
  const avgNightlyRate = parseDollars(display.perNight);
  const payToday = roomSubtotal + taxesAndFees;

  return {
    roomCount,
    nightCount,
    roomSubtotal,
    avgNightlyRate,
    taxesAndFees,
    payToday,
    resortFee,
    total: payToday + resortFee,
  };
}

export function applyRefundableUpcharge(rate: RatePricing): RatePricing {
  const perNight = parseDollars(rate.perNight);
  const totalStay = parseDollars(rate.totalStay);
  const taxes = parseTaxes(rate.taxes);

  const taxShare =
    totalStay + taxes > 0 ? Math.round(REFUNDABLE_UPCHARGE * (taxes / (totalStay + taxes))) : 0;
  const roomShare = REFUNDABLE_UPCHARGE - taxShare;
  const nights = inferNights(perNight, totalStay);
  const perNightUp = Math.round(roomShare / nights);

  return {
    perNight: formatDollars(perNight + perNightUp),
    totalStay: formatDollars(totalStay + roomShare),
    taxes: formatTaxes(taxes + taxShare),
  };
}

export function getDisplayRate(rate: RatePricing, policy: RateRefundPolicy): RatePricing {
  if (policy === 'refundable') return applyRefundableUpcharge(rate);
  return rate;
}

/** Total stay + taxes after cancellation policy adjustments. */
export function computeTotalCharges(rate: RatePricing, policy: RateRefundPolicy): number {
  const display = getDisplayRate(rate, policy);
  return parseDollars(display.totalStay) + parseTaxes(display.taxes);
}

export function formatTotalCharges(rate: RatePricing, policy: RateRefundPolicy): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    computeTotalCharges(rate, policy),
  );
}
