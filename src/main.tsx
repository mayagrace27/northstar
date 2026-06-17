import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import heroUrl from './assets/bundled/rooms-rates/hero-caesars.webp?url';
import roomStandardUrl from './assets/bundled/rooms-rates/room-standard.webp?url';
import reviewStayHeroUrl from './assets/bundled/review-stay-hero-hotel.webp?url';
import { preloadImage } from './utils/preloadImage';

/** Above-the-fold photos — start before React paints. */
preloadImage(heroUrl, true);
preloadImage(roomStandardUrl);
preloadImage(reviewStayHeroUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
