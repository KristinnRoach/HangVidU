import { createEffect, createSignal, onCleanup, type Accessor } from 'solid-js';

// Temporary migration bridge:
// Solid/P2P now owns active call room lifecycle, while the legacy messages UI
// still owns file-transfer rendering and watch-together actions. Keep this
// adapter narrow and delete it when those controls move into Solid.
import { getMessagesUI } from '../messaging/components/messages-ui.js';
import { createWatchFileHandler } from '../watch/watch-file-handler.js';
import { cleanupWatchSync, setupWatchSync } from '../watch/watch-sync.js';
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

export function useP2PFileTransferBridge({ messagesUIReady }: Options) {
  const p2p = useP2PContext();
  const [dataChannelRevision, setDataChannelRevision] = createSignal(0);
  let cleanupFileTransfer: (() => void) | undefined;
  let activeFileTransferKey = '';

  function ensureLegacyWatchSurface() {
    const sharedBoxElement = document.createElement('div');
    sharedBoxElement.id = 'shared-video-box';
    sharedBoxElement.className = 'hidden';

    const sharedVideoElement = document.createElement('video');
    sharedVideoElement.id = 'shared-video-el';
    sharedVideoElement.controls = true;
    sharedVideoElement.playsInline = true;

    sharedBoxElement.appendChild(sharedVideoElement);
    document.body.appendChild(sharedBoxElement);

    const ytBoxElement = document.createElement('div');
    ytBoxElement.id = 'yt-video-box';
    ytBoxElement.className = 'hidden';
    document.body.appendChild(ytBoxElement);

    return { sharedBoxElement, sharedVideoElement, ytBoxElement };
  }

  function clearFileTransferController() {
    cleanupFileTransfer?.();
    cleanupFileTransfer = undefined;
    activeFileTransferKey = '';

    const msgUI = getMessagesUI();
    msgUI?.setFileTransferController(null);
    msgUI?.setWatchFileHandler(null);
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
    cleanupFileTransfer = () => {
      controller.cleanup();
      cleanupWatchSync();
    };

    const { sharedBoxElement, sharedVideoElement } = ensureLegacyWatchSurface();
    setupWatchSync(
      room.roomId,
      'peer',
      room.peerId,
      sharedVideoElement,
      sharedBoxElement,
    );

    const msgUI = getMessagesUI();
    msgUI?.setWatchFileHandler(createWatchFileHandler());
    msgUI?.setFileTransferController(controller);

    sharedBoxElement.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        controller.cleanup();
        cleanupWatchSync();
        sharedBoxElement.hidden = true;
      }

      if (e.key === 'w' && e.shiftKey) {
        sharedBoxElement.hidden = !sharedBoxElement.hidden;
      }
    });
  });

  onCleanup(clearFileTransferController);
}
