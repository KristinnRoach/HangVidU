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
  isAuthInitialized: Accessor<boolean>;
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
  const [snapshot, setSnapshot] = createSignal<AuthSnapshot>(
    getAuthState() as AuthSnapshot,
  );

  const unsubscribe = onAuthStateChanged((next) =>
    setSnapshot(next as AuthSnapshot),
  );
  onCleanup(unsubscribe);

  const user = createMemo(() => snapshot().user);
  const status = createMemo(() => snapshot().status);
  const isAuthInitialized = createMemo(() => status() !== 'idle');
  const isLoading = createMemo(() => status() === 'loading');
  const isLoggedIn = createMemo(() => snapshot().isLoggedIn);
  const isLoggingIn = createMemo(() => isLoading() && !isLoggedIn());
  const isLoggingOut = createMemo(() => isLoading() && isLoggedIn());

  const value: Auth = {
    user,
    status,
    isLoggedIn,
    isAuthInitialized,
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
