# Manual Testing Steps for FCM Diagnostics Dashboard

## Prerequisites

**IMPORTANT**: The dashboard requires the service worker to be registered for FCM token generation to work. There are two ways to test:

### Option A: Test via Main App (Recommended)

1. Start dev server: `pnpm dev`
2. Open main app: `https://localhost:5173`
3. Wait for app to fully initialize (service worker will register automatically)
4. Navigate to dashboard: `https://localhost:5173/src/diagnostics/dashboard.html`

### Option B: Test Dashboard Directly (Limited Functionality)

1. Start dev server: `pnpm dev`
2. Open dashboard directly: `https://localhost:5173/src/diagnostics/dashboard.html`
3. **Note**: FCM token generation will fail because service worker is not registered
4. This is useful for testing platform detection and basic diagnostics

## Testing Steps

### 1. Initial Page Load

**Expected Console Output:**

```
[Dashboard] Starting initialization...
[Dashboard] Initializing notification controller...
[FCMTransport] Initialized successfully
[NotificationController] Initialized successfully
[Dashboard] Notification controller initialized: true
```

**Check the UI:**

- Platform Information section should show your browser, OS, device type
- System Status should show current permission state
- All sections should load without errors

**If you see errors:**

- Check browser console for detailed error messages
- Verify VAPID key is configured in `.env` file
- Ensure you're using a supported browser (Chrome, Edge, Firefox)

### 2. Request Permission Button

**Action:** Click "Request Permission" button

**Expected Behavior:**

- Browser shows native notification permission prompt
- After granting: Alert shows "Permission result: granted"
- System Status updates to show "granted"

**If permission is denied:**

- Alert shows "Permission result: denied"
- System Status shows "denied"
- You'll need to reset permission in browser settings to test again

### 3. Send Test Notification Button

**Action:** Click "Send Test Notification" button (requires permission granted)

**Expected Behavior:**

- Browser shows a test notification with title "FCM Diagnostic Test"
- Alert shows "✓ Test notification displayed successfully"
- This tests the Notification API directly (not FCM)

**If it fails:**

- Check that permission is granted
- Check browser console for errors
- Some browsers block notifications in certain contexts

### 4. Run Full Diagnostics Button

**Action:** Click "Run Full Diagnostics" button

**Expected Behavior:**

- Button text changes to "Running..."
- Console shows: `[Dashboard] Starting diagnostics...`
- Diagnostic Tests section shows results for:
  - ✓ Notification API Support
  - ✓ Service Worker Registration (if loaded via main app)
  - ✓ Notification Permission (if granted)
  - ✓ FCM Token (if service worker registered and permission granted)
- Issues & Recommendations section shows any problems found

**Common Issues:**

1. **Service Worker Not Active**
   - Error: "Service worker is not active"
   - Fix: Load dashboard via main app (Option A above)
   - Or: Wait for service worker to register in main app first

2. **FCM Token Missing**
   - Error: "FCM token is missing despite granted permission"
   - Cause: Service worker not registered
   - Fix: Load dashboard via main app (Option A above)
   - Check console for detailed FCM error messages

3. **Permission Not Granted**
   - Warning: "Notification permission has been denied"
   - Fix: Click "Request Permission" button
   - Or: Reset permission in browser settings

### 5. Refresh State Button

**Action:** Click "Refresh State" button

**Expected Behavior:**

- All status sections update with current state
- No errors in console
- Useful after granting permission or registering service worker

## Platform-Specific Notes

### iOS Safari

- Requires iOS 16.4+ for web push support
- Must install as PWA (Add to Home Screen)
- Limitations section will show iOS-specific restrictions

### Desktop Browsers

- Chrome, Edge, Firefox: Full support
- Safari: Requires macOS 13+ (Ventura)

### Android

- Chrome, Edge: Full support
- Firefox: Full support
- Samsung Internet: Full support

## Troubleshooting

### "Run Full Diagnostics" Button Does Nothing

**Symptoms:**

- Button flashes but no output
- No console logs
- No errors visible

**Fixes:**

1. Open browser console (F12)
2. Look for JavaScript errors
3. Check if diagnostic service is loaded: `window.diagnosticService`
4. Reload page and try again

### FCM Token Generation Fails

**Symptoms:**

- Console shows: `[FCMTransport] Failed to get token`
- Error code: `messaging/failed-service-worker-registration`

**Fixes:**

1. Load dashboard via main app (Option A above)
2. Check service worker status in DevTools > Application > Service Workers
3. Verify VAPID key in `.env` file matches Firebase Console
4. Clear browser cache and reload

### Permission Already Denied

**Symptoms:**

- "Request Permission" shows "already-denied"
- Cannot test notifications

**Fixes:**

1. Chrome: Settings > Privacy and security > Site Settings > Notifications
2. Firefox: Address bar > Site Information (🔒) > Permissions > Notifications
3. Safari: Safari > Settings > Websites > Notifications
4. Reset permission for https://localhost:5173

## Success Criteria

✅ All diagnostic tests pass
✅ No errors in Issues & Recommendations
✅ FCM token is present (when loaded via main app)
✅ Test notification displays successfully
✅ Platform limitations are clearly shown (if any)

## Next Steps After Testing

If diagnostics reveal issues:

1. Note the error codes and messages
2. Check the "Issues & Recommendations" section for fixes
3. Verify environment configuration (`.env` file)
4. Test on different browsers/devices to identify platform-specific issues
