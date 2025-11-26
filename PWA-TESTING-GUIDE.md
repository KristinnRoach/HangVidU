# PWA Update Testing Guide

This guide explains how to test PWA update notifications without deploying to production.

## Quick Testing Methods

### Method 1: Simulated Updates in Development (Fastest)

1. Start dev server:
   ```bash
   pnpm dev:pwa
   ```

2. Open browser console and run:
   ```javascript
   // Trigger update notification immediately
   window.testPWAUpdate()

   // Or with a delay (in milliseconds)
   window.testPWAUpdate(3000)
   ```

3. The update notification will appear with "Update" and "Later" buttons
4. Test the UI behavior:
   - **Update**: Applies update and reloads (simulated)
   - **Later**: Keeps notification in bell icon, closes panel
   - Click bell icon to see notification again

**Pros**: Instant feedback, no build/deploy needed
**Cons**: Doesn't test real service worker lifecycle

---

### Method 2: Local Preview with Real Service Worker

This tests the actual PWA update flow with real service workers.

#### Step 1: Build and serve first version
```bash
pnpm build:hosting
pnpm preview:https
```

#### Step 2: Open in browser
- Navigate to `https://localhost:4173/`
- Accept the self-signed certificate warning
- App installs service worker

#### Step 3: Make a change
Edit a file (e.g., add a comment to `src/main.js`):
```javascript
// Version 1.0.1
```

#### Step 4: Rebuild (keep preview server running)
In a new terminal:
```bash
pnpm build:hosting
```

#### Step 5: Trigger service worker check
In the browser:
- Open DevTools → Application → Service Workers
- Click "Update" button next to your service worker
- Or reload the page (Cmd+R / Ctrl+R)

The update notification should appear if changes are detected.

**Pros**: Tests real service worker behavior
**Cons**: Slower iteration, requires rebuilds

---

### Method 3: Chrome DevTools Service Worker Bypass

Force immediate service worker updates during testing:

1. Open DevTools → Application → Service Workers
2. Enable these checkboxes:
   - ☑️ **Update on reload** - Checks for SW updates on every refresh
   - ☑️ **Bypass for network** - Skips SW cache (optional, for debugging)

3. Build and preview:
   ```bash
   pnpm build:hosting
   pnpm preview:https
   ```

4. Make changes → rebuild → reload
   - Every reload checks for new SW
   - Update notification appears if SW changed

**Pros**: Faster than manual updates, tests real SW
**Cons**: DevTools-specific behavior

---

### Method 4: Multiple Preview Instances

Test update flow between "old" and "new" versions:

1. **Terminal 1**: Build version 1
   ```bash
   pnpm build:hosting
   pnpm preview:https
   ```

2. **Browser**: Open `https://localhost:4173/` (this is "old" version)

3. **Terminal 2**: Make changes, build version 2 (same commands)
   ```bash
   # Edit src/main.js or any file
   pnpm build:hosting
   ```

4. **Stop Terminal 1's preview** (Ctrl+C)

5. **Terminal 1**: Restart preview with new build
   ```bash
   pnpm preview:https
   ```

6. **Browser**: Reload or wait 24hrs (or use DevTools "Update")
   - New SW detected
   - Update notification appears

**Pros**: Most realistic testing
**Cons**: Most complex setup

---

## Testing PWA in Development Mode

### Enable PWA in Dev Mode

By default, `pnpm dev` disables PWA. To test with PWA enabled:

```bash
pnpm dev:pwa
```

This enables:
- Service worker registration
- Update checking
- Install prompts (on supported browsers)

### Development PWA Caveats

- Service worker cache might interfere with hot reload
- Use "Update on reload" in DevTools if needed
- Clear storage between tests (DevTools → Application → Clear storage)

---

## Debugging PWA Updates

### Check Service Worker Status

**DevTools → Application → Service Workers**

- **Activated and running**: Current SW serving the app
- **Waiting**: New SW waiting to take over (update available!)
- **Installing**: New SW being installed

### Force Update Check

```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.update());
});
```

### Check Update Notification State

```javascript
// Check if notification is showing
window.notificationManager?.notifications?.has('pwa-update')
```

### Clear Service Worker & Cache

**DevTools → Application**
1. Click "Clear storage"
2. Check "Unregister service workers"
3. Check "Cache storage"
4. Click "Clear site data"

---

## Common Issues

### Update notification doesn't appear

**Possible causes:**
1. Service worker files are identical (no actual changes)
2. Browser hasn't checked for updates yet (24hr interval or manual trigger)
3. PWA is disabled (`DISABLE_PWA=1`)
4. Service worker registration failed

**Solutions:**
- Check DevTools → Console for errors
- Use DevTools → Application → Service Workers → "Update"
- Make sure `VITE_DISABLE_PWA !== '1'`

### Preview server HTTPS issues

If you get certificate errors with `pnpm preview:https`:

1. Use HTTP mode instead (auth won't work, but you can test UI):
   ```bash
   pnpm preview
   ```

2. Or accept the self-signed cert:
   - Click "Advanced" → "Proceed to localhost (unsafe)"
   - This is safe for localhost testing

### Service worker conflicts

If you see "waiting" service worker that won't activate:

1. DevTools → Application → Service Workers
2. Click "skipWaiting" next to the waiting SW
3. Or refresh with "Update on reload" enabled

---

## Best Practices

1. **Use Method 1 for UI testing**: Quick iteration on notification design
2. **Use Method 2/3 for integration testing**: Test real SW lifecycle
3. **Test on mobile**: Install as PWA on phone, test update flow
4. **Test with "Update on reload" enabled**: Catch issues early
5. **Clear storage between major tests**: Avoid stale SW cache

---

## Production Testing

For final validation before release:

1. Deploy to Firebase Hosting staging (if available)
2. Install PWA on device
3. Deploy new version
4. Wait or force update check
5. Verify update notification and reload behavior

---

## Reference

- [VitePWA registerType: 'prompt'](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html)
- [Service Worker Update Flow](https://developer.chrome.com/docs/workbox/service-worker-lifecycle/)
- [Testing Service Workers](https://developer.chrome.com/docs/workbox/service-worker-overview/#testing)
