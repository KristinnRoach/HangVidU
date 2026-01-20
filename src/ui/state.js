// src/ui/state.js
// Simple UI state - single source of truth for app view

export const uiState = {
  // High-level app mode
  view: 'lobby', // 'lobby' | 'calling' | 'connected'

  // What's playing in main area (only relevant when connected)
  mainContent: 'remoteStream', // 'remoteStream' | 'ytVideo' | 'sharedVideo'

  setView(newView) {
    if (newView === this.view) return;
    this.view = newView;
    document.body.dataset.view = newView;
  },

  setMainContent(content) {
    if (content === this.mainContent) return;
    this.mainContent = content;
    document.body.dataset.mainContent = content;
  },
};

// Initialize
document.body.dataset.view = uiState.view;

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
