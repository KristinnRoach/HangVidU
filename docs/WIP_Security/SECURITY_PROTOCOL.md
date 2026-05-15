# HangVidU Security Protocol WIP

Purpose: remember to make the P2P call security answer explicit later.

## Current Short Answer

- HangVidU P2P calls use WebRTC.
- For the media path, the relevant security protocol is DTLS-SRTP.
- WebRTC uses DTLS to establish keys and SRTP to encrypt media in transit.
- Current implementation: Firebase Realtime Database is used for signaling:
  - room presence
  - SDP offer/answer exchange
  - ICE candidate exchange
- Signaling is intended to be adapter-backed and should not be documented as permanently requiring Firebase.
- Call audio/video is peer-to-peer by default and is not routed through HangVidU servers.
- HangVidU does not use TURN servers by default.

## Current Supporting Security Controls

- Current authentication implementation: Google Sign-In through Firebase Auth.
- Current authorization implementation: Firebase RTDB Security Rules restrict room, user, call, contact, message, and push subscription data by authenticated user.
- Current abuse protection implementation: Firebase App Check with reCAPTCHA Enterprise in production.
- Current Cloud Functions implementation: protected endpoints verify Firebase ID tokens.
- Current Firebase transport: Firebase services are reached over HTTPS/WSS managed by Firebase.

## Important Caveats

- "WebRTC" is acceptable as the product-level answer.
- "DTLS-SRTP over WebRTC" is the more precise protocol answer.
- Signaling security is separate from media security.
- Current text chat history is stored in Firebase RTDB and should not be described as P2P-only or end-to-end encrypted.
- Signaling and persistence should be described by interface/contract where possible, with Firebase named only as the current provider.
- This document is not a completed threat model, audit, or compliance statement.

## TODO For Presentable Security Protocol

- [ ] Write a one-paragraph public answer for "What security protocol do HangVidU P2P calls use?"
- [ ] Add a short "Security Protocol" section to public docs or README.
- [ ] Describe signaling and persistence as adapter-backed interfaces, not Firebase-only architecture.
- [ ] Confirm production Firebase App Check enforcement is enabled in Firebase Console.
- [ ] Confirm deployed RTDB rules match `database.rules.json`.
- [ ] Decide whether to document "no TURN by default" as a privacy/security property or an availability tradeoff.
- [ ] Document exactly what signaling metadata is temporarily stored in RTDB.
- [ ] Document retention/cleanup behavior for room signaling data.
- [ ] Decide whether stored text chat needs app-layer encryption or clearer wording that it is Firebase-protected, not E2EE.
- [ ] Create a lightweight threat model for calls, signaling, stored chat, contacts, and push notifications.
- [ ] Review wording with privacy policy so public claims stay consistent.
