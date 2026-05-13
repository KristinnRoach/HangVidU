import { createContext, useContext } from 'solid-js';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

const P2PContext = createContext<SolidP2PRoom>();

export const P2PProvider = P2PContext.Provider;

export function useP2P(): SolidP2PRoom {
  const ctx = useContext(P2PContext);
  if (!ctx) throw new Error('useP2P must be used inside P2PProvider');
  return ctx;
}
