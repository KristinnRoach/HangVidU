# Experimental face mask

The face-mask button appears on browsers with canvas capture and WebGL support. It stays disabled until a call data channel is open, the local camera is live, and remote media has arrived. Libraries and the face model preload once per call; showing the button alone does not load them.

Opening setup defaults to automatic detection and the remote camera when exactly one eligible remote camera is available; otherwise it uses the local camera. Screen shares are excluded. Remote automatic capture waits for repeated face detections spanning at least 300 ms, then captures on a fresh detection result. Missing detection or restarting capture resets the wait. Set `FACE_MASK_AUTO_CAPTURE_HOLD_MS` to `0` in `face-mask.ts` to disable this guard; it also applies to local automatic capture when the countdown is disabled. Local automatic capture counts down 3, 2, 1 while detection continues, restarting if the face disappears, then captures into a private animated preview. Set `FACE_MASK_LOCAL_COUNTDOWN` to `false` in `face-mask.ts` to disable the local countdown. The normal camera remains published until **Apply mask**. The remote stream is never modified, and animation always follows the local camera.

One icon toolbar stays on the local preview through setup and preview. The local preview keeps the same expanded size throughout setup. Apply always applies the preview and stays disabled until one exists. The second button captures in manual mode when ready, stays disabled during automatic acquisition, and becomes Retake during preview. Retake restarts capture. Concise status text describes preparation, detection, alignment, and preview readiness. Local capture adds a brief white flash, suppressed for reduced motion; remote capture has no countdown or flash. Switching source or mode discards the preview and restarts capture through the same cancellation path. Cancel keeps the normal camera. A lost remote capture source cancels setup.

Manual alignment shows a fixed frontal face guide with eye and outer-lip contours on the selected source with the whole video frame visible. Capture can sample an image or object without detecting a face. Automatic mode shows no outline. Each activation starts fresh in automatic mode; removing the applied mask restores the normal camera and releases its rendering resources.

Errors appear on the local preview with Retry and Dismiss. Source-video startup and face detection can take time. Startup and detection have a 30-second timeout, and capture starts a fresh timeout to prepare the output. Waiting for Apply has no timeout. Libraries and the model are reused until page reload.

On mobile, the source video must have drawable pixels before capture. It plays in a nearly transparent 1px viewport area rather than being fully invisible. Canvas pixel density is fixed at 1. With `faceMaskStyle.outside.globalAlpha` set to `0`, losing face tracking can produce a black frame.

Detection uses paced single-shot inference (at most 20 calls per second), catches inference failures, and never overlaps calls on the reused model, including across cancellation and source changes. Hidden pages and unavailable video input skip inference. Context loss and tracking/rendering stalls use the existing failure cleanup and camera-restoration path; preview failures cancel setup. A one-second watchdog applies the existing 30-second tolerance only while the page is visible and source video time advances. Source changes and visibility changes reset that tolerance. Retry is explicit; an unresolved inference cannot be cancelled and a retry waits for it rather than starting overlapping work.

Deferred under [issue #688](https://github.com/KristinnRoach/HangVidU/issues/688): physical-device validation and threshold tuning, sustained low-FPS cutoffs, adaptive quality, and broader performance telemetry. The watchdog detects stalls; it does not establish a minimum usable frame rate or guarantee recovery from browser/GPU-process crashes.

For browser and physical-device review, try both sources and modes, Retake, Cancel, and source/mode changes during preview. Confirm the receiving device sees the raw camera until Apply, then test head movement, blinking, mask removal, and app background/foreground. Further UX refinement remains open, especially first-face capture quality and small-screen toolbar fit.

Relevant code:

- `call/call-media.ts`: setup session, capture attempts, private preview, Apply, and camera restoration.
- `call/components/MemberStreams.tsx` and its stylesheet: the stable toolbar, preview, and manual guide. `ParticipantMedia` handles playback and the expanded setup preview.
- `experimental/face-mask.ts`: detection, capture, animation, and renderer cleanup. `capture-template.ts` holds the manual guide geometry.

### Region styling

`face-mask-style.ts` holds native Canvas image styles for `outside`, `inside`, and `mask`. Use `globalAlpha` (0–1), `filter` (a standard CSS filter chain such as `grayscale(1) contrast(1.2)`), and native shadow properties for `outside` and `inside`. The mask does not support shadows. Browser support determines which filters work; unsupported filters have no custom fallback. The mask is styled before its texture is warped, so blur affects the source image, not the final face silhouette. The captured source stays unchanged. `backgroundColor` supplies the opaque base color. Styles are read each frame; when tracking is lost only `outside` is drawn. The inside layer spans the entire face outline and becomes visible through a translucent mask.

## Possible follow-up experiments

These are unimplemented tuning ideas.

### Smoothing

If smoothing still leaves visible jitter, try these changes inside `updateFraming`:

- `CENTER_DEAD_ZONE = 0.05` (fraction of output width/height): compare each target delta with `width * CENTER_DEAD_ZONE / zoom` (or height for Y). Update only outside that band, subtracting the band from the delta so following starts gently.
- `ZOOM_DEAD_ZONE = 0.03` (fraction of output height): add a session-local `zooming` boolean. Start compensating below `FACE_MASK_MIN_HEIGHT - ZOOM_DEAD_ZONE`; stop above `FACE_MASK_MIN_HEIGHT + ZOOM_DEAD_ZONE`. Use the existing capped `targetZoom` while compensating; otherwise target 1. Keep smoothing after this decision. Face size may drift slightly below the requested minimum.

No extra detector or UI is needed. To make the vignette follow zoom, divide its half-diagonal radius (`corner` in `paintBackground`) by `zoom`.

### Depth testing

Try depth instead of (or with) `FACE_MASK_CULL_FOLDED` so far-side triangles are hidden behind near ones by the WebGL depth test:

1. Keep z in the `detectStart` mapping: `z: (point.z * width) / video.videoWidth` (same scale as x). Add `z?: number` to `Face` keypoints.
2. Before `p.beginShape(p.TRIANGLES)`, clear depth so the full-frame `p.image(liveTexture)` at z = 0 cannot hide the mask: `const gl = p.drawingContext; gl.clear(gl.DEPTH_BUFFER_BIT);`. Add `drawingContext: WebGLRenderingContext` to `Sketch`.
3. Emit `p.vertex(point.x, point.y, -(point.z ?? 0), uv.x / width, uv.y / height)`. MediaPipe z is smaller toward the camera; p5's camera looks down -z, so negate. If the near cheek disappears instead of the far one, drop the minus. Change the `Sketch.vertex` type to `(x, y, z, u, v)`.
4. Compare with `FACE_MASK_CULL_FOLDED` on and off.
5. Update the vertex expectation in `face-mask.test.js` to five arguments.

With `FACE_MASK_FEATHER` on, transparent edge pixels still write depth and can punch holes; leave feather off while testing.
