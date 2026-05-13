import { createEffect, createSignal, onCleanup, type Accessor } from 'solid-js';

import { getMessagesUI } from '../messaging/components/messages-ui.js';
import {
  FileTransferController,
  P2PRoomFileTransport,
  cleanupDefaultReceiveStore,
  createDefaultReceiveStore,
} from './index.js';

import { useP2PContext } from '../../shared/p2p-context.js';

type Options = {
  messagesUIReady: Accessor<boolean>;
};

export function useP2PFileTransferBridge({
  messagesUIReady,
}: Options) {
  const p2p = useP2PContext();
  const [dataChannelRevision, setDataChannelRevision] = createSignal(0);
  let cleanupFileTransfer: (() => void) | undefined;
  let activeFileTransferKey = '';

  function clearFileTransferController() {
    cleanupFileTransfer?.();
    cleanupFileTransfer = undefined;
    activeFileTransferKey = '';
    if (messagesUIReady()) {
      getMessagesUI()?.setFileTransferController(null);
    }
  }

  createEffect(() => {
    const room = p2p.room();
    if (!room) return;

    const bumpDataChannelRevision = () => {
      setDataChannelRevision((revision) => revision + 1);
    };

    const cleanups = [
      room.on('dataChannel', bumpDataChannelRevision),
      room.on('dataChannelOpen', bumpDataChannelRevision),
      room.on('dataChannelClose', bumpDataChannelRevision),
      room.on('memberLeft', bumpDataChannelRevision),
      room.on('membersChanged', bumpDataChannelRevision),
    ];

    onCleanup(() => {
      cleanups.forEach((cleanup) => cleanup());
    });
  });

  createEffect(() => {
    const room = p2p.room();
    dataChannelRevision();

    const dataChannels = p2p.dataChannels();
    const members = p2p.members();

    if (!messagesUIReady() || !room || p2p.state() !== 'joined') {
      clearFileTransferController();
      return;
    }

    const remoteMembers = members.filter(
      (memberId) => memberId !== room.peerId,
    );
    if (remoteMembers.length !== 1) {
      clearFileTransferController();
      return;
    }

    const memberId = remoteMembers[0];
    const channel = dataChannels.get(memberId);
    if (channel?.readyState !== 'open') {
      clearFileTransferController();
      return;
    }

    const nextKey = `${room.roomId ?? ''}:${room.peerId}:${memberId}`;
    if (activeFileTransferKey === nextKey) return;

    clearFileTransferController();

    const controller = new FileTransferController({
      transport: new P2PRoomFileTransport({ room, memberId }),
      createReceiveStore: createDefaultReceiveStore,
      cleanupReceiveStores: cleanupDefaultReceiveStore,
    });

    activeFileTransferKey = nextKey;
    cleanupFileTransfer = () => controller.cleanup();

    // Todo: decouple file transfer controller from messages UI when migrating to solidjs
    // const msgUI = getMessagesUI();
    // msgUI?.setFileTransferController(controller);
    // Todo: watch-sync: align with new p2p rooms transport / storage structure
    // msgUI?.setWatchFileHandler?.(createWatchFileHandler());
  });

  onCleanup(clearFileTransferController);
}
