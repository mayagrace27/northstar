import { figmaAssets } from '@/constants/figmaAssets';
import type { RoomAmenityKey, RoomCardData, RoomRate } from '@/constants/roomsRatesData';
import { colors, textStyles as typo } from '@/constants/typography';
import type { CSSProperties } from 'react';

const VIEW_ICONS = {
  pool: figmaAssets.roomsRatesPoolViewIcon,
  strip: figmaAssets.roomsRatesStripViewIcon,
} as const;

const AMENITY_ICONS: Record<RoomAmenityKey, string> = {
  wifi: figmaAssets.northstarAmenityWifi,
  breakfast: figmaAssets.northstarAmenityBreakfast,
};

const hairline: CSSProperties = {
  height: 1,
  backgroundColor: colors.border,
  width: '100%',
};

function AmenityRow({ amenityKey, label }: { amenityKey: RoomAmenityKey; label: string }) {
  return (
    <div style={s.amenityRow}>
      <img src={AMENITY_ICONS[amenityKey]} alt="" width={18} height={18} style={{ display: 'block' }} />
      <span style={typo.amenity}>{label}</span>
    </div>
  );
}

function PriceBlock({ rate }: { rate: RoomRate }) {
  return (
    <div style={s.priceCol}>
      <div style={s.pricePerNight}>
        <span style={typo.priceLg}>{rate.perNight}</span>
        <span style={typo.perNight}>per night</span>
      </div>
      <div style={s.priceTotalsBlock}>
        <p style={typo.totalLabel}>
          Total stay: <span style={typo.totalValue}>{rate.totalStay}</span>
        </p>
        <p style={typo.taxes}>{rate.taxes}</p>
      </div>
    </div>
  );
}

function RateBlock({
  room,
  rate,
  onReserve,
  showDivider,
}: {
  room: RoomCardData;
  rate: RoomRate;
  onReserve: (room: RoomCardData, rate: RoomRate) => void;
  showDivider: boolean;
}) {
  return (
    <div style={s.rateBlock}>
      {rate.bestValue ? (
        <div style={s.bestValueTag}>
          <img src={figmaAssets.roomsRatesAwardStar} alt="" width={16} height={16} style={{ display: 'block' }} />
          <span style={typo.bestValueTag}>best value</span>
        </div>
      ) : null}
      <div style={s.rateContent}>
        <div style={s.amenityStack}>
          {rate.amenities.map((a) => (
            <AmenityRow key={a.label} amenityKey={a.key} label={a.label} />
          ))}
        </div>
        <PriceBlock rate={rate} />
      </div>
      <div style={s.ctaBlock}>
        <div style={s.ctaRow}>
          <button type="button" style={s.customizeBtn} onClick={() => onReserve(room, rate)}>
            <span style={typo.customizeReserve}>Customize and Reserve</span>
          </button>
        </div>
        <p style={typo.cancellationHint}>Cancellation options available</p>
      </div>
      {showDivider ? <div style={hairline} /> : null}
    </div>
  );
}

export function RoomCard({
  room,
  onReserve,
  priority = false,
}: {
  room: RoomCardData;
  onReserve: (room: RoomCardData, rate: RoomRate) => void;
  priority?: boolean;
}) {
  return (
    <article style={s.card}>
      <div style={s.hero}>
        <img
          src={room.image}
          alt=""
          style={s.heroImg}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        {room.mostPopular ? (
          <div style={s.mostPopular}>
            <span style={typo.mostPopularTag}>Most popular</span>
          </div>
        ) : null}
        <div style={s.imageCountBadge}>
          <img src={figmaAssets.galleryIcon} alt="" width={16} height={16} style={{ display: 'block' }} />
          <span style={typo.imageCount}>5</span>
        </div>
      </div>

      <div style={s.roomInfo}>
        <div style={s.roomDetails}>
          <p style={typo.roomTitle}>{room.title}</p>
          <div style={s.beddingRow}>
            <div style={s.detailItem}>
              <img src={figmaAssets.roomsRatesBedIcon} alt="" width={18} height={18} style={{ display: 'block' }} />
              <span style={typo.detailSemi}>{room.bedLabel}</span>
            </div>
            {room.viewLabel ? (
              <>
                <div style={s.vertRule} aria-hidden />
                <div style={s.detailItem}>
                  <img
                    src={VIEW_ICONS[room.viewIcon ?? 'pool']}
                    alt=""
                    width={18}
                    height={18}
                    style={{ display: 'block' }}
                  />
                  <span style={typo.detailSemi}>{room.viewLabel}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <button type="button" style={s.detailsBtn}>
          <span style={typo.btnSm}>View Amenities and Details</span>
          <img src={figmaAssets.roomsRatesArrowRight} alt="" width={12} height={12} style={{ display: 'block' }} />
        </button>
        <div style={hairline} />
      </div>

      {room.rates.map((rate, i) => (
        <RateBlock
          key={i}
          room={room}
          rate={rate}
          onReserve={onReserve}
          showDivider={i < room.rates.length - 1}
        />
      ))}
    </article>
  );
}

const s: Record<string, CSSProperties> = {
  card: {
    border: `1px solid ${colors.border}`,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: 192,
    overflow: 'hidden',
    backgroundColor: colors.placeholder,
  },
  heroImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  mostPopular: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.tagOverlay,
    padding: '4px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCountBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.tagOverlay,
    padding: '8px 12px',
  },
  roomInfo: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    position: 'relative',
  },
  roomDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
  },
  beddingRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vertRule: {
    width: 1,
    height: 19,
    backgroundColor: colors.border,
    flexShrink: 0,
  },
  detailsBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.detailsButtonBg,
    padding: '6px 12px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  rateBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '16px 16px 12px',
    position: 'relative',
    paddingBottom: 12,
  },
  bestValueTag: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.rateTagTealBg,
    padding: '2px 6px 2px 4px',
  },
  rateContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
    padding: '2px 0 2px 2px',
  },
  amenityStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingLeft: 4,
    flex: 1,
    minWidth: 0,
  },
  amenityRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  pricePerNight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  priceTotalsBlock: {
    textAlign: 'right',
  },
  ctaBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
    alignItems: 'flex-end',
  },
  ctaRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: 34,
  },
  customizeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    backgroundColor: colors.reserveOrange,
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    boxSizing: 'border-box',
  },
};
