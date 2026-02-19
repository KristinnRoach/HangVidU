// src/ui/ui-state.js

// Simple UI state - single source of truth for app view

const isLoggedIn = () => document.body.dataset.loggedIn === 'true';

const getAuthAwareView = (baseView) => {
  return isLoggedIn() ? `${baseView}:user` : `${baseView}:guest`;
};

export const uiState = {
  // High-level app mode
  view: getAuthAwareView('lobby'), // 'lobby' | 'calling' | 'connected' - add ":guest" or ":user" suffix based on auth state

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

    const authAwareNewView = getAuthAwareView(newBaseView);
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

// export function onViewChange(callback) {
//   // Call callback immediately with current view
//   callback(uiState.view);

//   // Set up a MutationObserver to watch for changes to the data-view attribute on the body element
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (
//         mutation.type === 'attributes' &&
//         mutation.attributeName === 'data-view'
//       ) {
//         const newView = document.body.dataset.view;
//         if (isValidView(newView)) {
//           callback(newView);
//         } else {
//           console.warn(
//             `[UI State] Invalid view detected: ${newView}. Ignoring.`
//           );
//         }
//       }
//     });
//   });

//   observer.observe(document.body, { attributes: true });

//   // Return a function to allow unsubscribing
//   return () => observer.disconnect();

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
