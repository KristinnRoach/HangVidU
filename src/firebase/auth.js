// src/firebase/auth.js

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { app } from './firebase.js';

import { devDebug } from '../utils/dev/dev-utils.js';
import { isMobileDevice } from '../utils/env/isMobileDevice.js';
import { initializeOneTap } from './onetap.js';

export const auth = getAuth(app);

// Export a promise that resolves when auth initialization completes
// This ensures redirect processing finishes before components subscribe to auth state
export const authReady = (async () => {
  // Set persistence early with graceful fallback for Safari/iOS/private mode
  try {
    await setPersistence(auth, indexedDBLocalPersistence);
  } catch (_) {
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch {
      await setPersistence(auth, inMemoryPersistence);
    }
  }

  // After persistence is set, process any pending redirect from a previous sign-in attempt.
  try {
    const result = await handleRedirectResult();
    if (result.success) {
      console.log(
        '[AUTH] ✅ Redirect sign-in completed, user:',
        result.user?.email || result.user?.uid
      );
    } else if (result.error) {
      console.error('[AUTH] ❌ Redirect sign-in failed:', result.error);
    } else {
      console.debug('[AUTH] No pending redirect result found.');
    }
  } catch (e) {
    console.error('[AUTH] Error during handleRedirectResult execution:', e);
  }

  devDebug('[AUTH] Auth initialization complete, scheduling One Tap...');

  // Small delay to ensure page is fully loaded
  setTimeout(() => {
    devDebug('[AUTH] Timeout fired, calling initializeOneTap()...');
    initializeOneTap();
  }, 500);
})();

// Minimal iOS standalone PWA Safari fallback: armed after a failed attempt,
// then the next Login tap opens the app URL in Safari (user gesture).
let safariExternalOpenArmed = false;

/**
 * Get whether Safari external open fallback is armed.
 * @returns {boolean}
 */
export function isSafariExternalOpenArmed() {
  return safariExternalOpenArmed;
}

/**
 * Set Safari external open fallback armed state.
 * @param {boolean} value
 */
export function setSafariExternalOpenArmed(value) {
  safariExternalOpenArmed = value;
}

function openInSafariExternal() {
  try {
    const a = document.createElement('a');
    a.href = window.location.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer external';
    // Append to DOM to ensure iOS respects the gesture-triggered click
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (_) {}
}

let guestUserId = null; // Generated ID when not logged in (cached for session)
const createNewGuestUserId = () => Math.random().toString(36).substring(2, 15);

// Persist a stable per-browser guest ID with TTL
const GUEST_STORAGE_KEY = 'guestUser';
const DEFAULT_GUEST_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

function loadGuestFromLocalStorage() {
  try {
    const raw =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(GUEST_STORAGE_KEY)
        : null;
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object' || !obj.id) return null;
    if (obj.expiresAt && Date.now() > obj.expiresAt) {
      // Expired; clear and treat as missing
      try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      } catch (_) {}
      return null;
    }
    return obj;
  } catch (e) {
    return null;
  }
}

function persistGuestToLocalStorage(id, ttlMs = DEFAULT_GUEST_TTL_MS) {
  const now = Date.now();
  const payload = {
    id,
    createdAt: now,
    expiresAt: now + ttlMs,
  };
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (_) {}
  return payload;
}

/**
 * Get the user ID to use for this session.
 * Returns the authenticated user's UID if logged in,
 * otherwise generates a guest ID
 * (or uses an existing one if already generated).
 * @returns {string} The current user ID
 */
export function getUserId() {
  const userId = getLoggedInUserId();
  if (userId) {
    return userId;
  }
  // If not logged in, use or generate a persistent guest user ID (with TTL)
  if (!guestUserId) {
    const stored = loadGuestFromLocalStorage();
    if (stored && stored.id) {
      guestUserId = stored.id;
    } else {
      guestUserId = createNewGuestUserId();
      persistGuestToLocalStorage(guestUserId);
    }
  }
  return guestUserId;
}

/**
 * Get the current authenticated user.
 * @returns {import('firebase/auth').User | null} The current user if logged in, null otherwise.
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Check if a user is currently logged in.
 * @returns {boolean} True if user is logged in, false otherwise.
 */
export function isLoggedIn() {
  return auth.currentUser !== null;
}

/**
 * Get the currently logged in user's ID (uid).
 * @returns {string | null} The user's uid if logged in, null otherwise.
 */
export function getLoggedInUserId() {
  return auth.currentUser?.uid ?? null;
}

