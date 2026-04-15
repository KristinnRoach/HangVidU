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

- WebRTC for P2P connection, Firebase for signaling

## Deployment

- Deployment target: Firebase Hosting.
- Deploy (with compatibility tests): `pnpm deploy:fb`
- PWA updates are user-controlled (in-app prompt) before activation.

## Limitations

- Currently only supports 1-to-1 chats and calls
