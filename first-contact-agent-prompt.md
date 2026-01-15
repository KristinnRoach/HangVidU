# Agent Prompt: Implement First Contact System for HangVidU

## Context

You are working on HangVidU, a peer-to-peer video chat application. The app already has working:
- Google Sign-In authentication
- WebRTC P2P video calling
- Contact saving and calling (after initial connection)
- Text messaging and file sharing between contacts

**The Problem:** The initial connection between two users is painful. Currently users must share a link via external tools (WhatsApp, email, etc.) to make their first connection. We want to enable in-app contact discovery and invitations.

**Important Files to Read First:**
- `CLAUDE.md` - Project overview and architecture
- `first-contact-roadmap.md` - Detailed implementation plan
- `src/firebase/auth.js` - Current Google auth implementation
- `src/components/contacts/contacts.js` - Current contacts system
- `src/main.js` - App initialization and event handling

## Your Task

Implement the First Contact system as described in `first-contact-roadmap.md`. Work through the phases in order:

### Phase 1: User Discovery System
Create a system where users can find each other by email address.

1. Create `src/contacts/user-discovery.js` with:
   - `hashEmail(email)` - Create Firebase-safe key from email (use btoa, lowercase, strip special chars)
   - `registerUserInDirectory(user)` - Write user info to `/usersByEmail/{hash}`
   - `findUserByEmail(email)` - Lookup single user
   - `findUsersByEmails(emails)` - Batch lookup

2. Integrate with auth:
   - In `src/firebase/auth.js`, call `registerUserInDirectory()` after successful Google sign-in
   - Ensure it's called both for new sign-ins and existing sessions (onAuthStateChanged)

3. Add Firebase Security Rules for `/usersByEmail`:
   - Readable by any authenticated user
   - Each user can only write their own entry (validate uid matches)

### Phase 2: Google Contacts Import
Enable fetching contacts from Google People API.

1. Update `src/firebase/auth.js`:
   - Add scope: `https://www.googleapis.com/auth/contacts.readonly`
   - Store the Google access token after sign-in (from `credential.accessToken`)
   - Create `getGoogleAccessToken()` export to retrieve stored token

2. Create `src/contacts/google-contacts.js` with:
   - `fetchGoogleContacts(accessToken)` - Call People API, return array of `{name, email}`
   - `findRegisteredContacts(contacts)` - Cross-reference with usersByEmail, return `{registered: [], notRegistered: []}`

### Phase 3: In-App Invitation System
Allow sending contact invites without leaving the app.

1. Create `src/contacts/invitations.js` with:
   - `sendInvite(toUserId, toName, roomId)` - Write to `/users/{toUserId}/incomingInvites/{myUserId}`
   - `listenForInvites(callback)` - Subscribe to my `/incomingInvites`, call callback on changes
   - `acceptInvite(fromUserId, invite)` - Save contact, remove invite, notify sender
   - `declineInvite(fromUserId)` - Remove invite
   - `cleanupInviteListeners()` - Unsubscribe

2. Integrate invite listener in `src/main.js`:
   - After auth ready, call `listenForInvites()`
   - When invite received, show notification to user

3. Create `src/components/contacts/invite-notification.js`:
   - Simple UI component showing "{Name} wants to connect"
   - Accept and Decline buttons
   - Use existing confirm-dialog pattern or create standalone component

### Phase 4: Deterministic Room IDs
Ensure user pairs always get the same room ID.

1. Create `src/utils/room-id.js` with:
   - `getDeterministicRoomId(userId1, userId2)` - Sort IDs, concatenate, hash to 16 chars

2. Update `src/components/contacts/contacts.js`:
   - In the contact calling logic, if `contact.roomId` is null/undefined, derive it using `getDeterministicRoomId()`
   - Keep backwards compatibility with existing contacts that have explicit roomId

### Phase 5: Contact Import UI
Build the user-facing UI for adding contacts.

1. Create `src/components/contacts/add-contact-modal.js`:
   - Modal with two options: "Import from Google" and "Search by email"
   - For Google import: show contact list with checkboxes
   - Indicate which contacts are on HangVidU vs not
   - "Send Invites" button for registered contacts
   - "Invite via Email" button for non-registered contacts

2. Add "Add Contact" button to lobby in `index.html` or lobby component

### Phase 6: First-Time Onboarding
Guide new users through contact import.

1. Detect first-time users (no contacts saved)
2. After first sign-in, show prompt to import contacts
3. Allow skipping

## Technical Guidelines

- Follow existing code patterns in the codebase
- Use existing UI components where possible (confirm-dialog, modal patterns)
- Use Firebase RTDB for all data storage (not Firestore)
- Keep Firebase Security Rules secure (validate user ownership)
- Handle errors gracefully with user feedback
- Clean up listeners on component unmount / page unload

## Testing

After each phase, verify:
1. No console errors
2. Feature works as expected
3. Firebase data is written correctly (check Firebase console)
4. Existing functionality still works (video calls, messaging)

## Do NOT

- Modify the WebRTC connection logic unless necessary
- Break existing contact calling functionality
- Store sensitive data (like full contact lists) in Firebase
- Request unnecessary Google scopes

## Starting Point

Begin by reading the files mentioned above, then start with Phase 1. After completing each phase, briefly summarize what was done before moving to the next phase.

Ask clarifying questions if any requirements are unclear before implementing.