/**
 * Wait for auth state to be initialized and return the current user.
 * Useful when you need to ensure auth persistence has been checked.
 * Note: onAuthStateChanged fires once after initialization, so this always resolves.
 * @returns {Promise<import('firebase/auth').User | null>} The current user if logged in, null otherwise.
 */
export function getCurrentUserAsync() {
  return new Promise((resolve) => {
    // onAuthStateChanged always fires once after auth initialization
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * Subscribe to auth state with a normalized, UI-friendly payload.
 * Returns Firebase's unsubscribe function.
 *
 * @param {(info: { user: import('firebase/auth').User|null, isLoggedIn: boolean, userName: string }) => void} callback
 * @param {{ truncate?: number }} [options]
 * @returns {() => void} Unsubscribe function
 */
export function onAuthChange(callback, { truncate = 7 } = {}) {
  return onAuthStateChanged(auth, (user) => {
    const isLoggedIn = !!user;
    const rawName = user?.displayName || 'Guest User';
    const userName =
      typeof rawName === 'string' && rawName.length > truncate
        ? rawName.slice(0, truncate) + '...'
        : rawName;

    try {
      callback({ user, isLoggedIn, userName });
    } catch (e) {
      // Swallow callback errors to avoid breaking the subscription loop
      // Optionally log in dev mode
      if (typeof devDebug === 'function')
        devDebug('onAuthChange callback error', e);
    }
  });
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  // Force account picker every time so user can choose different accounts for now // Todo: "Switch Account" button or select
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  // Use redirect flow for mobile devices (required for iOS Safari)
  // Use popup flow for desktop browsers
  const useMobileFlow = isMobileDevice();

  // Detect standalone PWA (iOS installed app or other platforms)
  const isStandalonePWA = (() => {
    try {
      return (
        (typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(display-mode: standalone)').matches) ||
        // Legacy iOS PWA detection
        (typeof navigator !== 'undefined' && navigator.standalone === true)
      );
    } catch (_) {
      return false;
    }
  })();
  const isIOSStandalone =
    isStandalonePWA && /iphone|ipad|ipod/i.test(navigator.userAgent || '');

  // In production (gh-pages), always use popup since static hosting lacks /__/auth/handler
  // In dev (ngrok with proxy), use redirect on mobile/standalone (proxy handles /__/auth)
  // Note: iOS standalone PWA on gh-pages will try popup; if blocked, we guide user to Safari
  const forcePopupInProd = import.meta.env.PROD;

  try {
    // If previous attempt failed in iOS standalone PWA, the user can tap Login again
    // and we open in Safari from the same user gesture.
    if (isIOSStandalone && safariExternalOpenArmed) {
      safariExternalOpenArmed = false;
      openInSafariExternal();
      return;
    }

    if ((useMobileFlow || isStandalonePWA) && !forcePopupInProd) {
      // Mobile or Standalone PWA (when not forcing popup): Use redirect
      console.log('[AUTH] Starting redirect sign-in flow...');
      await signInWithRedirect(auth, provider);
      // Note: redirect will navigate away, so code after this won't execute
      // The result will be handled by handleRedirectResult() on return
      return;
    }

    // Desktop (or mobile in prod when not standalone): Use popup flow
    const result = await signInWithPopup(auth, provider);
    // Google Access Token to access the Google API
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('Signed in user:', user);

    devDebug('Google Access Token exists:', !!token);
    safariExternalOpenArmed = false; // clear on success
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);

    // Ignore popup-closed-by-user error (user cancelled auth)
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request'
    ) {
      console.log('Sign-in cancelled by user');
      return;
    }

    // iOS Standalone PWA: arm Safari fallback and ask user to tap Login again
    if (
      (errorCode === 'auth/network-request-failed' ||
        errorCode === 'auth/popup-blocked') &&
      isIOSStandalone
    ) {
      console.warn(
        `[AUTH] ${errorCode} inside iOS standalone PWA. Arming Safari fallback.`
      );
      safariExternalOpenArmed = true;
      alert(
        'Sign-in is blocked in the installed app on iOS.\n\nTap the Login button again to open in Safari and complete sign-in.'
      );
      return;
    }

    // If popup is blocked on mobile in prod, inform user
    if (
      errorCode === 'auth/popup-blocked' &&
      useMobileFlow &&
      import.meta.env.PROD
    ) {
      alert(
        'Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.'
      );
      return;
    }

    // The email of the user's account used.
    const email = error?.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error('Error during Google sign-in:', {
      errorCode,
      errorMessage,
      email,
      credential,
      origin: typeof window !== 'undefined' ? window.location.origin : 'n/a',
    });

    if (errorCode === 'auth/unauthorized-domain') {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      const guidanceLines = [
        "This app's host is not whitelisted in Firebase Authentication.",
        'Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:',
        origin ? `• ${origin}` : '• <your dev origin>',
        '',
        'Common dev hosts to add:',
        '• http://localhost (covers any port)',
        '• http://127.0.0.1',
        '• http://[::1] (IPv6 localhost)',
        '• Your LAN IP, e.g. http://192.168.x.y',
        '',
        'Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead.',
      ];

      // Try to copy the origin to the clipboard for convenience (best-effort)
      if (
        origin &&
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        navigator.clipboard.writeText(origin).catch(() => {});
      }

      alert(
        `Sign-in failed: Unauthorized domain.\n\n${guidanceLines.join('\n')}`
      );
      return;
    }

    alert(`Sign-in failed: ${errorMessage}`);
  }
}

/**
 * Handle redirect result after Google sign-in redirect flow (mobile)
 * Call this on app initialization to complete the sign-in after redirect
 */
export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);

    if (result) {
      // User successfully signed in via redirect
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      console.log(
        '[AUTH] Redirect result found - signed in user:',
        user?.email || user?.uid
      );
      devDebug('Google Access Token exists:', !!token);

      return { success: true, user };
    }

    // No redirect result (normal page load, not returning from auth)
    console.log('[AUTH] No redirect result (normal page load)');
    return { success: false, user: null };
  } catch (error) {
    const errorCode = error?.code || 'unknown';
    const errorMessage = error?.message || String(error);
    const email = error?.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error('Error handling redirect result:', {
      errorCode,
      errorMessage,
      email,
      credential,
      origin: typeof window !== 'undefined' ? window.location.origin : 'n/a',
    });

    if (errorCode === 'auth/unauthorized-domain') {
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      const guidanceLines = [
        "This app's host is not whitelisted in Firebase Authentication.",
        'Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:',
        origin ? `• ${origin}` : '• <your dev origin>',
        '',
        'Common dev hosts to add:',
        '• http://localhost (covers any port)',
        '• http://127.0.0.1',
        '• http://[::1] (IPv6 localhost)',
        '• Your LAN IP, e.g. http://192.168.x.y',
        '',
        'Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead.',
      ];

      if (
        origin &&
        typeof navigator !== 'undefined' &&
        navigator.clipboard?.writeText
      ) {
        navigator.clipboard.writeText(origin).catch(() => {});
      }

      alert(
        `Sign-in failed: Unauthorized domain.\n\n${guidanceLines.join('\n')}`
      );
    } else {
      alert(`Sign-in failed: ${errorMessage}`);
    }

    return { success: false, user: null, error };
  }
}

