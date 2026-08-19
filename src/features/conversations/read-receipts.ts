// Single on/off switch for the read-receipt checkmark. Static for now (env
// var, no reload needed beyond a rebuild); the settings-menu slice will swap
// the body for a per-user signal without touching call sites, which only ever
// call readReceiptsEnabled().
//
// Scope: this hides OTHERS' checkmarks on this client. It does NOT stop your
// own reads from being disclosed — the server broadcasts every read marker and
// getMembers returns last_read_at to all members regardless. A "don't disclose
// my read status" setting needs server enforcement (suppress the broadcast and
// null the column for opted-out users), not a change here.
const READ_RECEIPTS_ENABLED =
  import.meta.env.VITE_READ_RECEIPTS_ENABLED !== 'false';

export function readReceiptsEnabled(): boolean {
  return READ_RECEIPTS_ENABLED;
}
