import ConfirmationScreen from '@/ConfirmationScreen';
import type { RateRefundPolicy } from '@/navigation';
import { preloadConfirmationAssets } from '@/preloadConfirmationAssets';
import { useLayoutEffect, useState, type CSSProperties } from 'react';

const hold: CSSProperties = {
  flex: '0 0 auto',
  width: '100%',
  minHeight: '40vh',
  backgroundColor: '#ffffff',
};

export type ConfirmationRouteProps = {
  refundPolicy: RateRefundPolicy;
};

/** Waits for confirmation icons to be cached before mounting the screen (avoids icon blink). */
export default function ConfirmationRoute({ refundPolicy }: ConfirmationRouteProps) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    let cancel = false;
    preloadConfirmationAssets().then(() => {
      if (!cancel) setReady(true);
    });
    return () => {
      cancel = true;
    };
  }, []);

  if (!ready) {
    return <div style={hold} aria-busy="true" />;
  }

  return <ConfirmationScreen refundPolicy={refundPolicy} />;
}
