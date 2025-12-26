# Roadmap: HangVidU v1.1 - Camera Switch Fix

## Overview

Fix the camera switching functionality to allow users to switch between front/back cameras during video calls without freezing the partner's remote video stream. This involves investigating the WebRTC track replacement issue, implementing proper renegotiation, re-enabling the UI with device detection, and validating the fix on real devices.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Investigation & Root Cause Analysis** - Understand why camera switching freezes remote streams
- [ ] **Phase 2: Track Replacement Fix** - Implement proper WebRTC track replacement during camera switch
- [ ] **Phase 3: UI Re-enablement & Device Detection** - Re-enable switch camera button with proper device detection
- [ ] **Phase 4: Real Device Testing & Validation** - Test fix on real devices to ensure reliability

## Phase Details

### Phase 1: Investigation & Root Cause Analysis
**Goal**: Identify the exact cause of remote stream freezing during camera switches
**Depends on**: Nothing (first phase)
**Research**: Unlikely (examining existing codebase and WebRTC connection patterns)
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 2: Track Replacement Fix
**Goal**: Implement proper WebRTC track replacement that doesn't freeze remote streams
**Depends on**: Phase 1
**Research**: Likely (WebRTC track replacement patterns, SDP renegotiation)
**Research topics**: Modern WebRTC track replacement APIs (replaceTrack vs renegotiation), ICE candidate handling during track switch, best practices for camera switching in established peer connections
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 3: UI Re-enablement & Device Detection
**Goal**: Re-enable switch camera button with proper device detection logic
**Depends on**: Phase 2
**Research**: Unlikely (internal UI patterns already established)
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

### Phase 4: Real Device Testing & Validation
**Goal**: Verify fix works reliably on actual mobile and desktop devices
**Depends on**: Phase 3
**Research**: Unlikely (manual testing with existing implementation)
**Plans**: TBD

Plans:
- TBD (will be defined during phase planning)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Investigation & Root Cause Analysis | 0/TBD | Not started | - |
| 2. Track Replacement Fix | 0/TBD | Not started | - |
| 3. UI Re-enablement & Device Detection | 0/TBD | Not started | - |
| 4. Real Device Testing & Validation | 0/TBD | Not started | - |
