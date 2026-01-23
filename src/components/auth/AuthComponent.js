// ================================================
// AUTH COMPONENT
// ================================================

import {
  // signInWithGoogle, // TODO: remove or use
  signInWithAccountSelection,
  signOutUser,
  onAuthChange,
  isLoggedIn,
} from '../../firebase/auth';

import { onOneTapStatusChange } from '../../firebase/onetap';
import { devDebug } from '../../utils/dev/dev-utils.js';

import createComponent from '../../utils/dom/component.js';

let authComponent = null;

export const initializeAuthUI = (parentElement, gapBetweenBtns = null) => {
  if (authComponent) return authComponent;

  if (!parentElement) {
    console.error('Auth UI: Parent element is required');
    return null;
  }

  let unsubscribe = null; // tied to component lifecycle via onMount/onCleanup
  let unsubscribeOneTap = null;

  let loginBtnMarginRightPx = 10;
  if (typeof gapBetweenBtns === 'number') {
    loginBtnMarginRightPx = gapBetweenBtns;
  }

  const initialLoggedIn = isLoggedIn();
  devDebug('[AuthComponent] Initial logged-in state:', initialLoggedIn);

  authComponent = createComponent({
    initialProps: {
      isLoggedIn: initialLoggedIn,
      userName: 'Guest User',
      signingInDisplay: 'none',
      loginBtnMarginRightPx,
    },
    template: `
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,
    handlers: {
      // handleLogin: signInWithGoogle, // TODO: remove or use
      handleLogin: async (e) => {
        try {
          await signInWithAccountSelection(e);
        } catch (error) {
          console.error('[AuthComponent] Handle login error:', error);
          alert(
            'Login failed. Please refresh the page, check your connection and try again.',
          );
        }
      },
      handleLogout: signOutUser,
    },
    onMount: (el) => {
      const updateButtons = (loggedIn) => {
        const loginBtn = el.querySelector('#goog-login-btn');
        const logoutBtn = el.querySelector('#goog-logout-btn');
        if (loginBtn && logoutBtn) {
          loginBtn.disabled = loggedIn;
          logoutBtn.disabled = !loggedIn;
        }
      };

      // Set initial button states
      updateButtons(initialLoggedIn);

      unsubscribe = onAuthChange(({ isLoggedIn, userName }) => {
        devDebug('[AuthComponent] Auth state changed:', {
          isLoggedIn,
          userName,
        });

        // Update button states with new auth state
        updateButtons(isLoggedIn);

        el.update({
          isLoggedIn,
          userName,
          signingInDisplay: 'none', // Hide loading indicator when auth resolves
        });
      });

      // Subscribe to One Tap status
      unsubscribeOneTap = onOneTapStatusChange((status) => {
        devDebug('[AuthComponent] One Tap status:', status);
        if (status === 'signing_in') {
          // Show loading indicator while signing in
          el.update({
            signingInDisplay: 'inline-block',
          });
        } else {
          // Hide loading indicator for all other statuses
          el.update({
            signingInDisplay: 'none',
          });
        }
      });
    },
    onCleanup: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (unsubscribeOneTap) {
        unsubscribeOneTap();
        unsubscribeOneTap = null;
      }
      authComponent = null;
    },
    className: 'auth-component',
    parent: parentElement,
  });

  return authComponent;
};

// Clear One Tap suppression to ensure it shows
// document.cookie =
//   'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
