# User Naming Conventions

## Purpose

Define clear naming for user identity vs local contact aliases.

## Canonical Terms

### `username`

- Meaning: A user's own HangVidU name (self-chosen app identity).
- Scope: Global per user profile.
- Example: User B sets `username` to `"B"`.

### `contactNickName`

- Meaning: Local alias/nickname one user saves for another user in Contacts.
- Scope: Local to the contact owner.
- Example: User A renames User B to `"Bestie"`.

### `conversationDisplayName`

- Meaning: Name shown in messaging UI for a conversation.
- Resolution order:
  1. `contactNickName`
  2. `username`
  3. fallback placeholder

## Rule of Thumb

- Use `username` for profile identity.
- Use `contactNickName` for local overrides.
- Use `conversationDisplayName` only for computed UI output, not persisted identity.
