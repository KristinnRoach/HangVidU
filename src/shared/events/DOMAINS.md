# Event Domains

Reference list for the second segment of `<kind>:<domain>:<entity>:<action>`.

- For `cmd:`, `domain` is the target domain that owns the handler.
- For `evt:`, `domain` is the domain the fact is about.
- Keep this list tight so we can enforce it with a schema later.

## Distinction

- `app-notifications`: in-app notification UI and notification-list behavior
- `push`: web push subscription / delivery behavior

Do not use `push` for in-app notification commands, and do not use
`app-notifications` for browser push subscription or delivery concerns.

## Currently Used `cmd` Domains

- `app-notifications`
- `auth`
- `dialog`
- `push`
- `user`

## Currently Used `evt` Domains

- `auth`
- `call`
- `conversation`
