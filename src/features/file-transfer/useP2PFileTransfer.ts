import { createEffect, createSignal, onCleanup } from 'solid-js';
import { useP2PContext } from '../../shared/p2p-context.js';
import {
  FileTransferController,
  P2PRoomFileTransport,
  cleanupDefaultReceiveStore,
  createDefaultReceiveStore,
} from './index.js';

/**
 * Modern, minimal hook providing a reactive FileTransferController
 * instance when a 1:1 P2P connection with an open data channel is ready.
 */
export function useP2PFileTransfer() {
  const p2p = useP2PContext();
  const [controller, setController] =
    createSignal<FileTransferController | null>(null);
  const [dataChannelRevision, setDataChannelRevision] = createSignal(0);

  let activeKey = '';

  // Track relevant room events to trigger re-evaluation of channel readiness
  createEffect(() => {
    const room = p2p.room();
    if (!room) return;

    const bumpRevision = () => setDataChannelRevision((r) => r + 1);

    const cleanups = [
      room.on('dataChannel', bumpRevision),
      room.on('dataChannelOpen', bumpRevision),
      room.on('dataChannelClose', bumpRevision),
      room.on('memberLeft', bumpRevision),
      room.on('membersChanged', bumpRevision),
    ];

    onCleanup(() => cleanups.forEach((cleanup) => cleanup()));
  });

  // Evaluate readiness and instantiate/cleanup the controller
  createEffect(() => {
    const room = p2p.room();
    dataChannelRevision(); // track channel state changes

    const dataChannels = p2p.dataChannels();
    const members = p2p.members();

    if (!room || p2p.state() !== 'joined') {
      activeKey = '';
      setController(null);
      return;
    }

    const remoteMembers = members.filter(
      (memberId) => memberId !== room.peerId,
    );
    if (remoteMembers.length !== 1) {
      activeKey = '';
      setController(null);
      return;
    }

    const memberId = remoteMembers[0];
    const channel = dataChannels.get(memberId);
    if (channel?.readyState !== 'open') {
      activeKey = '';
      setController(null);
      return;
    }

    const nextKey = `${room.roomId ?? ''}:${room.peerId}:${memberId}`;
    if (activeKey === nextKey) return;

    activeKey = nextKey;

    const newController = new FileTransferController({
      transport: new P2PRoomFileTransport({ room, memberId }),
      createReceiveStore: createDefaultReceiveStore,
      cleanupReceiveStores: cleanupDefaultReceiveStore,
    });

    setController(newController);

    onCleanup(() => {
      newController.cleanup();
      if (activeKey === nextKey) {
        activeKey = '';
      }
    });
  });

  return controller;
}
