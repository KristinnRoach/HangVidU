// ============================================================================
// AUTH COMPONENT (using createComponent)
// ============================================================================

import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '../../firebase/auth';
import createComponent from '../../utils/dom/component.js';

let authComponent = null;
let unsubscribeAuth = null;

export const initializeAuthUI = (parentElement) => {
  if (authComponent) return { cleanupAuthUI: cleanup };

  if (!parentElement) {
    console.error('Auth UI: Parent element is required');
    return;
  }

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
    className: 'auth flex-row',
    parent: parentElement,
  });

  // Monitor auth state
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      const name = user.displayName || 'Guest User';
      const truncatedName = name.length > 7 ? name.slice(0, 7) + '...' : name;
      authComponent.update({
        isLoggedIn: true,
        userName: truncatedName,
        loginDisabledAttr: 'disabled',
        logoutDisabledAttr: '',
      });
    } else {
      authComponent.update({
        isLoggedIn: false,
        userName: 'Guest User',
        loginDisabledAttr: '',
        logoutDisabledAttr: 'disabled',
      });
    }
  });

  const cleanup = () => {
    unsubscribeAuth?.();
    unsubscribeAuth = null;
    authComponent?.dispose();
    authComponent = null;
  };

  return { authComponent, cleanupAuthUI: cleanup };
};
