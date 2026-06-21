# HangVidU

Peer-to-peer video chat app with text messaging and synced media sharing capabilities.

## Try it now

**Live demo**: [https://hangvidu.com/](https://hangvidu.com/)

## Usage

1. Login via Google
2. Click "Add Contacts" button in top bar
3. Send invite link to add contacts and/or import your Google contacts and select bulk invite
4. Video call, send messages and watch videos with your contacts

## Stack

- WebRTC for P2P media; Cloudflare Workers, Durable Objects, D1, and R2 for
  signaling, messaging, and attachments
- Firebase Auth, Hosting, Functions, and RTDB-backed contacts
- Firebase Functions dependencies are npm-managed; use the root `*:fb:functions` scripts or run `npm` inside `backend/firebase/`, not `pnpm` there.

## Limitations

- Currently only supports 1-to-1 chats and calls (no groups)
