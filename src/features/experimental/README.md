# Experimental face mask

WIP: for temporary deployment testing, entering a call automatically reveals the face-mask button, as if **Ctrl+Shift+9** had been pressed. Revealing it does not load p5, ml5, or the face model. The button stays disabled until the call data channel opens; the pinned libraries and model then preload automatically. The filter itself still requires capture. Set `REVEAL_FACE_MASK_BY_DEFAULT` to `false` in `src/features/call/components/CallControls.tsx` to restore shortcut-only access in dev and production. The shortcut remains available to reveal the button. No environment flag is needed.

Click the face-mask button to keep the camera preview live and show a fixed face outline. Position an image or object inside the outline, then click **Capture** below the preview. Capture does not require a detected face. Move the object away and bring your face into view to animate the captured image; the live camera is drawn behind the mask, showing live eyes and mouth through its openings. Outside the tracked face outline, camera opacity is controlled by `faceMaskStyle.outside.globalAlpha` in `face-mask-style.ts` (`0` is black and `1` is fully visible). When no face is tracked, the whole camera frame uses that opacity. **Cancel** keeps the normal camera without capturing.

Click **Detect face** beside Capture to switch the current session to detected-face capture: the outline disappears and Capture waits for a visible face. Each new activation starts in the default mode.

The default mode is `outline`; change `FACE_MASK_CAPTURE_MODE` in `capture-template.ts` to `detected` to restore capture using detected face points. The outline uses a fixed frontal face template, so objects will stretch to follow your expressions. The preview shows the whole camera frame during capture so the outline matches the sampled region.

Click the face-mask button again to restore the camera. Each activation captures a fresh image; the libraries and model are reused until the page reloads. Turning off stops detection and releases the video/canvas resources.

If preload is still running, the first activation waits for it. Loading failures appear below the self preview; click the face-mask button again to retry. Camera startup and first face detection still take some time.

Mobile testing: the source video starts playing before library loading and must have drawable pixels before capture is offered. It stays in a nearly transparent 1px viewport area rather than being fully invisible. Canvas pixel density is fixed at 1, so high-density phone screens do not multiply the output resolution and buffer workload. After Capture, a fresh 30-second timeout bounds publishing; renderer errors during preparation are reported, and renderer errors after publishing restore the camera.

A black frame can also mean no face is detected: `outside.globalAlpha` is currently `0`, so without a tracked face there is no visible layer. A captured image is deliberately static; its geometry and live eyes/mouth should move with the detected face. The pinned ml5 detection loop does not propagate asynchronous inference failures to this module, so a stalled detector remains a possible cause of frozen geometry. These changes do not yet detect that condition or verify that the outgoing canvas stream advances on a physical phone.

For the next physical-device pass, test outline capture and detected-face capture, move the head and blink after capture, check the receiving device as well as the self preview, then turn the mask off/on and background/foreground the app. Record whether the raw camera was live, which preparation stage appeared, and whether the live eyes/mouth or just the mask geometry stopped moving. This distinguishes camera playback, detection, and outgoing-stream failures before choosing a fallback or availability gate.

## Known limitations

- CDN libraries and model assets require network access on first use. The renderer uses p5 1.11.13 and ml5 1.4.0, which includes the iOS WebGPU video-orientation workaround. The loaded model remains in memory for the page session; ml5 has no public model disposal API.
- Output size, framing, and region styles are still being tuned. Background opacity applies outside the tracked face outline; tracking loss applies it to the whole frame. Mobile performance, remote playback, and browser/device compatibility need manual verification.
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

Next small extension (not yet implemented): add a live detected-face outline to help the user see which part of their face will be sampled before they click Capture. Show it only on the local camera preview while a capture session is in detected-face mode (after clicking Detect face, or when configured as the default), before capture, and while a face is tracked. Hide it when tracking is lost, capture completes, or the session is canceled. Outline mode keeps its existing fixed positioning guide; the animated output should not show either guide.

Minimal implementation: reuse the existing SVG polygon and face-boundary indices, replacing the fixed template coordinates with the current detected keypoints. Use the same source aspect ratio and mirroring as the preview so the guide aligns with the sampled face. No additional detector or rendering library is needed.

### Region styling

`face-mask-style.ts` holds native Canvas image styles for `outside`, `inside`, and `mask`. Use `globalAlpha` (0–1), `filter` (a standard CSS filter chain such as `grayscale(1) contrast(1.2)`), and native shadow properties. Browser support determines which filters work; unsupported filters have no custom fallback. The mask is styled before its texture is warped, so blur and shadows affect the source image, not the final face silhouette. The captured source stays unchanged. `backgroundColor` supplies the opaque base color. Styles are read each frame; when tracking is lost only `outside` is drawn. The inside layer spans the entire face outline and becomes visible through a translucent mask.
