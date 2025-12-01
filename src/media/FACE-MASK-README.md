# Face Mask Feature (Easter Egg)

A hidden feature that applies ML-powered face tracking and mask effects to video streams during calls.

## How to Activate

### Desktop
- **Right-click** on either the local or remote video element during a call

### Mobile
- **Long-press** (800ms) on either video element during a call

## Features

- **Lazy Loading**: p5.js (~1.3MB) and ml5.js (~500KB + models) only load when the feature is activated
- **Face Detection**: Uses ML5's FaceMesh model (based on TensorFlow.js)
- **Photo Capture**: Freeze your current expression as a mask
- **Live Tracking**: The frozen mask follows your face movements in real-time
- **Self-contained**: Doesn't interfere with existing video streams

## Controls

Once activated, a menu appears with options:
1. **Capture Photo** - Freeze current video frame as mask
2. **Toggle Mask** - Switch between live video and frozen mask
3. **Clear Mask** - Remove the captured mask
4. **Close Face Mask** - Deactivate the feature and clean up

## Files

- `face-mask.js` - Core face mask functionality with p5.js/ml5.js integration
- `face-mask-trigger.js` - Event handlers for right-click and long-press

## Integration Points

### main.js
```javascript
// Setup on call connect
CallController.on('memberJoined', () => {
  setupFaceMaskTriggers(localVideoEl, remoteVideoEl);
});

// Cleanup on call end
CallController.on('cleanup', () => {
  cleanupFaceMaskTriggers();
});
```

## Technical Details

### Dependencies (CDN)
- p5.js v1.9.0 (https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js)
- ml5.js v1.x (https://unpkg.com/ml5@1/dist/ml5.min.js)

### How It Works
1. User triggers activation via right-click or long-press
2. Libraries are lazy-loaded from CDN if not already present
3. p5.js creates a WEBGL canvas overlay on the video container
4. ml5.js FaceMesh detects 468 facial landmark points in real-time
5. Face mesh triangles (~900) are textured with live video or captured photo
6. When photo is captured:
   - Current video frame is frozen as a p5.Graphics object
   - Face keypoint positions are stored (deep copy)
   - Mesh geometry follows live face movements
   - Texture UV coordinates use captured face position
   - Result: Static photo "sticks" to moving face

### Performance
- Face detection: ~30-60 FPS (model-dependent)
- Mesh rendering: WebGL-accelerated, minimal overhead
- Memory: ~15-20MB total (libraries + ML models)

## Future Improvements

- Replace `prompt()` menu with custom modal UI
- Add more mask effects (distortion, filters, etc.)
- Support uploading external images as masks
- Persist favorite masks to IndexedDB
- Add keyboard shortcuts for controls
- Migrate to MediaPipe for better performance (optional)
