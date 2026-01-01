# HangVidU - Camera Switch Fix

## Current State (Updated: 2025-12-26)

**Shipped:** Production (live on Firebase Hosting & GitHub Pages)
**Status:** Live with users
**Codebase:**
- ~15,000 lines of JavaScript
- Vanilla JS + Lit web components
- WebRTC P2P video chat with watch-together mode
- Firebase RTDB for signaling and sync

**Known Issues:**
- Switch camera button disabled due to remote stream freezing bug (`index.html:104`)
- When user switches camera, partner's remote video freezes consistently
- Feature completely hidden to prevent user frustration

## v1.1 Goals

**Vision:** Fix the camera switching functionality so users can switch between front/back cameras during calls without freezing the partner's video stream.

**Motivation:**
- Critical UX gap - users expect camera switching in video calls
- Feature exists but disabled due to stream renegotiation bug
- Blocking mobile usability (front vs back camera switching)

**Scope (v1.1):**
- Fix remote stream freezing when local user switches cameras
- Re-enable switch camera button with proper device detection (only show if ≥2 cameras available)
- Ensure smooth WebRTC track replacement without disrupting ongoing calls
- Test with real devices to verify fix works reliably

**Success Criteria:**
- [ ] User A can switch cameras during call with User B without User B's remote video freezing
- [ ] Switch camera button only visible when multiple cameras detected
- [ ] Existing call flow remains stable (no disconnections or quality degradation)
- [ ] Tested and verified working on real devices (mobile + desktop)

**Not Building (this version):**
- Advanced camera controls (zoom, focus, exposure)
- Picture-in-picture preview during camera switch
- Audio device switching (separate feature)

## Problem

The switch camera feature was implemented but disabled because switching cameras causes the remote peer's video stream to freeze. This happens consistently whenever a user switches between cameras during an active call.

Root cause is likely improper WebRTC track replacement - when the local stream changes, the new track isn't being properly negotiated with the remote peer, causing their RTCPeerConnection to lose the video feed.

This is a critical missing feature for mobile users who need to switch between front and back cameras.

## Context

**Current implementation:**
- Switch camera button exists in UI but is hidden via `display: none` (`index.html:104`)
- Camera switching logic exists in `src/media/media-devices.js`
- Stream management in `src/media/stream.js`
- WebRTC peer connection setup in `src/webrtc/call-flow.js`

**Codebase insights (from CONCERNS.md):**
- TODO comment at `index.html:104`: "Fix partners stream freezing when camera switching"
- Issue documented in `.planning/codebase/CONCERNS.md` as critical priority

**Testing:**
- Limited testing done before disabling feature
- Freeze appeared consistent but needs proper investigation
- Will test with real devices after fix

## Constraints

- **Stability**: Must not break existing call flow - camera switching should be safe to attempt without risking call disconnection
- **WebRTC Compatibility**: Solution must work with existing RTCPeerConnection architecture
- **User Experience**: Switch should feel instant, no long delays or black screens

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Testing approach | Real device testing required | Automated tests insufficient for WebRTC media device issues |
| Scope | Camera switching only | Audio device switching is separate feature, keep focused |
| Visibility | Show button only if ≥2 cameras | Better UX than showing disabled button |

## Open Questions

- [ ] Does freeze happen during track replacement or SDP renegotiation?
- [ ] Are ICE candidates being properly re-gathered after track change?
- [ ] Should we show loading state during camera switch?
- [ ] Does this affect both initiator and joiner roles equally?

---
*Initialized: 2025-12-26*
