// src/ui/state.js
export const uiState = {
  containerContent: {
    main: 'lobby', // 'lobby' | 'remoteStream' | 'ytVideo' | 'sharedVideo'
    smallFrame: 'none',
    PiP: 'none', // 'none' | 'localStream' | 'remoteStream' | 'watchVideo'
  },

  // Called by event handlers, not directly by UI modules
  setView(newView) {
    if (newView === this.mainContent) return;
    this.mainContent = newView;
    // No listeners needed - UI modules check state when their events fire
  },
};
