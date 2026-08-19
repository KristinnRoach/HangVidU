// Single on/off switch for the read-receipt checkmark. Static for now (env
// var, no reload needed beyond a rebuild); the settings-menu slice will swap
// the body for a per-user signal (disclose my read status / show others'
// checkmarks) without touching call sites, which only ever call
// readReceiptsEnabled().
const READ_RECEIPTS_ENABLED =
  import.meta.env.VITE_READ_RECEIPTS_ENABLED !== 'false';

export function readReceiptsEnabled(): boolean {
  return READ_RECEIPTS_ENABLED;
}
