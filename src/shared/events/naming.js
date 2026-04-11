// Canonical 4-part event name contract:
// <kind>:<domain>:<entity>:<action>
// kind: cmd | evt
export const EVENT_NAME_REGEX =
  /^(cmd|evt):[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/;

export const LEGACY_EVENT_NAME_ALIASES = Object.freeze({
  'auth:cloud-function:call': 'cmd:auth:cloud-function:call',
  'auth:delete-account-requested': 'cmd:auth:account:delete-requested',
  'auth:login': 'evt:auth:session:login',
  'auth:login-requested': 'cmd:auth:session:login-requested',
  'auth:logout': 'evt:auth:session:logout',
  'auth:logout-requested': 'cmd:auth:session:logout-requested',
  'auth:ready': 'evt:auth:session:ready',
  'call:incoming:accepted': 'evt:call:incoming:accepted',
  'call:outgoing:initiate': 'cmd:call:outgoing:initiate',
  'call:unanswered': 'evt:call:session:unanswered',
  'contact:deleted': 'evt:contacts:contact:deleted',
  'contact:save:prompt': 'cmd:contacts:contact:save-prompt',
  'contacts:get-by-room-id': 'cmd:contacts:contact:get-by-room-id',
  'contacts:invite:notification:add': 'cmd:contacts:invite-notification:add',
  'contacts:invite:notification:remove':
    'cmd:contacts:invite-notification:remove',
  'contacts:referral:notification:add':
    'cmd:contacts:referral-notification:add',
  'contacts:referral:notification:remove':
    'cmd:contacts:referral-notification:remove',
  'messaging:conversation:select': 'cmd:messaging:conversation:select',
  'messaging:conversation:unread-count:changed':
    'evt:messaging:conversation:unread-count-changed',
  'messaging:conversation:unread-count:listen':
    'cmd:messaging:conversation:unread-count-listen',
  'messaging:conversation:unread-count:unlisten':
    'cmd:messaging:conversation:unread-count-unlisten',
  'push:disable': 'cmd:push:subscription:disable',
  'room:id:created': 'evt:room:id:created',
  'room:id:updated': 'evt:room:id:updated',
  'room:joinOrCreate:failed': 'evt:room:lifecycle:join-or-create-failed',
  'user:presence:set-offline': 'cmd:user:presence:set-offline',
});

const warnedLegacyNames = new Set();

export function isCanonicalEventName(name) {
  return EVENT_NAME_REGEX.test(name);
}

export function isAllowedEventNameDuringMigration(name) {
  return (
    isCanonicalEventName(name) ||
    Object.prototype.hasOwnProperty.call(LEGACY_EVENT_NAME_ALIASES, name)
  );
}

export function resolveEventName(name, { warnOnLegacy = true } = {}) {
  const canonical = LEGACY_EVENT_NAME_ALIASES[name] ?? name;
  const isLegacy = canonical !== name;

  if (warnOnLegacy && isLegacy && !warnedLegacyNames.has(name)) {
    warnedLegacyNames.add(name);
    console.warn(`[events] Legacy name "${name}" -> "${canonical}"`);
  }

  return canonical;
}

