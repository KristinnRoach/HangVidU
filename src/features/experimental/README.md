# Experimental face mask

Run `vp dev`, start a video call, then press **Ctrl+Shift+9** (also on Mac). This is the only activation path in dev and production: it reveals the face-mask button and preloads the pinned p5/ml5 libraries and face model. No environment flag is needed.

Click the face-mask button to keep the camera preview live and show a fixed face outline. Position an image or object inside the outline, then click **Capture** below the preview. Capture does not require a detected face. Move the object away and bring your face into view to animate the captured image; output is black whenever no face is tracked. **Cancel** keeps the normal camera without capturing.

Click **Detect face** beside Capture to switch the current session to detected-face capture: the outline disappears and Capture waits for a visible face. Each new activation starts in the default mode.

The default mode is `outline`; change `FACE_MASK_CAPTURE_MODE` in `capture-template.ts` to `detected` to restore capture using detected face points. The outline uses a fixed frontal face template, so objects will stretch to follow your expressions. The preview shows the whole camera frame during capture so the outline matches the sampled region.

Click the face-mask button again to restore the camera. Each activation captures a fresh image; the libraries and model are reused until the page reloads. Turning off stops detection and releases the video/canvas resources.

If preloading is still running, the first toggle waits for it. Loading failures appear below the self preview; press the shortcut or toggle again to retry. Camera startup and first face detection still take some time.

## Known limitations

- CDN libraries and model assets require network access on first use. The loaded model remains in memory for the page session; ml5 1.2.1 has no public model disposal API.
- Rendering is capped at 640 pixels wide and 20fps. Tracking loss produces black output. Mobile performance, remote playback, and browser/device compatibility need manual verification.
- Runtime renderer failures do not automatically restore the camera. A failed peer track replacement can leave some peers on the previous track; toggle off to retry restoration.

## Review handoff

Current checkpoint: outline capture is the default and does not require a visible face. Capture and Cancel sit below the self preview. Detect face switches only the current capture session to detected-face capture; it removes the fixed outline and waits for tracking before enabling Capture. A new activation resets to the configured default. Live face tracking still drives both animation modes.

The fixed guide and texture coordinates share the canonical face template in `capture-template.ts`. Coordinates use camera-frame height for both axes to keep face proportions on landscape cameras. During capture the preview uses `contain`, intentionally adding black bars when needed to show the whole frame. This does not resolve the separately reported intermittent camera-switch sizing issue.

### Changes outside `src/features/experimental` to review before merging

- `src/features/call/call-media.ts`: owns capture readiness and session mode, cancellation and hangup handling, model preloading, outgoing track replacement, and restoration of the retained raw camera. Review cleanup and camera-off, camera-switch, and screen-share transitions, including failed track replacement.
- `src/features/call/components/CallControls.tsx`: reveals the experiment with Ctrl+Shift+9 and provides the mask toggle. Status/error text was removed from the toolbar to avoid layout changes; normal toolbar auto-hide is restored. Errors now appear below the self preview.
- `src/features/call/components/MemberStreams.tsx`: adds the self-preview guide and Capture / Detect face / Cancel controls, plus error display. These appear only on the local preview.
- `src/features/call/components/MemberStreams.module.css`: positions capture controls below the preview and draws the non-interactive mirrored SVG guide.
- `src/features/call/components/ParticipantMedia.tsx`: adds optional children/overlay and uncropped-preview props; tracks source-video aspect ratio so the guide aligns with the video. This is a shared call component: review regular remote playback and the existing iOS video replacement path.
- `src/features/call/components/ParticipantMedia.module.css`: allows content outside the self-preview bounds so controls remain visible below it; preserves rounded corners on the video. Review preview clipping and layering in direct/group calls and on small screens.
- `src/features/call/call-media.test.jsx` and `src/features/call/components/CallControls.test.jsx`: cover the integration lifecycle, capture/cancellation, and reveal shortcut.

Validation: formatting, lint, and types pass. The full suite passed 434 tests with one skipped before the Detect face addition. After that addition, all 27 focused experiment, call-media, MemberStreams, and CallControls tests passed, including switching from outline to detected capture. The user manually confirmed fixed-outline capture, corrected proportions, and removal of toolbar text. The Detect face button still awaits explicit manual confirmation. No deployment has been performed.

Next small extension: reuse the existing SVG guide and face-boundary indices with the current detected keypoints while waiting to capture; hide the guide when tracking is lost. No additional detector or rendering library is needed.
