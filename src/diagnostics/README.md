# FCM Diagnostics

This directory contains diagnostic tools for testing and analyzing the FCM push notification implementation.

## 🚀 Quick Start

**Want to diagnose notification issues right now?**

1. Start dev server: `pnpm dev`
2. Open: `https://localhost:5173/src/diagnostics/dashboard.html`
3. Click "Run Full Diagnostics"

See [USAGE.md](./USAGE.md) for detailed instructions.

## 📁 Files

- **`dashboard.html`** - Standalone diagnostic UI (open directly in browser)
- **`diagnostic-service.js`** - Observes existing NotificationController
- **`platform-detector.js`** - Detects browser/OS/device/PWA mode
- **`test-utils.js`** - Property-based testing utilities
- **`USAGE.md`** - How to use the dashboard
- **`QUICK-WIN-SUMMARY.md`** - Implementation summary and next steps

## Purpose

The diagnostic tools help identify reliability issues across different platforms (browser/OS/device combinations) without modifying the existing NotificationController or FCMTransport implementations.

## Components

- **PlatformDetector** - Detects browser, OS, device type, and PWA mode
- **DiagnosticService** - Observes and tests the existing notification system
- **Dashboard UI** - Developer interface for running diagnostics and viewing results
- **Support Matrix** - Documentation of platform support and limitations (to be populated)

## What the Dashboard Shows

### Real-Time Status

- Notification permission state
- Service worker registration
- FCM token presence
- Platform information

### Diagnostic Tests

- Notification API support
- Service worker active check
- Permission granted check
- FCM token check
- PWA installation requirement (iOS)

### Issue Detection

- Critical errors blocking notifications
- Warnings for non-critical issues
- Platform-specific recommendations
- Proposed fixes

## Testing

This directory includes both unit tests and property-based tests using fast-check:

- **Unit tests**: Test specific scenarios and edge cases
- **Property-based tests**: Test universal properties across all inputs (marked with `*` in tasks.md)

Run tests with:

```bash
pnpm test src/diagnostics
```

## Design Principles

1. **Non-invasive**: Diagnostic tools only observe, they don't modify existing components
2. **Report-first**: Issues are identified and reported to the user for approval before fixes
3. **Platform-aware**: All diagnostics consider the current platform's capabilities
4. **User-friendly**: Error messages and guidance are clear and actionable
5. **Zero app modifications**: Completely self-contained, no changes to existing code

## Next Steps

1. **Use the dashboard** to identify issues on your devices
2. **Document findings** in the support matrix
3. **Test across platforms** (iOS, Android, desktop browsers)
4. **Report issues** for fixing
