import { handleCommand } from '../shared/events';
import { useRooms } from './useRooms';
import { createFirebaseRoomSignaling } from '../features/call/signaling/firebase-room-signaling.js';
import { getDiagnosticLogger } from '../shared/utils/dev/diagnostic-logger';
import { getCurrentUserAsync, getLoggedInUserId, getUserId } from '../auth';
import { getAllContacts } from '../features/contacts';
import { getDeterministicRoomId } from '../shared/utils/room-id';
import { devDebug } from '../shared/utils/dev/dev-utils';

export function setupRoomHandlers() {
  handleCommand(
    'cmd:room:initiate:call',
    async (details: { roomId: string }) => {
      const { roomId } = details;
      if (typeof roomId !== 'string') {
        console.error('Invalid roomId in command payload', { roomId });
        return;
      }

      devDebug('[app] Initiating call with roomId', {
        roomId,
      });

      await useRooms().enterRoom(roomId).catch(console.error);
    },
  );

  handleCommand('cmd:room:hangup:call', (roomId: string) => {
    useRooms().exitRoom(roomId);
  });

  handleCommand('cmd:room:watch:room', async (details: { roomId: string }) => {
    const { roomId } = details;
    if (typeof roomId !== 'string') {
      console.error('Invalid roomId in command payload', { roomId });
      return;
    }

    try {
      await useRooms().watchRoom({
        roomId,
        createSignaling: createFirebaseRoomSignaling,
        // onStateChange: ({ state }) => setStatus(state),
      });
    } catch (error) {
      console.error('Error watching room:', error);
    }
  });

  startListeningForSavedRooms().catch((err) => {
    console.error('Error setting up room handlers:', err);
  });
}

/**
 * Read saved recent calls (RTDB or localStorage), remove expired entries,
 * and attach incoming listeners for each valid room id.
 */
async function startListeningForSavedRooms() {
  const startTime = Date.now();
  const toListen = new Set();
  getDiagnosticLogger().log('LISTENER', 'STARTUP_BEGIN', {
    timestamp: startTime,
    // currentListenerCount: getIncomingListenerCount(),
  });

  // Ensure auth state is initialized before deciding storage location
  // This prevents a race where we read localStorage as a guest before auth is ready
  try {
    await getCurrentUserAsync();
  } catch (e) {
    // non-fatal
  }

  const loggedInUid = getLoggedInUserId();
  getDiagnosticLogger().log('LISTENER', 'AUTH_STATE_DETERMINED', {
    isLoggedIn: !!loggedInUid,
    userId: loggedInUid || 'guest',
  });

  if (loggedInUid) {
    try {
      const contacts = getAllContacts();
      Object.entries(contacts || {}).forEach(([contactId, c]) => {
        if (c?.roomId) {
          toListen.add(c.roomId);
        } else if (contactId && loggedInUid) {
          // Generate deterministic room ID for contacts without explicit roomId
          try {
            const deterministicRoomId = getDeterministicRoomId(
              loggedInUid,
              contactId,
            );
            toListen.add(deterministicRoomId);
          } catch (e) {
            // Skip if unable to generate
          }
        }
      });
    } catch (e) {
      // ignore
    }

    toListen.forEach((roomId) => listenForIncomingOnRoom(roomId));

    getDiagnosticLogger().log('LISTENER', 'STARTUP_COMPLETE', {
      storage: 'rtdb',
      roomsToListen: Array.from(toListen),
      // totalListeners: getIncomingListenerCount(),
      duration: Date.now() - startTime,
    });
    return;
  }

  // Guest: localStorage
  try {
    const contacts = getAllContacts();
    const guestUserId = getUserId(); // Get guest user ID
    Object.entries(contacts || {}).forEach(([contactId, c]) => {
      if (c?.roomId) {
        toListen.add(c.roomId);
      } else if (contactId && guestUserId) {
        // Generate deterministic room ID for contacts without explicit roomId
        try {
          const deterministicRoomId = getDeterministicRoomId(
            guestUserId,
            contactId,
          );
          toListen.add(deterministicRoomId);
        } catch (e) {
          // Skip if unable to generate
        }
      }
    });
  } catch (e) {
    // ignore
  }

  toListen.forEach((roomId) => listenForIncomingOnRoom(roomId));

  getDiagnosticLogger().log('LISTENER', 'STARTUP_COMPLETE', {
    storage: 'localStorage',
    roomsToListen: Array.from(toListen),
    // totalListeners: getIncomingListenerCount(),
    duration: Date.now() - startTime,
  });
}

function listenForIncomingOnRoom(roomId: string) {
  console.debug('Setting up listener for incoming calls on room', { roomId });
  useRooms()
    .watchRoom({
      roomId,
      createSignaling: createFirebaseRoomSignaling,
      // onStateChange: ({ state }) => setStatus(state),
    })
    .catch((err) => {
      console.error('Error setting up listener for room', { roomId, err });
    });
}
