# Orientation bug findings

## Summary

The “opposite” portrait/landscape behavior came from how mobile camera streams interpret constraints. The fix that worked most reliably was to **avoid orientation-based width/height/aspect constraints on mobile** and request only `facingMode`.

## What we observed

- When the remote user rotated their mobile device, the **remote video appeared in the opposite orientation** on the desktop viewer.
- The issue was **not** with desktop constraints; it consistently showed up when the **mobile device** was the source stream.

## Approaches that did NOT fix it

- Re-requesting a stream on orientation changes using `width/height` + `orientation` constraints.
- Retrying with flipped orientation based on `getSettings().width/height`.
- Disabling orientation-triggered re-requests entirely.

## Approach that DID fix it

- **Mobile constraints set to only `{ facingMode }`**, with **no width/height/aspectRatio** overrides.
  - This removed the “opposite orientation” effect across rotations.

## Key takeaway

Mobile camera streams often **report orientation relative to the sensor**, not the UI. Applying orientation-specific `width/height/aspectRatio` constraints can invert expectations. The most robust baseline is to **let the camera decide dimensions** and only specify `facingMode` on mobile.

## Current code location

- Mobile constraint simplification is implemented in [src/media/constraints.js](src/media/constraints.js).