export function signOutUser() {
  auth
    .signOut()
    .then(() => {
      console.log('User signed out successfully');
      // alert('You have been signed out.');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
      // alert(`Sign-out failed: ${error.message}`);
    });
}

// ============================================================================
// PASSKEY AUTHENTICATION (WebAuthn)
// ============================================================================

/** Using extension */

// import {
//   createUserWithPasskey,
//   signInWithPasskey,
//   verifyUserWithPasskey,
//   isPasskeyAvailable,
//   unlinkPasskey,
// } from '@firebase-web-authn/browser';

// // Check if passkeys are supported
// export async function isPasskeySupported() {
//   return await isPasskeyAvailable();
// }

// // Register passkey for signed-in user
// export async function registerNewPasskey() {
//   const user = getCurrentUser();
//   if (!user) {
//     return { success: false, error: new Error('User must be signed in') };
//   }

//   try {
//     await verifyUserWithPasskey(auth);
//     console.info('[PASSKEY] ✅ Passkey registered successfully');
//     return { success: true };
//   } catch (error) {
//     console.error('[PASSKEY] ❌ Registration failed:', error);
//     return { success: false, error };
//   }
// }

// // Sign in with passkey
// export async function signInWithPasskey() {
//   try {
//     const userCredential = await signInWithPasskey(auth);
//     console.info('[PASSKEY] ✅ Signed in:', userCredential.user.email);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     console.error('[PASSKEY] ❌ Sign-in failed:', error);
//     return { success: false, error };
//   }
// }

// ============================================================================

// /**
//  * Check if passkeys are supported in the current browser/device
//  * @returns {boolean} True if WebAuthn is supported
//  */
// export function isPasskeySupported() {
//   return (
//     typeof window !== 'undefined' &&
//     window.PublicKeyCredential !== undefined &&
//     typeof window.PublicKeyCredential === 'function'
//   );
// }

