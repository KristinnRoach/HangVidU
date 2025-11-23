# E2E Smoke Tests

## What It Tests

- App loads without errors
- Lobby and top bar are visible
- Call button is enabled and interactive
- Chat controls element exists
- Watch mode elements are attached

## What It Does NOT Test

- Creating actual calls
- WebRTC connections
- Two-user scenarios
- Video/audio streaming
- Modal interactions
- Authentication flows
- Watch mode activation (requires media permissions)
- Message sending
- Contact management
- Room joining via link

## Run

```bash
pnpm exec playwright test smoke.spec.js
```

Runtime: ~3 seconds
