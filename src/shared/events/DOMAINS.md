# Event Domains

Reference list for the second segment of `<kind>:<domain>:<entity>:<action>`.

- For `cmd:`, `domain` is the target domain that owns the handler.
- For `evt:`, `domain` is the domain the fact is about.
- Keep this list tight so we can enforce it with a schema later.

## Distinction

- `notifications`: in-app notification UI and notification-list behavior
- `push`: web push subscription / delivery behavior

Do not use `push` for in-app notification commands, and do not use `notifications`
for browser push subscription or delivery concerns.

## Currently Used `cmd` Domains

- `auth`
- `call`
- `contacts`
- `dialog`
- `messaging`
- `notifications`
- `push`
- `user`

## Currently Used `evt` Domains

- `auth`
- `call`
- `contacts`
- `messaging`
- `room`

## Notes

- `contacts` currently includes room/contact lookup and contact lifecycle facts.
- `dialog` is the target domain for app-modal state.
- `room` is currently used only for room lifecycle facts.