// /**
//  * Check if user has passkeys enrolled for this device/site
//  * Uses conditional UI availability check
//  * @returns {Promise<boolean>}
//  */
// export async function hasPasskeysAvailable() {
//   if (!isPasskeySupported()) return false;

//   try {
//     // Check if conditional mediation is available (indicates passkeys exist)
//     const available =
//       await window.PublicKeyCredential.isConditionalMediationAvailable();
//     return available;
//   } catch (error) {
//     console.warn('[PASSKEY] Error checking passkey availability:', error);
//     return false;
//   }
// }

// /**
//  * Register a new passkey for the currently signed-in user
//  * User must be authenticated first (e.g., with Google sign-in)
//  * @returns {Promise<{success: boolean, error?: Error}>}
//  */
// export async function registerNewPasskey() {
//   const user = getCurrentUser();

//   if (!user) {
//     const error = new Error('User must be signed in to register a passkey');
//     console.error('[PASSKEY]', error.message);
//     return { success: false, error };
//   }

//   if (!isPasskeySupported()) {
//     const error = new Error(
//       'Passkeys are not supported on this device/browser'
//     );
//     console.error('[PASSKEY]', error.message);
//     return { success: false, error };
//   }

//   try {
//     console.log('[PASSKEY] Starting passkey enrollment for user:', user.uid);

//     // Start the enrollment process - Firebase generates challenge & options
//     const multiFactorUser = multiFactor(user);
//     const session = await multiFactorUser.getSession();

//     // Create WebAuthn provider for enrollment
//     const webAuthnProvider = new WebAuthnProvider();

//     // Get the assertion (this triggers the browser's passkey creation UI)
//     const assertionResponse = await webAuthnProvider.generateCredential({
//       user: {
//         displayName: user.displayName || user.email || 'User',
//         name: user.email || user.uid,
//       },
//       session,
//     });

//     console.log('[PASSKEY] Credential generated, enrolling with Firebase...');

//     // Enroll the passkey with Firebase
//     await multiFactorUser.enroll(
//       assertionResponse,
//       user.displayName || 'Primary Device'
//     );

//     console.log('[PASSKEY] ✅ Passkey enrolled successfully');
//     return { success: true };
//   } catch (error) {
//     console.error('[PASSKEY] ❌ Passkey enrollment failed:', error);

//     // Handle common errors
//     if (error.name === 'NotAllowedError') {
//       console.log('[PASSKEY] User cancelled passkey creation');
//     } else if (error.code === 'auth/invalid-multi-factor-session') {
//       console.log(
//         '[PASSKEY] Invalid session - user may need to re-authenticate'
//       );
//     }

//     return { success: false, error };
//   }
// }

// /**
//  * Sign in with an existing passkey
//  * This is a passwordless authentication method
//  * @returns {Promise<{success: boolean, user?: import('firebase/auth').User, error?: Error}>}
//  */
// export async function signInWithPasskey() {
//   if (!isPasskeySupported()) {
//     const error = new Error(
//       'Passkeys are not supported on this device/browser'
//     );
//     console.error('[PASSKEY]', error.message);
//     alert('Passkeys are not supported on this browser/device.');
//     return { success: false, error };
//   }

//   try {
//     console.log('[PASSKEY] Starting passkey sign-in...');

//     // Create WebAuthn provider
//     const webAuthnProvider = new WebAuthnProvider();

//     // Sign in with passkey - this will show the browser's passkey selection UI
//     const userCredential = await signInWithCredential(
//       auth,
//       webAuthnProvider.credential()
//     );

//     const user = userCredential.user;
//     console.log('[PASSKEY] ✅ Signed in successfully:', user.email || user.uid);

//     return { success: true, user };
//   } catch (error) {
//     console.error('[PASSKEY] ❌ Passkey sign-in failed:', error);

//     // Handle common errors
//     if (error.name === 'NotAllowedError') {
//       console.log('[PASSKEY] User cancelled passkey selection');
//     } else if (error.code === 'auth/invalid-credential') {
//       alert(
//         'No passkey found or passkey is invalid. Please sign in another way.'
//       );
//     } else if (error.code === 'auth/user-not-found') {
//       alert('No account found with this passkey.');
//     } else {
//       alert(`Passkey sign-in failed: ${error.message}`);
//     }

//     return { success: false, error };
//   }
// }
// ============================================================================
// LEGACY PASSKEY AUTHENTICATION CODE - KEEP FOR REFERENCE
// ============================================================================
// async function signInWithPasskey() {
//   // 1. Prepare WebAuthn options for sign-in from Firebase Auth
//   const webAuthnProvider = new WebAuthnProvider();
//   let credentialRequestOptions;

