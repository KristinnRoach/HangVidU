# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://hangvidu.com/](https://hangvidu.com/)

## Usage

1. Click the "Call" button to generate a one-time video chat link
2. Share the link with a partner
3. Partner opens the link in a browser to start video chat
4. Search youtube videos or paste direct url to hosted video in search bar
5. Watch in sync with your partner

## Stack

- WebRTC for P2P connection, Firebase for signaling

## Deployment

- Deployment target: Firebase Hosting.
- Deploy (with compatibility tests): `pnpm deploy:fb`
- PWA updates are user-controlled (in-app prompt) before activation.

## Limitations

- Currently only supports 1-to-1 chats and calls
