import { figmaAssets } from '@/constants/figmaAssets';
import type { HotelFaqItem } from '@/constants/hotelAboutData';
import { colors, textStyles as typo } from '@/constants/typography';
import { useState, type CSSProperties } from 'react';

function FaqItem({ item }: { item: HotelFaqItem }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false);

  return (
    <div style={s.faqCard}>
      <button type="button" style={s.faqHeader} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span style={s.faqQuestion}>{item.question}</span>
        <img
          src={open ? figmaAssets.roomsRatesFaqChevronUp : figmaAssets.roomsRatesFaqChevronDown}
          alt=""
          width={12}
          height={7}
          style={{ display: 'block', flexShrink: 0 }}
        />
      </button>
      {open && item.answer ? (
        <div style={s.faqBody}>
          <p style={typo.bodyTight}>{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}

/** FAQ accordion — Figma `18:8120` */
export function HotelFaqSection({ items }: { items: HotelFaqItem[] }) {
  return (
    <section style={s.section} aria-label="Frequently asked questions">
      <h2 style={typo.pageTitle}>Frequently Asked Questions</h2>
      <div style={s.accordion}>
        {items.map((item, i) => (
          <FaqItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  faqCard: {
    backgroundColor: '#fff',
    borderBottom: `1px solid ${colors.faqBorder}`,
    width: '100%',
  },
  faqHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    padding: '20px 0',
    paddingRight: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  faqQuestion: {
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px',
    color: colors.textPrimary,
    margin: 0,
    flex: 1,
    minWidth: 0,
    paddingRight: 28,
  },
  faqBody: {
    paddingBottom: 20,
    width: '100%',
  },
};
