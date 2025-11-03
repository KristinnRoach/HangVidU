const RECENT_ROOMS_KEY = 'hangvidu_recent_rooms';
const MAX_RECENT = 3;
const ROOM_EXPIRY_HOURS = 24;

export function saveRecentRoom(roomId) {
  const rooms = getRecentRooms();
  const newRoom = {
    id: roomId,
    timestamp: Date.now(),
  };

  const filtered = rooms.filter((r) => r.id !== roomId);
  filtered.unshift(newRoom);

  localStorage.setItem(
    RECENT_ROOMS_KEY,
    JSON.stringify(filtered.slice(0, MAX_RECENT))
  );
}

export function getRecentRooms() {
  try {
    const stored = localStorage.getItem(RECENT_ROOMS_KEY);
    if (!stored) return [];

    const rooms = JSON.parse(stored);
    const cutoff = Date.now() - ROOM_EXPIRY_HOURS * 60 * 60 * 1000;

    return rooms.filter((room) => room.timestamp > cutoff);
  } catch {
    return [];
  }
}

export function clearRecentRooms() {
  localStorage.removeItem(RECENT_ROOMS_KEY);
}
