// src/ui/core/ui-state.js

// Legacy source of truth for app view
// migration to SolidJS is WIP

const isLoggedIn = () => document.body.dataset.loggedIn === 'true';

const buildAuthAwareView = (baseView) => {
  return isLoggedIn() ? `${baseView}:user` : `${baseView}:guest`;
};

export const uiState = {
  // High-level app mode
  view: buildAuthAwareView('lobby'), // 'lobby' | 'calling' | 'connected' - add ":guest" or ":user" suffix based on auth state

  // Currently focused active media content (if any)
  currentMedia: 'none', // 'none' | 'remoteStream' | 'ytVideo' | 'sharedVideo'

  getCurrentAuthAwareView() {
    return this.view;
  },

  getCurrentBaseView() {
    return this.view.split(':')[0];
  },

  setView(newView) {
    const newBaseView = newView.split(':')[0];
    if (!isValidBaseView(newBaseView)) {
      console.warn(
        `[UI State] Attempted to set invalid view: ${newBaseView}. Ignoring.`,
      );
      return;
    }

    const authAwareNewView = buildAuthAwareView(newBaseView);
    if (authAwareNewView === this.view) return;
    this.view = authAwareNewView;
    document.body.dataset.view = authAwareNewView;
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

function isValidBaseView(view) {
  const validViews = ['lobby', 'calling', 'connected'];
  return validViews.includes(view);
}
