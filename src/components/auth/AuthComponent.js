// ================================================
// AUTH COMPONENT
// ================================================

import {
  // signInWithGoogle, // TODO: remove or use
  signInWithAccountSelection,
  signOutUser,
  deleteAccount,
  onAuthChange,
  isLoggedIn,
} from '../../firebase/auth';

import { onOneTapStatusChange, cancelOneTap } from '../../firebase/onetap';
import { isDev, devDebug } from '../../utils/dev/dev-utils.js';

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

  const initialLoggedIn = isLoggedIn();
  devDebug('[AuthComponent] Initial logged-in state:', initialLoggedIn);

  authComponent = createComponent({
    initialProps: {
      isLoggedIn: initialLoggedIn,
      userName: 'Guest User',
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
      <button style="margin-right: [[loginBtnMarginRightPx]]px; display: [[loginBtnDisplay]]" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button style="display: [[logoutBtnDisplay]]" id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      ${isDev() && SHOW_DEBUG_DELETE_BTN ? '<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">Delete Account</button>' : ''}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
        <span class="user-avatar-placeholder" style="display: [[avatarDisplay]]">👤</span>
        <span class="user-name">[[userName]]</span>
      </div>
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
      handleDeleteAccount: async () => {
        const confirmed = confirm(
          'Are you sure you want to delete your account?\n\n' +
            'This will permanently delete:\n' +
            '• Your account\n' +
            '• All contacts\n' +
            '• Call history\n' +
            '• All associated data\n\n' +
            'This action cannot be undone.',
        );

        if (!confirmed) return;

        try {
          await deleteAccount();
          alert('Your account has been deleted successfully.');
        } catch (error) {
          console.error('[AuthComponent] Delete account error:', error);
          alert(error.message || 'Failed to delete account. Please try again.');
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

      unsubscribe = onAuthChange(({ isLoggedIn, userName, user }) => {
        // Use smart truncation for display name
        const displayName = smartTruncateName(user?.displayName || userName);
        const photoURL = user?.photoURL || '';

        devDebug('[AuthComponent] Auth state changed:', {
          isLoggedIn,
          userName: displayName,
          photoURL,
        });

        // Cancel One Tap prompt if user logs in (without triggering cooldown)
        if (isLoggedIn) {
          cancelOneTap();
        }

        // Update button states with new auth state
        updateButtons(isLoggedIn);

        el.update({
          isLoggedIn,
          userName: displayName,
          userPhotoURL: photoURL,
          userPhotoDisplay: photoURL ? 'block' : 'none',
          userInfoDisplay: isLoggedIn ? 'flex' : 'none',
          avatarDisplay: photoURL ? 'none' : 'flex',
          signingInDisplay: 'none', // Hide loading indicator when auth resolves
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
