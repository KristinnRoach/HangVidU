# D1 data dictionary — hangvidu-data

Companion to `schema.snapshot.sql`. SQLite dialect on Cloudflare D1; foreign keys
enforced. One line per column: type, nullable (Y/N), meaning + what writes it.
Timestamps are integer epoch milliseconds. IDs are application-generated TEXT.

## users

Account directory. Rows are created both by the backfill and as a side effect of
conversation/message writes.

- `id` TEXT, N — Firebase Auth uid. Primary key.
- `display_name` TEXT, Y — shown name. NULL for FK-stub rows (deleted/identity-less accounts referenced only by a contact edge).
- `created_at` INT, N — row creation time.
- `photo_url` TEXT, Y — avatar URL. NULL if unknown.
- `username` TEXT, Y — public @handle. Unique when set (partial unique index). NULL when unassigned; assigned at login or backfill.
- `email_hash` TEXT, Y — base64 of lowercased email (`/`→`-`). Unique index. NULL until written by login or backfill. Used for exact-match discovery; raw email is not stored.
- `discoverable` INT, N, default 1 — 0/1 flag; 0 hides the account from handle/email lookup. No RTDB source; all backfilled rows take the default.
- `registered_at` INT, Y — first-login/registration time. NULL on stub rows and rows predating the column.

Notes: `username` uses a partial unique index (`WHERE username IS NOT NULL`); `email_hash` uses a plain unique index. Both permit multiple NULLs.

## conversations

One row per DM or group thread. Opaque `id` is the only handle used by messages, files, calls.

- `id` TEXT, N — opaque UUID. Primary key.
- `kind` TEXT, N — `'direct'` or `'group'` (CHECK).
- `dm_key` TEXT, Y — for direct chats, the two member uids sorted and joined `a:b`; unique. NULL for groups. Used to dedupe/resolve a DM to its single conversation.
- `title` TEXT, Y — group title. NULL for direct.
- `created_at` INT, N.
- `updated_at` INT, N.

## conversation_members

Membership join table.

- `conversation_id` TEXT, N — FK → conversations(id), ON DELETE CASCADE. PK part.
- `user_id` TEXT, N — FK → users(id), ON DELETE CASCADE. PK part.
- `joined_at` INT, N.

## messages

- `id` TEXT, N — PK.
- `conversation_id` TEXT, N — FK → conversations(id), CASCADE.
- `sender_id` TEXT, N — FK → users(id) (no cascade).
- `kind` TEXT, N — `'text'` or `'file'` (CHECK).
- `body` TEXT, Y — message text. CHECK requires NOT NULL when kind='text'.
- `created_at` INT, N.

## message_attachments

File payload metadata; bytes live in R2.

- `id` TEXT, N — PK.
- `message_id` TEXT, N — FK → messages(id), CASCADE.
- `r2_key` TEXT, N — object key in R2.
- `bucket` TEXT, N — R2 bucket name.
- `file_name` TEXT, N.
- `mime_type` TEXT, N.
- `file_size` INT, N — CHECK > 0.
- `width` INT, Y — CHECK NULL or > 0.
- `height` INT, Y — CHECK NULL or > 0.

## message_reactions

- `message_id` TEXT, N — FK → messages(id), CASCADE. PK part.
- `user_id` TEXT, N — FK → users(id), CASCADE. PK part.
- `reaction_key` TEXT, N — CHECK length 1–64. One reaction per user per message.

## contacts

Directed social-graph edge (owner saved contact). Two rows for a mutual pair.

- `owner_id` TEXT, N — FK → users(id), CASCADE. PK part.
- `contact_id` TEXT, N — FK → users(id), CASCADE. PK part. CHECK owner != contact.
- `nickname` TEXT, N, default '' — owner's label for the contact.
- `conversation_id` TEXT, Y — FK → conversations(id), ON DELETE SET NULL. The pair's DM. NULL until resolved/linked; resolvable from the member pair via `dm_key`.
- `saved_at` INT, N.
- `last_interaction_at` INT, N.

## contact_requests

Pending/resolved connection requests.

- `from_id` TEXT, N — FK → users(id), CASCADE. PK part.
- `to_id` TEXT, N — FK → users(id), CASCADE. PK part. CHECK from != to.
- `status` TEXT, N, default 'pending' — `'pending'|'accepted'|'declined'` (CHECK).
- `created_at` INT, N.
- `resolved_at` INT, Y — set when status leaves 'pending' (accept/decline); NULL while pending, re-cleared if a declined request is re-sent.
