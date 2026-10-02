# Experimental face mask — temporary handoff

Dev enables the call-control button by default. Set VITE_EXPERIMENTAL_FACE_MASK=false to hide it, or true to include it in a production build. This is a build-time flag; restart dev after changing it.

Start a video call, keep your face visible, and click the Experimental face mask icon (face in a frame). Initial loading/detection can take up to 30 seconds. The first detected face is captured and warped on a black background. Click again to restore the camera; enabling again captures a new image. Other callers should receive the filtered output.

## Deferred

- Broader browser/device validation: especially iPhone Safari, thermal/battery impact, backgrounding, camera orientation, and remote playback. The user verified the effect works during an active call; automated lifecycle tests do not prove device compatibility.
- ml5 exposes no public model disposal API in this version. Detection and media/rendering resources stop, but repeated toggles can retain TensorFlow model/GPU allocations. Reuse or explicitly dispose the model before prolonged use or production rollout.
- Libraries are pinned CDN scripts (p5 1.9.0, ml5 1.2.1); model assets are fetched by ml5. No runtime/model self-hosting, integrity policy, model caching, or package typings yet. Script/model fetches continue after cancelling, but the processor must not start after cancellation.
- Errors thrown from asynchronous p5 callbacks may surface globally; timeout cleans up initialization but runtime/WebGL failures do not yet auto-restore camera.
- Track replacement can partially succeed across peers. The room commits its desired track before rejecting; errors can leave the effect active locally with some peers on the previous track. Toggle off retries restoration; no additional peer recovery UI here.
- Simplified UX: automatic capture only, no recapture button, stage text instead of detailed loading progress, and icon uses tooltip/accessible label. Error feedback sits beside controls. No saved photos, image upload, or filter gallery.
- Rendering is capped at 640 pixels wide and 20fps; inference is not throttled separately. Benchmark before wider release. Black output when tracking is lost is intentional.
- Feature has no runtime production kill switch: changing the environment flag requires rebuilding/deploying.

## Validation so far

`vp check` passes; all 15 call-media tests pass, including five effect lifecycle tests. Browser smoke testing loaded the pinned libraries and caught a native-canvas texture incompatibility, corrected by using p5 graphics. The user subsequently confirmed the effect works and is fun during an active call; logs show two successful activations and track publication. Remote playback was not separately confirmed. A 378ms animation-frame warning indicates a main-thread stall; investigate startup versus sustained inference costs.

Initialization now reports its stage beside the button and logs `[FaceMask]` milestones. The processing elements stay transparent inside the viewport to avoid offscreen media throttling. If no visible effect appears, report the last milestone (especially whether `Filtered track published` appears). Tracking-prevention messages alone do not establish a model failure.

## Product follow-up

Move the toggle out of the main call controls, decide on a small extensible video-filter interface, and optimize before removing the feature flag. Keep the current experiment self-contained until those choices are made.
