import {
  createContext,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
  type Accessor,
  type JSX,
} from 'solid-js';
import { getAuthState, onAuthStateChanged } from './auth-state.js';

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

export type AuthUser = {
  uid: string;
  userName: string | null;
  email: string | null;
  photoURL: string | null;
};

export type AuthSnapshot = {
  status: AuthStatus;
  user: AuthUser | null;
  isLoggedIn: boolean;
};

export type Auth = {
  user: Accessor<AuthUser | null>;
  status: Accessor<AuthStatus>;
  isLoggedIn: Accessor<boolean>;
  isAuthReady: Accessor<boolean>;
  isLoading: Accessor<boolean>;
  isLoggingIn: Accessor<boolean>;
  isLoggingOut: Accessor<boolean>;
};

const AuthContext = createContext<Auth>();

/**
 * Provides Solid-reactive auth state to descendants.
 * Owns the subscription to the imperative auth-state module and tears it
 * down on unmount.
 */
export function AuthProvider(props: { children: JSX.Element }) {
  const [snapshot, setSnapshot] = createSignal<AuthSnapshot>(getAuthState());

  const unsubscribe = onAuthStateChanged((next: AuthSnapshot) =>
    setSnapshot(next),
  );
  onCleanup(unsubscribe);

  const status = createMemo(() => snapshot().status);
  const isLoggedIn = createMemo(() => snapshot().isLoggedIn);
  const user = createMemo(() => snapshot().user);
  const isLoading = createMemo(() => status() === 'loading');
  const isAuthReady = createMemo(() => {
    const s = status();
    return s !== 'idle' && s !== 'loading';
  });
  const isLoggingIn = createMemo(() => isLoading() && !isLoggedIn());
  const isLoggingOut = createMemo(() => isLoading() && isLoggedIn());

  const value: Auth = {
    user,
    status,
    isLoggedIn,
    isAuthReady,
    isLoading,
    isLoggingIn,
    isLoggingOut,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth(): Auth {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be used inside <AuthProvider>');
  }
  return ctx;
}
