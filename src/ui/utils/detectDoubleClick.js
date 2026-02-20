export function detectDoubleClick(
  element,
  singleClickHandler,
  doubleClickHandler,
  timeout = 300,
) {
  let clickCount = 0;
  let timer = null;
  let lastTap = 0;

  const handleInteraction = (event) => {
    const now = Date.now();
    clickCount++;

    // Double-tap check for touch
    if (now - lastTap < timeout && clickCount >= 2) {
      clearTimeout(timer);
      doubleClickHandler(event);
      clickCount = 0;
      lastTap = 0;
      return;
    }
    lastTap = now;

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (clickCount === 1) singleClickHandler(event);
      clickCount = 0;
    }, timeout);
  };

  element.addEventListener('click', handleInteraction);
  element.addEventListener('touchend', handleInteraction, { passive: true });

  return {
    destroy: () => {
      element.removeEventListener('click', handleInteraction);
      element.removeEventListener('touchend', handleInteraction);
    },
  };
}
