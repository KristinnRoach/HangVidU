# Media Next Roadmap

This file tracks the current top-level milestones for `src/media-next/`.

Keep it concise. Update it only when priorities or the next recommended work changes materially.

## Current milestones

1. Define stable core contracts
   - source schemas
   - runtime state
   - focused ui test-page structure

2. Formalize adapter boundaries
   - document playback DOM runtime expectations
   - document capture runtime expectations
   - decide whether to create `ADAPTERS.md`

3. Expand testable primitives
   - add audio-only playback to the focused playback test page
   - decide whether system-audio capture needs its own focused runtime/page

4. Define composition/session layer
   - clarify how separate stream sources compose into common call scenarios
   - decide whether to add a durable composition doc before implementation

5. Plan migration
   - identify the first legacy integration seam
   - migrate incrementally from the current app into `media-next`

## Current next recommended step

Define the adapter layer more explicitly. The ui test pages now have real playback and capture runtimes, but their contract is still implicit in code.
