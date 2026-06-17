import { figmaAssets } from '@/constants/figmaAssets';

/** Remote icons on confirmation (page 4) — preload before showing the screen to avoid pop-in. */
const CONFIRMATION_ICON_URLS: readonly string[] = [
  figmaAssets.confirmationEmailIcon,
  figmaAssets.confirmationPrintIcon,
  figmaAssets.confirmationConfirmedIcon,
  figmaAssets.confirmationCopyIcon,
  figmaAssets.confirmationModifyTripIcon,
  figmaAssets.confirmationCancelTripIcon,
  figmaAssets.priceSummaryInfoIcon,
];

function preloadOne(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function preloadConfirmationAssets(): Promise<void> {
  return Promise.all(CONFIRMATION_ICON_URLS.map(preloadOne)).then(() => undefined);
}
