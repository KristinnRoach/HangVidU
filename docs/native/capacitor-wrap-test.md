# Capacitor Wrap — Fail-Fast Spike Blueprint

**Goal**: Determine in ≤1 focused session whether Capacitor wrapping HangVidU is viable. Abort at the first blocker. Do **not** polish, configure push, or touch App Store assets during the spike.

**Decision output**: Go / No-Go, with the specific failure point if No-Go.

---

## Hard Prerequisites (verify before starting)

- macOS with Xcode 15+ installed and launched once (license accepted)
- Physical iPhone (simulator is useless — no real camera/mic, WebRTC codec paths differ)
- iPhone on iOS 16+ with a working Lightning/USB-C cable and "Trust this computer" accepted
- Apple ID signed into Xcode (free tier is fine for the spike — no paid Developer Program needed for device-install testing)
- `pnpm build` currently produces a working `dist/` that runs in mobile Safari

If any prereq fails → stop. Not a spike problem.

---

## Kill Criteria (abort immediately if any hit)

Ordered by when they surface. Stop at the first one.

1. **Build fails** — `npx cap sync ios` or Xcode build errors unrelated to trivial config.
2. **App white-screens** — dist/ loads under Safari but not under WKWebView. Usually a `file://` vs absolute-URL asset issue; try once, then abort.
3. **Firebase Auth redirect loop or broken** — WKWebView handles OAuth popups differently; if auth can't complete, everything downstream is blocked.
4. **`getUserMedia` returns no tracks or throws** — even after Info.plist permissions set. This is the single highest-risk failure.
5. **`RTCPeerConnection` ICE never reaches `connected`** between wrapped app and another peer (browser or wrapped).
6. **Remote video renders black** or **remote audio silent** for >10s after connection established.
7. **OPFS writes fail** or quota is effectively zero (watch-together file handling depends on this).

Any of these = No-Go unless the fix is obvious and <15 min.

---

## Minimum Setup (target: 30 min)

```bash
pnpm add -D @capacitor/core @capacitor/cli @capacitor/ios @capacitor/keyboard
npx cap init HangVidU com.hangvidu.app --web-dir=dist
pnpm build
npx cap add ios
npx cap sync ios
```

Edit `ios/App/App/Info.plist` — add:

```xml
<key>NSCameraUsageDescription</key>
<string>Required for video calls</string>
<key>NSMicrophoneUsageDescription</key>
<string>Required for voice and video calls</string>
```

Edit `capacitor.config.json`:

```json
{
  "ios": {
    "limitsNavigationsToAppBoundDomains": false,
    "allowsLinkPreview": false
  },
  "server": {
    "iosScheme": "https"
  }
}
```

`npx cap open ios` → select physical device → Run.

---

## Verification Checklist (target: 30 min, do in order, stop at first failure)

Each step maps to a kill criterion. Check one, move on.

- [ ] **1. App launches, renders main UI.** → else Kill #2
- [ ] **2. Sign in with existing account (Firebase Auth).** → else Kill #3
- [ ] **3. Grant camera/mic when prompted; verify both native prompts appeared once.** → else Info.plist issue
- [ ] **4. Open a call to another device (browser on laptop is fine as the peer).**
  - [ ] Local preview shows own video → else `getUserMedia` broken (Kill #4)
  - [ ] Remote peer receives your video/audio → else send-side broken
  - [ ] You receive remote video/audio within 10s → else Kill #5/#6
  - [ ] Hold call for 60s — no audio dropout, no freeze
- [ ] **5. Send a text message in chat, receive one back.** (Firebase RTDB sanity)
- [ ] **6. Send a small video file via watch-together flow; verify OPFS write + playback.** → else Kill #7
- [ ] **7. Focus message input — confirm `Keyboard.setAccessoryBarVisible({ isVisible: false })` hides the bar.** (The original motivation. Low-risk, save for last.)

If all 7 pass → **Go**. Proceed to a real planning session for push notifications, app icons, Developer Program enrollment, and submission.

---

## Explicitly Out of Scope for Spike

Do **not** touch any of these — they're post-Go-decision work:

- Push notifications (FCM → APNs bridging)
- App icons / splash screens
- CallKit / PushKit / VoIP background
- Deep links / universal links
- Android build (iOS is the riskier target — if iOS works, Android follows easily)
- App Store Connect setup
- CI/CD for native builds
- Capacitor plugin selection beyond `@capacitor/keyboard`
- Styling the status bar, safe-area tweaks, haptics

---

## Known Risk Notes

- **WebRTC in WKWebView**: works since iOS 14.3 but has had bugs around Bluetooth audio routing and speaker vs earpiece selection. If audio works at all during the spike, routing polish is a solvable post-Go problem.
- **Background behavior**: wrapped web apps suspend aggressively. Incoming-call notification while backgrounded requires PushKit + CallKit — this is the biggest _post-spike_ work item, not a spike blocker.
- **Firebase Auth**: Google Sign-In popup may need `@capacitor-firebase/authentication` plugin instead of the web SDK flow. If the web flow fails in-shell, that's a known swap, not a Kill criterion — but budget time for it if it happens.
- **ngrok dev flow**: the spike should load `dist/` from inside the app bundle, not ngrok. Build once, wrap, test. Don't try to make `pnpm dev` work inside Capacitor during the spike.

---

## If No-Go

Document which Kill criterion hit and on what iOS version / device. That's the blueprint for either:

- Revisiting in 6–12 months as WebKit improves, or
- Going straight to a native Swift/Kotlin rewrite if the app's trajectory warrants it.

Stay PWA in the meantime. The `visualViewport` handling in `src/shared/components/ui/utils/attachKeyboardViewportHandler.js` is already correct.
