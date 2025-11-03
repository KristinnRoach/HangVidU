// ============================================================================
// AUTH (GOOGLE SIGN-IN PoC)
// ============================================================================

import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '../../firebase/auth';

let isInitialized = false;

export const initializeAuthUI = (parentElement) => {
  if (isInitialized) return;
  if (!parentElement) {
    console.error('Auth UI: Parent element is required');
    return;
  }

  isInitialized = true;

  let listeners = [];
  const cleanupListeners = () => {
    listeners.forEach((listener) => listener());
    listeners = [];
  };

  const authContainer = document.createElement('div');
  authContainer.className = 'auth flex-row';
  authContainer.innerHTML = `
    <button id="goog-login-btn">Login</button>
    <button id="goog-logout-btn" disabled>Logout</button>
    <div class="user-info" id="user-info"></div>
  `;

  parentElement && parentElement.appendChild(authContainer);

  const loginBtn = authContainer.querySelector('#goog-login-btn');
  const logoutBtn = authContainer.querySelector('#goog-logout-btn');
  const userInfoDiv = authContainer.querySelector('#user-info');

  if (!loginBtn || !logoutBtn || !userInfoDiv) {
    console.error('Auth UI: Elements not found');
    isInitialized = false;
    return;
  }

  loginBtn.addEventListener('click', signInWithGoogle);
  logoutBtn.addEventListener('click', signOutUser);

  // Monitor auth state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      logoutBtn.disabled = false;
      logoutBtn.style.display = 'inline-block';
      const name = user.displayName || 'Guest User';
      const truncatedName = name.length > 7 ? name.slice(0, 7) + '...' : name;
      userInfoDiv.textContent = `Logged in: ${truncatedName}`;
    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.disabled = true;
      userInfoDiv.textContent = 'Logged out';
    }
  });

  listeners.push(unsubscribe);

  const cleanup = () => {
    cleanupListeners();
    isInitialized = false;
    parentElement && parentElement.removeChild(authContainer);
  };

  return { cleanupAuthUI: cleanup };
};
