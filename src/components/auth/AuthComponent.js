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
      loginBtnMarginRightPx,
    },
    template: `
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,
    handlers: {
      handleLogin: () => {
        cancelOneTap();
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
          loginDisabledAttr: 'disabled', // Disable & hide login button onMount
          logoutDisabledAttr: isLoggedIn ? '' : 'disabled',
        });
      });

      // Subscribe to One Tap status
      unsubscribeOneTap = onOneTapStatusChange((status) => {
        devDebug('[AuthComponent] One Tap status:', status);

        // Enable login button if One Tap isn't working/was dismissed and user not logged in
        if (
          ['not_displayed', 'skipped', 'dismissed', 'not_needed'].includes(
            status
          )
        ) {
          if (!isLoggedIn()) {
            el.update({
              loginDisabledAttr: '', // Enable (show) login button
            });
          }
        } else if (status === 'displayed') {
          // One Tap is showing - keep login button disabled (hidden)
          el.update({
            loginDisabledAttr: 'disabled',
          });
        }
      });

      requestAnimationFrame(() => {
        const loginBtn = el.querySelector('#goog-login-btn');
        console.log('[DEBUG] Login button:', {
          disabled: loginBtn.disabled,
          hasDisabledAttr: loginBtn.hasAttribute('disabled'),
          opacity: window.getComputedStyle(loginBtn).opacity,
          display: window.getComputedStyle(loginBtn).display,
        });
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
