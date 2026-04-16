// ================================================
// AUTH COMPONENT
// ================================================

import { getIsLoggedIn, onAuthStateChanged } from '../auth-state.js';
import { dispatchCommand } from '../../shared/events/index.js';
import {
  AUTH_COMMANDS,
  parseAuthDeleteAccountRequested,
  parseAuthLoginRequested,
  parseAuthLogoutRequested,
} from '../auth-events-schema.js';

import {
  onOneTapStatusChange,
  cancelOneTap,
  renderGoogleSignInButton,
  isOneTapAvailable,
} from '../onetap.js';

import { getAuthState } from '../auth-state.js';
import { isDev, devDebug } from '../../shared/utils/dev/dev-utils.js';
import { t, onLocaleChange } from '../../shared/i18n/index.js';

import createComponent from '@kidlib/create-component';

let authComponent = null;

const SHOW_DEBUG_DELETE_BTN_IN_DEV = false; // Set to true to show delete account button in dev mode

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
  let fallbackTimeout = null;

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
      signingOutDisplay: 'none',
      loginBtnMarginRightPx,
    },
    template: `
      <div id="gsi-button-container"></div>
      <button id="goog-login-btn" class="login-btn" style="margin-right: [[loginBtnMarginRightPx]]px; display: none" onclick="handleLogin">[[t:auth.login]]</button>
      <button id="goog-logout-btn" class="logout-btn" style="display: none" onclick="handleLogout">[[t:auth.logout]]</button>
      ${isDev() && SHOW_DEBUG_DELETE_BTN_IN_DEV ? `<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">[[t:auth.delete_account]]</button>` : ''}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">...</span>
      <span class="signing-in-indicator" style="display: [[signingOutDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">...</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" referrerpolicy="no-referrer" onerror="handleAvatarError" />
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
      handleLogin: async (e) => {
        try {
          dispatchCommand(
            AUTH_COMMANDS.LOGIN_REQUESTED,
            parseAuthLoginRequested({ source: 'auth-ui' }),
          );
        } catch (error) {
          console.error('[AuthComponent] Handle login error:', error);
          alert(t('auth.login_failed'));
        }
      },
      handleLogout: () => {
        try {
          dispatchCommand(
            AUTH_COMMANDS.LOGOUT_REQUESTED,
            parseAuthLogoutRequested({ source: 'auth-ui' }),
          );
        } catch (error) {
          console.error('[AuthComponent] Handle logout error:', error);
          alert(t('auth.logout_failed'));
        }
      },
      handleDeleteAccount: () => {
        try {
          const confirmed = confirm(t('auth.delete_confirm'));

          if (!confirmed) return;

          const scrubMessages = confirm(
            'Also delete all your messages from conversations?',
          );

          dispatchCommand(
            AUTH_COMMANDS.DELETE_ACCOUNT_REQUESTED,
            parseAuthDeleteAccountRequested({
              source: 'auth-ui',
              scrubMessages,
            }),
          );
        } catch (error) {
          console.error('[AuthComponent] Handle delete account error:', error);
          alert(t('auth.delete_failed'));
        }
      },
    },
    onMount: (el) => {
      const renderButtons = (loggedIn) => {
        const isGisLoaded = isOneTapAvailable();
        const isAuthReady =
          getAuthState()?.status === 'authenticated' ||
          getAuthState()?.status === 'unauthenticated';

        if (!isAuthReady) {
          devDebug('[AuthComponent] renderButtons: Auth state not ready');
          return;
        }

        const logoutBtn = el.querySelector('#goog-logout-btn');
        if (logoutBtn) {
          logoutBtn.style.display = loggedIn ? 'inline-block' : 'none';
        }
        const gsiBtn = el.querySelector('#gsi-button-container');
        if (gsiBtn && isGisLoaded) {
          if (!loggedIn) {
            renderGoogleSignInButton(gsiBtn);
          }
          gsiBtn.style.visibility =
            !loggedIn && isGisLoaded ? 'visible' : 'hidden';
        }
        const loginBtn = el.querySelector('#goog-login-btn');
        if (loginBtn) {
          if (fallbackTimeout) clearTimeout(fallbackTimeout);

          if (loggedIn || isGisLoaded) {
            loginBtn.style.display = 'none';
          } else {
            // Delay showing fallback by 500ms to prevent visual flash while GIS script loads
            fallbackTimeout = setTimeout(() => {
              const currentBtn = el.querySelector('#goog-login-btn');
              const currentlyLoaded = isOneTapAvailable();
              if (currentBtn && !currentlyLoaded && !getIsLoggedIn()) {
                currentBtn.style.display = 'inline-block';
              }
            }, 500);
          }
        }
        const deleteBtn = el.querySelector('#delete-account-btn');
        if (deleteBtn) {
          deleteBtn.style.display = loggedIn ? 'inline-block' : 'none';
        }
      };

      // Re-render buttons after each template re-render (DOM gets wiped)
      el.onRender(() => {
        renderButtons(getIsLoggedIn());
      });

      unsubscribe = onAuthStateChanged(({ isLoggedIn, user, status }) => {
        const rawName = user?.userName || user?.email || 'User';
        const userName = smartTruncateName(rawName);
        const photoURL = user?.photoURL || '';

        devDebug('[AuthComponent] Auth state changed:', {
          isLoggedIn,
          userName,
          photoURL,
          status,
        });

        // Cancel One Tap prompt if user logs in (without triggering cooldown)
        if (isLoggedIn) {
          cancelOneTap();
        }

        // Shared loading state is used for sign-in and sign-out.
        // While still logged in during loading, the action is sign-out.
        const isLoading = status === 'loading';
        const signingInDisplay =
          isLoading && !isLoggedIn ? 'inline-block' : 'none';
        const signingOutDisplay =
          isLoading && isLoggedIn ? 'inline-block' : 'none';

        el.update({
          isLoggedIn,
          userName,
          userPhotoURL: photoURL,
          userPhotoDisplay: photoURL ? 'block' : 'none',
          userInfoDisplay: isLoggedIn ? 'flex' : 'none',
          avatarDisplay: photoURL ? 'none' : 'flex',
          signingInDisplay,
          signingOutDisplay,
        });

        // Render button visibility based on real auth state (not stale initial state)
        renderButtons(isLoggedIn); // ? needed ?
      });

      // Subscribe to One Tap status
      unsubscribeOneTap = onOneTapStatusChange((status) => {
        devDebug('[AuthComponent] One Tap status:', status);

        if (!getIsLoggedIn()) {
          // Keep a single source of truth for GIS/fallback visibility.
          renderButtons(false);
        }
        if (status === 'signing_in') {
          // TODO: replace with proper loading state + animation
          // Show loading indicator while signing in
          el.update({
            signingInDisplay: 'inline-block',
            signingOutDisplay: 'none',
          });
        } else {
          // Hide loading indicator for all other statuses
          el.update({
            signingInDisplay: 'none',
            signingOutDisplay: 'none',
          });
        }
      });
    },
    onCleanup: () => {
      if (fallbackTimeout) {
        clearTimeout(fallbackTimeout);
        fallbackTimeout = null;
      }
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
