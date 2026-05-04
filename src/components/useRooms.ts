import { createSignal } from 'solid-js';

import {
  isLocalStreamError,
  isRoomFullError,
  P2PRoom,
  setLogger,
  watchP2PRoom,
  type P2PRoomOptions,
  type P2PRoomState,
  type CreateRoomSignalingOptions,
  joinP2PRoom,
} from '@kidlib/p2p';
import { createFirebaseRoomSignaling } from '../features/call/signaling/firebase-room-signaling';
import { devDebug } from '../shared/utils/dev/dev-utils';
import { setupRoomHandlers } from './setupRoomHandlers';

const assert: (condition: any, message?: string) => asserts condition = (
  condition,
  message,
) => {
  if (!condition) {
    throw new Error(message);
  }
};

const MAX_MEMBERS = 6;

const [live, setLive] = createSignal<P2PRoom[]>([]);
const [watchedRooms, setWatchedRooms] = createSignal<string[]>([]);

function init() {
  setLogger((...args) => {
    console.info('[P2P]', ...args);
  });

  setupRoomHandlers();
}

const getLiveRoom = () => {
  // Currently only one 'live' room is supported, meaning only one room can be 'joined' at a time, but open to extension
  return live()[0];
};

// Exported Getters
const isLive = () => !!(live().length > 0);

const isInRoomWithId = (roomId?: string | null) =>
  !!(roomId?.length && live().some((room) => room.roomId === roomId));

const isWatchingRoomWithId = (roomId?: string | null) =>
  !!(roomId?.length && watchedRooms().includes(roomId));

// Exported Setters
function addJoinedRoom(room: P2PRoom) {
  setLive((prev) => [...prev, room]);

  devDebug('Joined room:', {
    roomId: room.roomId,
    liveRooms: live().map((r) => r.roomId),
  });
}

function removeJoinedRoom(room: P2PRoom) {
  setLive((prev) => prev.filter((r) => r !== room));
}

function addWatchedRoom(roomId: string) {
  setWatchedRooms((prev) => [...prev, roomId]);
}

function removeWatchedRoom(roomId: string) {
  setWatchedRooms((prev) => prev.filter((id) => id !== roomId));
}

// Actions

async function watchRoom(roomOptions: Partial<P2PRoomOptions>) {
  const createSignaling = createFirebaseRoomSignaling; // Temp solution
  const { roomId, onStateChange, onError, onFull } = roomOptions;
  assert(typeof roomId === 'string' && roomId.length > 0, 'Invalid roomId');
  assert(typeof createSignaling === 'function', 'createSignaling not fn');
  // Validate createSignaling using p2p helper when package version is bumped to include the helper

  if (isWatchingRoomWithId(roomId)) {
    console.debug('Already watching or in a room, skipping watchRoom call');
    return;
  }

  try {
    const room2watch = await watchP2PRoom({
      roomId,
      peerId: crypto.randomUUID(),
      createSignaling,
      getLocalStream: () =>
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
      memberCapacity: MAX_MEMBERS,
      onStateChange,
      onError,
      onFull,
    });

    addWatchedRoom(roomId);

    room2watch.on('joined', () => {
      addJoinedRoom(room2watch);
    });

    room2watch.on('left', () => {
      removeJoinedRoom(room2watch);
    });

    room2watch.on('closed', () => {
      removeWatchedRoom(roomId);
    });

    room2watch.on('memberStream', ({ stream }) => {
      console.debug('New member stream:', { stream });
      const shouldJoin = window.confirm('Room received stream, join?');
      if (shouldJoin) {
        joinRoom(roomId);
      } else {
        console.debug('User declined to join room after receiving stream');
      }
    });

    // todo: check why 'event' is needed in params for onstatechange and onerror
    // room2watch.on('statechange', ({ state }) => onStateChange?.({ state }));
    // room2watch.on('error', (detail, event) => onError?.(detail, event));
  } catch (err) {
    console.error('Error watching room:', err);
    return;
  }
}

async function joinRoom(roomId: string) {
  if (isInRoomWithId(roomId)) {
    console.debug('Already joined room, skipping joinRoom call');
    return;
  }

  const room = getLiveRoom();

  if (!room || room.roomId !== roomId) {
    console.error(
      'joinRoom(): Must watch room before joining. Call watchRoom() first.',
      { roomId },
    );
    return;
  }

  try {
    await room.join();
    addJoinedRoom(room);
  } catch (err) {
    if (isRoomFullError(err)) {
      console.error('Room is full:', err);
    } else if (isLocalStreamError(err)) {
      console.error('Could not access camera or microphone.', err);
    } else {
      console.error('Could not join room.', err);
    }
  }
}

async function enterRoom(roomId: string) {
  // await watchRoom({ roomId });
  // await joinRoom(roomId);

  const room = await joinP2PRoom({
    roomId,
    peerId: crypto.randomUUID(),
    createSignaling: createFirebaseRoomSignaling,
    getLocalStream: () =>
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
    memberCapacity: MAX_MEMBERS,
  });

  addJoinedRoom(room);

  import.meta.env.DEV &&
    console.debug(
      `[useRooms] Live room (should be 1): ${live()
        .map((r) => r.roomId)
        .join(', ')} 
        Watching rooms: ${watchedRooms().join(', ')}`,
    );
}

async function exitRoom(roomId: string) {
  const room = live().find((r) => r.roomId === roomId);
  if (!room) {
    console.error('Could not find room to leave with id', { roomId });
    return;
  }
  room.leave();
  removeJoinedRoom(room);
}

async function cleanupRooms() {
  live().forEach((room) => room.close());
  setLive([]);
  setWatchedRooms([]);
}

export const useRooms = () => {
  return {
    init, // placeholder
    watchRoom,
    joinRoom,
    enterRoom,
    exitRoom,
    getLiveRoom,
    isLive,
    isInRoomWithId,
    isWatchingRoomWithId,
    cleanupRooms,
  };
};
