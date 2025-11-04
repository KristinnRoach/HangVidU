// ============================================================================
// AUTH COMPONENT (using createComponent)
// ============================================================================

import {
  signInWithGoogle,
  signOutUser,
  onAuthChange,
} from '../../firebase/auth';
import createComponent from '../../utils/dom/component.js';

let authComponent = null;

export const initializeAuthUI = (parentElement) => {
  if (authComponent) return authComponent;

  if (!parentElement) {
    console.error('Auth UI: Parent element is required');
    return null;
  }

  let unsubscribe = null; // tied to component lifecycle via onMount/onCleanup

  // Create reactive component
  authComponent = createComponent({
    initialProps: {
      isLoggedIn: false,
      userName: 'Guest User',
      loginDisabledAttr: '',
      logoutDisabledAttr: 'disabled',
    },
    template: `
      <button id="goog-login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,
    handlers: {
      handleLogin: signInWithGoogle,
      handleLogout: signOutUser,
    },
    onMount: (el) => {
      unsubscribe = onAuthChange(({ isLoggedIn, userName }) => {
        el.update({
          isLoggedIn,
          userName,
          loginDisabledAttr: isLoggedIn ? 'disabled' : '',
          logoutDisabledAttr: isLoggedIn ? '' : 'disabled',
        });
      });
    },
    onCleanup: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      // Always clear the singleton reference on cleanup
      authComponent = null;
    },
    className: 'auth flex-row',
    parent: parentElement,
  });

  return authComponent;
};
