import { initializeApp } from 'firebase/app';
import { getDatabase, off } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// ============================================================================
// FIREBASE CONFIG + INIT
// ============================================================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);

// ============================================================================
// FB LISTENER TRACKING
// ============================================================================

const firebaseListeners = [];

export function trackFirebaseListener(fbRef, type, callback) {
  firebaseListeners.push({ ref: fbRef, type, callback });
}

export function removeAllFirebaseListeners() {
  firebaseListeners.forEach(({ ref, type, callback }) => {
    off(ref, type, callback);
  });
  firebaseListeners.length = 0;
}

// ============================================================================
// FB AUTH
// ============================================================================

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Google Access Token to access the Google API
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('Signed in user:', user);
    console.log('Google Access Token:', token);
    alert(`Welcome, ${user.displayName}!`);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(
      'Error during Google sign-in:',
      errorMessage,
      errorCode,
      email,
      credential
    );
    alert(`Sign-in failed: ${errorMessage}`);
  }
}
