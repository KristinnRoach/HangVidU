let hasInitLocalStreamAndMedia = false;

export function hasInitializedLocalStreamAndMedia() {
  return hasInitLocalStreamAndMedia;
}

export function markLocalStreamAndMediaInitialized() {
  hasInitLocalStreamAndMedia = true;
}

export function resetLocalStreamInitFlag() {
  hasInitLocalStreamAndMedia = false;
}
