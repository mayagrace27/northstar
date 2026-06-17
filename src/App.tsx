import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import EnterDetailsScreen from './EnterDetailsScreen';
import ReviewStayScreen from './ReviewStayScreen';
import RoomsRatesScreen from './RoomsRatesScreen';
import {
  CONFIRMATION_HASH,
  ENTER_DETAILS_HASH,
  REVIEW_STAY_HASH,
  type RateRefundPolicy,
  goToEnterDetails,
  goToReviewStay,
  goToRoomsRates,
} from './navigation';
import {
  ROOM_CARDS,
  type RoomCardData,
  type RoomRate,
  type SelectedRoomReservation,
} from './constants/roomsRatesData';
import { preloadImage } from './utils/preloadImage';
import { type RatePricing } from './utils/ratePricing';

const mainWrap = {
  display: 'flex',
  flexDirection: 'column' as const,
  width: '100%',
  flex: '0 0 auto',
};

const DEFAULT_SELECTED_ROOM: SelectedRoomReservation = {
  id: ROOM_CARDS[1].id,
  title: ROOM_CARDS[1].title,
  image: ROOM_CARDS[1].image,
  bedLabel: ROOM_CARDS[1].bedLabel,
  viewLabel: ROOM_CARDS[1].viewLabel,
};

const DEFAULT_SELECTED_RATE: RatePricing = {
  perNight: ROOM_CARDS[1].rates[0].perNight,
  totalStay: ROOM_CARDS[1].rates[0].totalStay,
  taxes: ROOM_CARDS[1].rates[0].taxes,
};

function isRoomsRatesHash(hash: string) {
  return hash !== REVIEW_STAY_HASH && hash !== ENTER_DETAILS_HASH && hash !== CONFIRMATION_HASH;
}

export default function App() {
  const shellRef = useRef<HTMLDivElement>(null);
  const prevHashRef = useRef<string | null>(null);
  const roomsScrollRef = useRef(0);
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  const hashRef = useRef(hash);
  hashRef.current = hash;
  const [selectedRefundPolicy, setSelectedRefundPolicy] = useState<RateRefundPolicy>('non-refundable');
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomReservation>(DEFAULT_SELECTED_ROOM);
  const [selectedRate, setSelectedRate] = useState<RatePricing>(DEFAULT_SELECTED_RATE);
  const [customizeDrawerOpen, setCustomizeDrawerOpen] = useState(false);
  const [pendingRoom, setPendingRoom] = useState<RoomCardData | null>(null);
  const [pendingRate, setPendingRate] = useState<RoomRate | null>(null);

  const openCustomizeDrawer = useCallback((room: RoomCardData, rate: RoomRate) => {
    preloadImage(room.image);
    setPendingRoom(room);
    setPendingRate(rate);
    setCustomizeDrawerOpen(true);
  }, []);

  const closeCustomizeDrawer = useCallback(() => {
    setCustomizeDrawerOpen(false);
  }, []);

  const saveRoomsScroll = useCallback(() => {
    const shell = shellRef.current;
    if (shell) roomsScrollRef.current = shell.scrollTop;
  }, []);

  useEffect(() => {
    const sync = () => {
      const nextHash = window.location.hash;
      const currentHash = hashRef.current;
      if (isRoomsRatesHash(currentHash) && !isRoomsRatesHash(nextHash)) {
        saveRoomsScroll();
      }
      setHash(nextHash);
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [saveRoomsScroll]);

  /** Scroll container is `.app-shell`. Restore Rooms scroll when returning from checkout. */
  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const prevHash = prevHashRef.current;
    prevHashRef.current = hash;

    if (prevHash === null) {
      shell.scrollTo(0, 0);
      return;
    }

    const wasRooms = isRoomsRatesHash(prevHash);
    const isRooms = isRoomsRatesHash(hash);

    if (wasRooms && !isRooms) {
      shell.scrollTo(0, 0);
      return;
    }

    if (!wasRooms && isRooms) {
      const top = roomsScrollRef.current;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          shell.scrollTo(0, top);
        });
      });
      return;
    }

    shell.scrollTo(0, 0);
  }, [hash]);

  /** Confirmation is hidden for now — keep users on payment if hash is stale. */
  useEffect(() => {
    if (hash !== CONFIRMATION_HASH) return;
    goToEnterDetails();
    setHash(ENTER_DETAILS_HASH);
  }, [hash]);

  const navigateToReviewStay = useCallback(
    (policy: RateRefundPolicy, room: SelectedRoomReservation, rate: RatePricing) => {
      saveRoomsScroll();
      preloadImage(room.image);
      setSelectedRefundPolicy(policy);
      setSelectedRoom(room);
      setSelectedRate(rate);
      goToReviewStay();
      setHash(REVIEW_STAY_HASH);
    },
    [saveRoomsScroll],
  );

  const navigateToEnterDetails = useCallback(() => {
    goToEnterDetails();
    setHash(ENTER_DETAILS_HASH);
  }, []);

  const isReviewStay = hash === REVIEW_STAY_HASH;
  const isEnterDetails = hash === ENTER_DETAILS_HASH;
  const isRoomsRates = isRoomsRatesHash(hash);

  const navigateToRoomsRates = useCallback(() => {
    goToRoomsRates();
    setHash('');
  }, []);

  return (
    <div className="app-shell" ref={shellRef}>
      {!isRoomsRates && !isReviewStay && !isEnterDetails ? (
        <CheckoutHeader onLogoClick={navigateToRoomsRates} />
      ) : null}
      {isEnterDetails ? (
        <div style={mainWrap}>
          <EnterDetailsScreen
            selectedRate={selectedRate}
            selectedRefundPolicy={selectedRefundPolicy}
          />
        </div>
      ) : isReviewStay ? (
        <div style={mainWrap}>
          <ReviewStayScreen
            onContinueToDetails={navigateToEnterDetails}
            selectedRefundPolicy={selectedRefundPolicy}
            selectedRoom={selectedRoom}
          />
        </div>
      ) : (
        <div style={mainWrap}>
          <RoomsRatesScreen
            onContinueToReview={navigateToReviewStay}
            customizeDrawerOpen={customizeDrawerOpen}
            pendingRoom={pendingRoom}
            pendingRate={pendingRate}
            initialRefundPolicy={selectedRefundPolicy}
            onOpenCustomizeDrawer={openCustomizeDrawer}
            onCloseCustomizeDrawer={closeCustomizeDrawer}
          />
        </div>
      )}
    </div>
  );
}
