import { createSignal } from 'solid-js';
import { getAuthState, onAuthStateChanged } from './auth-state.js';

const [authState, setAuthState] = createSignal(getAuthState());
let unsubscribeAuthState = null;

/**
 * Sync the imperative auth-state module into Solid reactivity.
 *
 * @returns {() => void}
 */
export function setupSolidAuthState() {
  if (unsubscribeAuthState) return () => {};

  unsubscribeAuthState = onAuthStateChanged((nextState) => {
    setAuthState(nextState);
  });

  return () => {
    if (!unsubscribeAuthState) return;
    unsubscribeAuthState();
    unsubscribeAuthState = null;
    setAuthState(getAuthState());
  };
}

export function useAuth() {
  return {
    authState,
    isLoggedIn: () => authState().isLoggedIn,
    status: () => authState().status, // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
    user: () => authState().user,
    isLoading: () => authState().status === 'loading',
    isLoggingIn: () =>
      authState().status === 'loading' && !authState().isLoggedIn,
    isLoggingOut: () =>
      authState().status === 'loading' && authState().isLoggedIn,
  };
}
