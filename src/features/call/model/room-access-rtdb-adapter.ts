import { ref, remove, set, type Database } from 'firebase/database';

const ROOM_ACCESS_TTL_MS = 2 * 60 * 60 * 1000;

interface CreateRoomAccessInput {
  roomId: string;
  createdBy: string;
  participants: string[];
  createdAt?: number;
  expiresAt?: number;
}

export class RoomAccessRTDBAdapter {
  private database: Database;

  constructor({ database }: { database: Database }) {
    if (!database) {
      throw new TypeError('database is required');
    }
    this.database = database;
  }

  async createRoomAccess({
    roomId,
    createdBy,
    participants,
    createdAt = Date.now(),
    expiresAt = createdAt + ROOM_ACCESS_TTL_MS,
  }: CreateRoomAccessInput): Promise<void> {
    if (!roomId || !createdBy || participants.length === 0) return;

    const uniqueParticipants = [...new Set([createdBy, ...participants])];
    await set(ref(this.database, `rooms/${roomId}/meta`), {
      createdBy,
      createdAt,
      expiresAt,
    });

    await Promise.all(
      uniqueParticipants.map((uid) =>
        set(ref(this.database, `rooms/${roomId}/participants/${uid}`), true),
      ),
    );
  }

  async clearRoomAccess(roomId: string): Promise<void> {
    if (!roomId) return;
    await remove(ref(this.database, `rooms/${roomId}`));
  }
}

export function createRoomAccessRTDBAdapter(options: {
  database: Database;
}): RoomAccessRTDBAdapter {
  return new RoomAccessRTDBAdapter(options);
}
