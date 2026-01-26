# FCM Diagnostics Dashboard - Quick Start

## 🚀 How to Use

### Option 1: Direct Access (Easiest)

1. Start your dev server:

   ```bash
   pnpm dev
   ```

2. Open the dashboard directly:
   ```
   https://localhost:5173/src/diagnostics/dashboard.html
   ```

That's it! The dashboard will load and show you the current state of your notification system.

### Option 2: Add to App Routes (Optional)

If you want to integrate it into your app routing, add this route to your router configuration.

## 📊 What the Dashboard Shows

### Platform Information

- Browser type and version
- Operating system and version
- Device type (desktop/mobile/tablet)
- PWA installation status
- Platform-specific limitations

### System Status

- **Notification Permission**: granted/denied/default
- **Service Worker**: registered and active status
- **FCM Token**: present or missing
- **Notification Support**: whether the platform supports notifications

### Diagnostic Tests

Click "Run Full Diagnostics" to execute:

- Notification API support check
- Service worker registration check
- Permission state check
- FCM token presence check
- PWA installation requirement check (iOS)

### Issues & Recommendations

- Lists any problems preventing notifications from working
- Provides severity levels (error/warning)
- Suggests fixes for each issue
- Shows platform-specific recommendations

## 🔧 Quick Actions

### Run Full Diagnostics

Executes all diagnostic tests and identifies issues.

### Send Test Notification

Sends a browser notification to verify the notification system works.
**Note**: This uses the browser Notification API directly, not FCM.

### Request Permission

Triggers the notification permission request dialog.

### Refresh State

Reloads the current system state without running full diagnostics.

## 🧪 Testing Across Devices

### Desktop Testing

1. Open dashboard in Chrome/Firefox/Safari/Edge
2. Run diagnostics
3. Note any issues specific to that browser

### Mobile Testing (iOS)

1. Open dashboard on iPhone/iPad (Safari)
2. Check if iOS version is 16.4+
3. If yes, install app to home screen (PWA)
4. Open from home screen and run diagnostics

### Mobile Testing (Android)

1. Open dashboard in Chrome/Firefox
2. Run diagnostics
3. Test notifications work in browser

## 📝 What to Look For

### Common Issues

**Permission Denied**

- User must enable notifications in browser settings
- On iOS: Settings → Safari → [Your Site] → Notifications

**Service Worker Not Active**

- Check if service worker is registered in DevTools
- Look for errors in console during registration

**FCM Token Missing**

- Check VAPID key is configured in `.env`
- Verify FCM is initialized correctly
- Check console for FCM errors

**PWA Install Required (iOS)**

- iOS 16.4+ requires PWA installation
- Add to home screen, then open from home screen
- Browser mode won't work for notifications

## 🐛 Debugging Tips

1. **Open Browser DevTools** while using the dashboard
2. **Check Console** for detailed error messages
3. **Check Application Tab** → Service Workers to see registration status
4. **Check Application Tab** → Notifications to see permission state
5. **Use "Send Test Notification"** to verify browser notifications work

## 📱 Platform Support Matrix

| Platform    | Browser | Notifications | PWA Required |
| ----------- | ------- | ------------- | ------------ |
| Windows 10+ | Chrome  | ✅ Yes        | No           |
| Windows 10+ | Firefox | ✅ Yes        | No           |
| Windows 10+ | Edge    | ✅ Yes        | No           |
| macOS 13+   | Chrome  | ✅ Yes        | No           |
| macOS 13+   | Safari  | ✅ Yes        | No           |
| macOS 13+   | Firefox | ✅ Yes        | No           |
| iOS 16.4+   | Safari  | ✅ Yes        | **Yes**      |
| iOS < 16.4  | Safari  | ❌ No         | N/A          |
| Android 10+ | Chrome  | ✅ Yes        | No           |
| Android 10+ | Firefox | ✅ Yes        | No           |

## 🔍 Next Steps After Diagnostics

1. **Document findings** in the support matrix
2. **Report issues** to the development team
3. **Test fixes** by re-running diagnostics
4. **Verify on real devices** before deploying

## 💡 Tips

- Run diagnostics on **every platform** you want to support
- Test in **both browser and PWA modes** (especially iOS)
- Check diagnostics **after any notification code changes**
- Use the dashboard to **debug user-reported issues**
