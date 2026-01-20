// src/ui/state.js
// Simple UI state - single source of truth for app view

export const uiState = {
  // High-level app mode
  view: 'lobby', // 'lobby' | 'calling' | 'connected'

  // Currently focused active media content (if any)
  currentMedia: 'none', // 'none' | 'remoteStream' | 'ytVideo' | 'sharedVideo'

  setView(newView) {
    if (newView === this.view) return;
    this.view = newView;
    document.body.dataset.view = newView;
  },

  setMainContent(content) {
    if (content === this.currentMedia) return;
    this.currentMedia = content;
    document.body.dataset.mainContent = content;
  },
};

// Initialize
document.body.dataset.view = uiState.view;
document.body.dataset.mainContent = uiState.currentMedia;

/* Drafts & Notes below while brainstorming UI state management patterns

WIP draft of for mutually exclusive content state management
export const currentMutExContent = {
  containerContent: {
    main: 'lobby', // 'lobby' | 'remoteStream' | 'ytVideo' | 'sharedVideo'
    smallFrame: 'none',
    PiP: 'none', // 'none' | 'localStream' | 'remoteStream' | 'watchVideo'
  },

  // Called by event handlers, (not directly by UI modules?)
  setContainerContent(container, content) {
    // ? No listeners needed - UI modules check state when their events fire
  },
};
*/
