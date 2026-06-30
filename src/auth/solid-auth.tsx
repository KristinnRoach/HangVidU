import {
  createContext,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
  type Accessor,
  type JSX,
} from 'solid-js';
import { getAuthState } from './auth-state.js';
import { subscribe } from '../shared/events/index.js';

export type AuthStatus =
  | 'uninitialized'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

export type AuthUser = {
  uid: string;
  email: string | null;
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
 * Seeds from the current snapshot, then mirrors the canonical
 * `evt:auth:state:changed` event, tearing the subscription down on unmount.
 */
export function AuthProvider(props: { children: JSX.Element }) {
  const [snapshot, setSnapshot] = createSignal<AuthSnapshot>(
    getAuthState() as AuthSnapshot,
  );

  const unsubscribe = subscribe(
    'evt:auth:state:changed',
    ({ state }: { state: AuthSnapshot }) => setSnapshot(state),
  );
  onCleanup(() => unsubscribe());

  const user = createMemo(() => snapshot().user);
  const status = createMemo(() => snapshot().status);
  const isAuthInitialized = createMemo(() => status() !== 'uninitialized');
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
