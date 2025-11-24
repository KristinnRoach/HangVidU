// ================================================
// AUTH COMPONENT
// ================================================

import {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  isLoggedIn,
} from '../../firebase/auth';

import { cancelOneTap, onOneTapStatusChange } from '../../firebase/onetap';
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
      loginDisabledAttr: 'disabled', // Start disabled (auto hidden) until One Tap resolves
      logoutDisabledAttr: 'disabled',
      signingInDisplay: 'none',
      loginBtnMarginRightPx,
    },
    template: `
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,
    handlers: {
      handleLogin: () => {
        cancelOneTap();

        // Clear One Tap suppression to ensure it shows
        document.cookie =
          'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // ! currently always use pop up to allow adding new account
        // if (typeof google !== 'undefined' && google.accounts?.id) {
        //   showOneTapSignin();
        // } else {
        //   signInWithGoogle();
        // }

        signInWithGoogle();
      },
      handleLogout: signOutUser,
    },
    onMount: (el) => {
      // Removed custom click-outside logic for One Tap prompt

      unsubscribe = onAuthChange(({ isLoggedIn, userName }) => {
        console.debug('[AuthComponent] Auth state changed:', {
          isLoggedIn,
          userName,
        });

        el.update({
          isLoggedIn,
          userName,
          // loginDisabledAttr is managed by One Tap status handler only
          logoutDisabledAttr: isLoggedIn ? '' : 'disabled',
          signingInDisplay: 'none', // Hide loading indicator when auth resolves
        });
      });

      // Subscribe to One Tap status
      unsubscribeOneTap = onOneTapStatusChange((status) => {
        devDebug('[AuthComponent] One Tap status:', status);

        if (isLoggedIn()) {
          // Always disable login button if logged in
          el.update({
            loginDisabledAttr: 'disabled',
            signingInDisplay: 'none',
          });
          return;
        }

        if (status === 'signing_in') {
          // Show loading indicator while signing in
          el.update({
            signingInDisplay: 'inline-block',
            loginDisabledAttr: 'disabled', // Hide login button
          });
        } else if (
          ['not_displayed', 'skipped', 'dismissed', 'not_needed'].includes(
            status
          )
        ) {
          // Enable login button if One Tap isn't working/was dismissed and user not logged in
          el.update({
            loginDisabledAttr: '', // Enable (show) login button
            signingInDisplay: 'none',
          });
        } else if (status === 'displayed') {
          // One Tap is showing - keep login button disabled (hidden)
          el.update({
            loginDisabledAttr: 'disabled',
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
