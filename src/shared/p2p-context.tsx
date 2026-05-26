import { createContext, useContext, type ParentProps } from 'solid-js';
import { useP2PRoom, type SolidP2PRoom } from '@kidlib/p2p/solid';

const P2PContext = createContext<SolidP2PRoom>();

export function P2PProvider(props: ParentProps) {
  const p2p = useP2PRoom();

  return (
    <P2PContext.Provider value={p2p}>
      {props.children}
    </P2PContext.Provider>
  );
}

export function useP2PContext(): SolidP2PRoom {
  const ctx = useContext(P2PContext);
  if (!ctx) throw new Error('useP2PContext must be used inside P2PProvider');
  return ctx;
}
