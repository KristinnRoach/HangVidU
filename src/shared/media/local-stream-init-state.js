let hasInitLocalStreamAndMedia = false;

export function hasInitializedLocalStream() {
  return hasInitLocalStreamAndMedia;
}

export function markLocalStreamInitialized() {
  hasInitLocalStreamAndMedia = true;
}

export function resetLocalStreamInitFlag() {
  hasInitLocalStreamAndMedia = false;
}
