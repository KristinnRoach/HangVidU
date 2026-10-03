# Experimental face mask

Run `vp dev`, start a video call, then press **Ctrl+Shift+9** (also on Mac). This is the only activation path in dev and production: it reveals the face-mask button and preloads the pinned p5/ml5 libraries and face model. No environment flag is needed.

Click the face-mask button with your face visible to capture and animate it. Click again to restore the camera. Each activation captures a fresh face; the libraries and model are reused until the page reloads. Turning off stops detection and releases the video/canvas resources.

If preloading is still running, the first toggle waits for it. Loading failures appear beside the controls; press the shortcut or toggle again to retry. Camera startup and first face detection still take some time.

## Known limitations

- CDN libraries and model assets require network access on first use. The loaded model remains in memory for the page session; ml5 1.2.1 has no public model disposal API.
- Rendering is capped at 640 pixels wide and 20fps. Tracking loss produces black output. Mobile performance, remote playback, and browser/device compatibility need manual verification.
- Runtime renderer failures do not automatically restore the camera. A failed peer track replacement can leave some peers on the previous track; toggle off to retry restoration.