//   try {
//     // Generate the challenge and other options from Firebase
//     credentialRequestOptions =
//       await webAuthnProvider.getCredentialRequestOptions();
//     console.log('Credential Request Options:', credentialRequestOptions);
//   } catch (error) {
//     console.error('Error getting credential request options:', error.message);
//     // Handle error, e.g., no passkeys registered for this site, or user cancelled
//     return;
//   }

//   try {
//     // 2. Ask the browser/device to get an existing passkey credential
//     // This will prompt the user for biometrics
//     const assertion = await navigator.credentials.get({
//       publicKey: credentialRequestOptions.publicKey,
//     });

//     console.log('Passkey assertion received from device:', assertion);

//     // 3. Sign in the user with the received passkey assertion
//     const webAuthnCredential = WebAuthnCredential.fromJSON(assertion);
//     await signInWithCredential(auth, webAuthnCredential);

//     console.log('User signed in with passkey!');
//     alert('Signed in with Passkey successfully!');
//   } catch (error) {
//     console.error('Error getting or signing in with passkey:', error.message);
//     // User likely cancelled the biometric prompt or an error occurred
//     alert('Passkey sign-in failed or cancelled.');
//   }
// }

// // Example usage (e.g., on a sign-in button click)
// // signInWithPasskey();

// // This is typically done after a user has already signed in
// // (e.g., with email/password) and wants to add a passkey
// // to their account for easier future logins or as a second factor.
// export async function registerNewPasskey(currentUser) {
//   if (!currentUser) {
//     console.error('No user signed in to register a passkey.');
//     return;
//   }

//   // 1. Prepare WebAuthn options using Firebase Auth's WebAuthnProvider
//   // The 'options' object is largely managed by Firebase, but you can pass client-side preferences
//   const webAuthnProvider = new WebAuthnProvider();
//   let credentialCreationOptions;

//   try {
//     // Generate the challenge and other options from Firebase
//     // This is the crucial step where Firebase prepares the WebAuthn request
//     credentialCreationOptions =
//       await webAuthnProvider.getCredentialCreationOptions();
//     console.log('Credential Creation Options:', credentialCreationOptions);
//   } catch (error) {
//     console.error('Error getting credential creation options:', error.message);
//     // Handle error, e.g., user cancelled or device doesn't support
//     return;
//   }

//   try {
//     // 2. Ask the browser/device to create a new passkey credential
//     // This will prompt the user for biometrics (Face ID, Touch ID, etc.)
//     const credential = await navigator.credentials.create({
//       publicKey: credentialCreationOptions.publicKey,
//     });

//     console.log('Passkey created by device:', credential);

//     // 3. Enroll the created passkey with the current Firebase user
//     const webAuthnCredential = WebAuthnCredential.fromJSON(credential);
//     const multiFactorSession = await multiFactor(currentUser).getSession(); // Get multi-factor session
//     await multiFactor(currentUser).enroll(
//       webAuthnCredential,
//       multiFactorSession
//     );

//     console.log('Passkey successfully registered to user:', currentUser.uid);
//     alert('Passkey registered successfully!');
//   } catch (error) {
//     console.error('Error creating or enrolling passkey:', error.message);
//     // User likely cancelled the biometric prompt or an error occurred
//     alert('Passkey registration failed or cancelled.');
//   }
// }

// // Example usage (assuming a user is signed in)
// // const user = auth.currentUser;
// // if (user) {
// //   registerNewPasskey(user);
// // }

// function isPasskeySupported() {
//   // Check if the browser supports WebAuthn API
//   const isWebAuthnSupported = !!window.PublicKeyCredential;

//   // Further checks can be added for specific features like conditional mediation
//   // (though the Firebase SDK generally abstracts this for basic passkey flows)
//   // For example, if you specifically need cross-device passkeys, you might check
//   // if PublicKeyCredential.isConditionalMediationAvailable() returns true.

//   return isWebAuthnSupported;
// }

// /**  Usage example:
//       if (isPasskeySupported()) {
//         // Show "Sign in with Passkey" or "Add Passkey" buttons
//         document.getElementById('passkeySignInButton').style.display = 'block';
//         document.getElementById('passkeyRegisterButton').style.display = 'block';
//       } else {
//         // Hide passkey options and maybe show a message that it's not supported
//         document.getElementById('passkeySignInButton').style.display = 'none';
//         document.getElementById('passkeyRegisterButton').style.display = 'none';
//         console.log('Passkeys not supported in this browser/device environment.');
//       }
// */
