const scrollRafByElement = new WeakMap();

export function scrollMessagesToEnd(messagesContainerEl) {
  if (!messagesContainerEl) return;

  const existingRafId = scrollRafByElement.get(messagesContainerEl);
  if (existingRafId !== undefined) {
    cancelAnimationFrame(existingRafId);
  }

  const rafId = requestAnimationFrame(() => {
    messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
    scrollRafByElement.delete(messagesContainerEl);
  });

  scrollRafByElement.set(messagesContainerEl, rafId);
}

export function cancelScrollMessagesToEnd(messagesContainerEl) {
  if (!messagesContainerEl) return;

  const rafId = scrollRafByElement.get(messagesContainerEl);
  if (rafId === undefined) return;

  cancelAnimationFrame(rafId);
  scrollRafByElement.delete(messagesContainerEl);
}
