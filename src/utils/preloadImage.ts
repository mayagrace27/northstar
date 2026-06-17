/** Hint the browser to fetch an image before it appears in the DOM. */
export function preloadImage(href: string, highPriority = false): void {
  if (document.querySelector(`link[data-preload-img="${CSS.escape(href)}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.dataset.preloadImg = href;
  if (highPriority) link.fetchPriority = 'high';
  document.head.appendChild(link);
}
