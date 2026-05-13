import type { SolidP2PRoom } from '@kidlib/p2p/solid';

import {
  getVideoConstraints,
  getAudioConstraints,
} from './media-constraints.js';

type JoinCallRoomOptions = {
  p2p: SolidP2PRoom;
  createSignaling: any;
  roomId: string;
  localUserId: string;
  audioOnly?: boolean;
  getLocalStream?: () => Promise<MediaStream>;
  memberCapacity?: number;
  autoExitOnEmpty?: boolean;
  onEmpty?: () => void;
};

export async function joinCallRoom({
  p2p,
  createSignaling,
  roomId,
  localUserId,
  audioOnly = false,
  getLocalStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: audioOnly ? false : getVideoConstraints(),
      audio: import.meta.env.DEV && !audioOnly ? false : getAudioConstraints(),
    }),
  memberCapacity = 2,
  autoExitOnEmpty = true,
  onEmpty,
}: JoinCallRoomOptions) {
  await p2p.join({
    roomId,
    peerId: localUserId,
    createSignaling,
    getLocalStream,
    memberCapacity,
    dataChannel: true,
  });

  p2p.room().on('memberLeft', (detail) => {
    console.debug('Member left room:', { detail });
    if (autoExitOnEmpty && p2p.room().memberCount === 1) {
      onEmpty?.();
    }
  });

  import.meta.env.DEV &&
    console.debug(
      `Active room: ${p2p.room().roomId}, members: ${p2p.room().members.join(', ')}`,
    );

  return p2p.room();
}
