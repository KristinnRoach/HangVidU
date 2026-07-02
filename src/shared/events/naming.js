// Canonical 4-part event name contract:
// <kind>:<domain>:<entity>:<action>
// kind: cmd | evt
// domain semantics:
// - cmd: target domain that owns the handler
// - evt: domain the fact is about (not necessarily the publisher)
export const EVENT_NAME_REGEX =
  /^(cmd|evt):[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/;

export function isCanonicalEventName(name) {
  return EVENT_NAME_REGEX.test(name);
}

export function assertCanonicalEventName(name, kind = 'event') {
  const expectedPrefix = kind === 'command' ? 'cmd:' : 'evt:';
  const hasExpectedPrefix =
    typeof name === 'string' && name.startsWith(expectedPrefix);

  if (hasExpectedPrefix && isCanonicalEventName(name)) return;

  throw new Error(
    `[events] Invalid ${kind} name "${name}". Expected prefix "${expectedPrefix}" and <kind>:<domain>:<entity>:<action> matching ${EVENT_NAME_REGEX}`,
  );
}
