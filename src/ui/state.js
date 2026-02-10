// src/ui/state.js

import { getLoggedInUserId } from '../auth/auth';

// Simple UI state - single source of truth for app view

// Todo: isLoggedIn system, temp below
// const isLoggedIn = !!document.body.dataset.loggedIn; // set by server-side rendering or auth module
// document.body.dataset.view = isLoggedIn ? 'lobby' : 'lobby:guest';
// export function getIsLoggedIn() {
//   return !!document.body.dataset.loggedIn;
// }

const isLoggedin = !!getLoggedInUserId();
const initialView = isLoggedin ? 'lobby' : 'lobby:guest';
document.body.dataset.view = initialView;

export const uiState = {
  // High-level app mode
  view: initialView, // 'lobby' | 'calling' | 'connected' - add ":guest" when not logged in

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
