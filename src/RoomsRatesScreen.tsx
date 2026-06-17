import { RoomCard } from '@/components/RoomCard';
import { EmailPromoBanner } from '@/components/EmailPromoBanner';
import { RoomsRatesSiteHeader } from '@/components/RoomsRatesSiteHeader';
import { RoomsRatesHeroCarousel } from '@/components/RoomsRatesHeroCarousel';
import { RoomsRatesHotelTitle } from '@/components/RoomsRatesHotelTitle';
import { RoomsRatesQuickLinksMenu } from '@/components/RoomsRatesQuickLinksMenu';
import { HotelAboutSection } from '@/components/HotelAboutSection';
import { figmaAssets } from '@/constants/figmaAssets';
import { GUTTER } from '@/constants/layout';
import {
  ROOMS_RATES_FILTERS,
  ROOMS_RATES_TRIP,
  ROOM_CARDS,
  type RoomCardData,
  type RoomRate,
  type SelectedRoomReservation,
} from '@/constants/roomsRatesData';
import { colors, textStyles as typo } from '@/constants/typography';
import { goToReviewStay, type RateRefundPolicy } from '@/navigation';
import { RefundOptionsDrawer } from '@/RefundOptionsDrawer';
import type { RatePricing } from '@/utils/ratePricing';
import { useCallback, type CSSProperties } from 'react';

type RoomsRatesScreenProps = {
  onContinueToReview?: (
    policy: RateRefundPolicy,
    room: SelectedRoomReservation,
    rate: RatePricing,
  ) => void;
  customizeDrawerOpen: boolean;
  pendingRoom: RoomCardData | null;
  pendingRate: RoomRate | null;
  initialRefundPolicy: RateRefundPolicy;
  onOpenCustomizeDrawer: (room: RoomCardData, rate: RoomRate) => void;
  onCloseCustomizeDrawer: () => void;
};

/** Rooms & Rates — Figma `EHKhCUbidTSv4OsOTiWmrq` / `18:7651` */
export default function RoomsRatesScreen({
  onContinueToReview,
  customizeDrawerOpen,
  pendingRoom,
  pendingRate,
  initialRefundPolicy,
  onOpenCustomizeDrawer,
  onCloseCustomizeDrawer,
}: RoomsRatesScreenProps) {
  const continueToReview =
    onContinueToReview ??
    ((_p: RateRefundPolicy, _r: SelectedRoomReservation, _rate: RatePricing) => goToReviewStay());

  const handleContinueToReserve = useCallback(
    (policy: RateRefundPolicy) => {
      if (!pendingRoom || !pendingRate) return;
      continueToReview(
        policy,
        {
          id: pendingRoom.id,
          title: pendingRoom.title,
          image: pendingRoom.image,
          bedLabel: pendingRoom.bedLabel,
          viewLabel: pendingRoom.viewLabel,
        },
        {
          perNight: pendingRate.perNight,
          totalStay: pendingRate.totalStay,
          taxes: pendingRate.taxes,
        },
      );
    },
    [continueToReview, pendingRoom, pendingRate],
  );

  return (
    <main style={s.screen}>
      <RefundOptionsDrawer
        open={customizeDrawerOpen}
        onClose={onCloseCustomizeDrawer}
        onConfirm={handleContinueToReserve}
        initialPolicy={initialRefundPolicy}
        closeOnConfirm={false}
        rate={
          pendingRate
            ? {
                perNight: pendingRate.perNight,
                totalStay: pendingRate.totalStay,
                taxes: pendingRate.taxes,
              }
            : undefined
        }
      />
      <RoomsRatesSiteHeader />
      <RoomsRatesHeroCarousel />
      <RoomsRatesHotelTitle />
      <RoomsRatesQuickLinksMenu />
      <EmailPromoBanner />
      <div style={s.container}>
        <section style={s.disclaimer} aria-label="Disclaimer">
          <p style={typo.roomsRatesDisclaimer}>
            Guest Reservations™ is an independent travel network.
          </p>
          <button type="button" style={typo.roomsRatesDisclaimerLink}>
            Learn more
          </button>
        </section>

        <section style={s.mainSection} aria-label="Rooms and rates">
          <header style={s.pageHeader}>
            <div style={s.titleRow}>
              <h1 style={typo.roomsRatesTitle}>Rooms &amp; Rates</h1>
              <div style={s.currencyWrap}>
                <button type="button" style={s.currencyBtn} aria-label="Currency selector">
                  <span style={typo.currencySelector}>$ USD</span>
                  <img
                    src={figmaAssets.roomsRatesCurrencyChevron}
                    alt=""
                    width={11}
                    height={11}
                    style={{ display: 'block', flexShrink: 0 }}
                  />
                </button>
              </div>
            </div>

            <div style={s.tripSummary}>
              <p style={typo.tripSummaryInline}>
                <span style={typo.tripSummaryInlineBold}>Your trip summary</span>
                {`: ${ROOMS_RATES_TRIP.dates}`}
              </p>
              <p style={typo.tripSummaryInline}>{ROOMS_RATES_TRIP.occupancy}</p>
              <button type="button" style={s.changeDatesBtn}>
                Change dates
              </button>
            </div>
          </header>

          <div style={s.filterRow} className="hideHorizontalScrollbar">
            {ROOMS_RATES_FILTERS.map((label, i) => (
              <div
                key={label}
                style={
                  i === 0
                    ? { ...s.filterPill, ...s.filterPillActive }
                    : { ...s.filterPill, ...s.filterPillOutline }
                }
              >
                <span style={i === 0 ? typo.filterPillActiveDark : typo.pill}>{label}</span>
              </div>
            ))}
          </div>

          <div style={s.listSection}>
            {ROOM_CARDS.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                onReserve={onOpenCustomizeDrawer}
                priority={index === 0}
              />
            ))}
          </div>

          <HotelAboutSection />
        </section>
      </div>
    </main>
  );
}

const s: Record<string, CSSProperties> = {
  screen: {
    backgroundColor: '#fff',
    width: '100%',
    minWidth: 0,
  },
  container: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    paddingTop: 24,
    paddingBottom: 32,
    paddingLeft: GUTTER,
    paddingRight: GUTTER,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  disclaimer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    alignItems: 'stretch',
  },
  pageHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  currencyWrap: {
    flexShrink: 0,
  },
  currencyBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    border: `1px solid ${colors.placeholder}`,
    backgroundColor: '#fff',
    padding: '6px 9px 6px 9px',
    cursor: 'pointer',
  },
  tripSummary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    width: '100%',
  },
  changeDatesBtn: {
    ...typo.tripSummaryLinkNorthstar,
    marginTop: 0,
    padding: 1,
  },
  filterRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    overflowX: 'auto',
    flexWrap: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    width: '100%',
  },
  filterPill: {
    borderRadius: 25,
    padding: '6px 16px',
    flexShrink: 0,
  },
  filterPillActive: {
    backgroundColor: colors.surfaceTertiaryTeal,
    border: `1px solid ${colors.filterTealDark}`,
  },
  filterPillOutline: {
    backgroundColor: '#fff',
    border: `1px solid ${colors.borderDark}`,
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
  },
};
