// ================================================
// AUTH COMPONENT
// ================================================

import {
  signInWithAccountSelection,
  signOutUser,
  deleteAccount,
} from '../../auth/index.js';
import { getIsLoggedIn, subscribe } from '../../auth/auth-state.js';

import { onOneTapStatusChange, cancelOneTap } from '../../auth/onetap.js';
import { isDev, devDebug } from '../../utils/dev/dev-utils.js';
import { t, onLocaleChange } from '../../i18n/index.js';

import createComponent from '../../utils/dom/component.js';

let authComponent = null;

const SHOW_DEBUG_DELETE_BTN = false; // Set to true to show delete account button in dev mode

/**
 * Smart truncation that tries to show first name
 * @param {string} fullName - Full display name
 * @param {number} maxLength - Maximum length (default 20)
 * @returns {string} Truncated name
 */
function smartTruncateName(fullName, maxLength = 20) {
  if (!fullName || fullName.length <= maxLength) {
    return fullName;
  }

  // Try to extract first name (before first space)
  const parts = fullName.split(' ');
  const firstName = parts[0];

  // If first name fits, use it
  if (firstName.length <= maxLength) {
    return firstName;
  }

  // If first name is too long, truncate it
  return firstName.slice(0, maxLength - 3) + '...';
}

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

  const initialLoggedIn = getIsLoggedIn();
  devDebug('[AuthComponent] Initial logged-in state:', initialLoggedIn);

  authComponent = createComponent({
    initialProps: {
      isLoggedIn: initialLoggedIn,
      userName: t('auth.guest_user'),
      userPhotoURL: '',
      userPhotoDisplay: 'none',
      userInfoDisplay: 'none',
      avatarDisplay: 'none',
      signingInDisplay: 'none',
      loginBtnMarginRightPx,
      loginBtnDisplay: initialLoggedIn ? 'none' : 'inline-block',
      logoutBtnDisplay: initialLoggedIn ? 'inline-block' : 'none',
    },
    template: `
      <button style="margin-right: [[loginBtnMarginRightPx]]px; display: [[loginBtnDisplay]]" id="goog-login-btn" class="login-btn" onclick="handleLogin">[[t:auth.login]]</button>
      <button style="display: [[logoutBtnDisplay]]" id="goog-logout-btn" class="logout-btn" onclick="handleLogout">[[t:auth.logout]]</button>
      ${isDev() && SHOW_DEBUG_DELETE_BTN ? `<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">[[t:auth.delete_account]]</button>` : ''}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">[[t:auth.signing_in]]</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" onerror="handleAvatarError" />
        <span class="user-avatar-placeholder" style="display: [[avatarDisplay]]">👤</span>
        <span class="user-name">[[userName]]</span>
      </div>
    `,
    templateFns: {
      t: { resolve: t, onChange: onLocaleChange },
    },
    handlers: {
      handleAvatarError: (e) => {
        if (!e.target.isConnected) return; // ignore stale errors from detached elements
        authComponent.update({
          userPhotoDisplay: 'none',
          avatarDisplay: 'flex',
        });
      },
      // handleLogin: signInWithGoogle, // TODO: remove or use
      handleLogin: async (e) => {
        try {
          await signInWithAccountSelection(e);
        } catch (error) {
          console.error('[AuthComponent] Handle login error:', error);
          alert(t('auth.login_failed'));
        }
      },
      handleLogout: signOutUser,
      handleDeleteAccount: async () => {
        const confirmed = confirm(t('auth.delete_confirm'));

        if (!confirmed) return;

        try {
          await deleteAccount();
          alert(t('auth.delete_success'));
        } catch (error) {
          console.error('[AuthComponent] Delete account error:', error);
          alert(error.message || t('auth.delete_failed'));
        }
      },
    },
    onMount: (el) => {
      const updateButtons = (loggedIn) => {
        const loginBtn = el.querySelector('#goog-login-btn');
        const logoutBtn = el.querySelector('#goog-logout-btn');
        if (loginBtn && logoutBtn) {
          loginBtn.style.display = loggedIn ? 'none' : 'inline-block';
          logoutBtn.style.display = loggedIn ? 'inline-block' : 'none';
        }
        const deleteBtn = el.querySelector('#delete-account-btn');
        if (deleteBtn) {
          deleteBtn.style.display = loggedIn ? 'inline-block' : 'none';
        }
      };

      // Set initial button states
      updateButtons(initialLoggedIn);

      unsubscribe = subscribe(({ isLoggedIn, user, status }) => {
        const rawName = user?.displayName || user?.email || 'User';
        const displayName = smartTruncateName(rawName);
        const photoURL = user?.photoURL || '';

        devDebug('[AuthComponent] Auth state changed:', {
          isLoggedIn,
          userName: displayName,
          photoURL,
          status,
        });

        // Cancel One Tap prompt if user logs in (without triggering cooldown)
        if (isLoggedIn) {
          cancelOneTap();
        }

        // Update button states with new auth state
        updateButtons(isLoggedIn);

        // Show loading indicator during any auth operation (sign-in/out/etc)
        const signingInDisplay = status === 'loading' ? 'inline-block' : 'none';

        el.update({
          isLoggedIn,
          userName: displayName,
          userPhotoURL: photoURL,
          userPhotoDisplay: photoURL ? 'block' : 'none',
          userInfoDisplay: isLoggedIn ? 'flex' : 'none',
          avatarDisplay: photoURL ? 'none' : 'flex',
          signingInDisplay,
          loginBtnDisplay: isLoggedIn ? 'none' : 'inline-block',
          logoutBtnDisplay: isLoggedIn ? 'inline-block' : 'none',
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
