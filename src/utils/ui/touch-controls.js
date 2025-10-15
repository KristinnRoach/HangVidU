export function setupTouchControls(wrapper) {
  let hideTimeout;

  function showControls() {
    wrapper.classList.add('show-controls');
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      wrapper.classList.remove('show-controls');
    }, 3000); // 3 seconds auto-hide
  }

  // Listen to both 'touchstart' and 'click'
  wrapper.addEventListener('touchstart', showControls, { passive: true });
  wrapper.addEventListener('click', (e) => {
    // Prevent play/pause if clicking controls
    if (e.target instanceof Element && e.target.closest('.hover-controls'))
      return;
    showControls();
  });

  // keep controls onscreen if interacting with buttons

  const controls = wrapper.querySelector('.hover-controls');

  // keep controls onscreen if interacting with buttons
  if (controls) {
    controls.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
    controls.addEventListener('touchstart', () => clearTimeout(hideTimeout), {
      passive: true,
    });
    controls.addEventListener('click', () => clearTimeout(hideTimeout));

    // Hide controls when leaving the controller area
    controls.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        wrapper.classList.remove('show-controls');
      }, 2000);
    });
  }
}
