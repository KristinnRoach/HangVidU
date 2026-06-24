## Push provider starter

## NOTE: These are unverified suggestions, likely needs research, verifying and adjusting to align with HangVidU's structure and stack.

### Recommendation

- Keep **Firebase/FCM** for now if priority = lowest effort + reliable web push. [web:18][web:39]
- Move to **Cloudflare** only if priority = infra consolidation + full control over Web Push implementation. [web:6]
- Consider **OneSignal** if priority = minimal maintenance; free tier includes unlimited mobile push and 10,000 web push. [web:17]

### Architecture rule

- App/UI must never import Firebase/OneSignal/Cloudflare code directly.
- All push logic goes behind a small provider interface.
- Store subscriptions in a normalized schema, not vendor-specific shapes. [web:39][web:6]

### Core interfaces

```ts
export interface PushProvider {
  init(): Promise<void>;
  requestPermission(): Promise<NotificationPermission>;
  subscribe(): Promise<PushSubscription | string>;
  unsubscribe(): Promise<void>;
  getCurrentSubscription(): Promise<PushSubscription | string | null>;
  registerWithBackend(input: {
    userId: string;
    subscription: PushSubscription | string | null;
    provider: 'fcm' | 'webpush' | 'onesignal';
    platform: 'web';
  }): Promise<void>;
}
```

```ts
export interface PushGateway {
  upsertSubscription(input: {
    userId: string;
    provider: 'fcm' | 'webpush' | 'onesignal';
    endpoint: string;
    p256dh?: string;
    auth?: string;
    token?: string;
  }): Promise<void>;

  deleteSubscription(input: {
    userId: string;
    provider: 'fcm' | 'webpush' | 'onesignal';
    endpoint?: string;
    token?: string;
  }): Promise<void>;

  notify(input: {
    userId: string;
    title: string;
    body: string;
    data?: Record<string, unknown>;
  }): Promise<void>;
}
```

### Normalized storage shape

```ts
type StoredPushSubscription = {
  userId: string;
  provider: 'fcm' | 'webpush' | 'onesignal';
  platform: 'web';
  endpoint?: string;
  p256dh?: string;
  auth?: string;
  token?: string;
  createdAt: number;
  updatedAt: number;
};
```

### File layout

```txt
src/
  push/
    push-provider.ts
    create-push-client.ts
    firebase-push-provider.ts
    cloudflare-webpush-provider.ts
    onesignal-push-provider.ts
  sw/
    firebase-messaging-sw.js
server/
  push/
    push-gateway.ts
    firebase-gateway.ts
    cloudflare-webpush-gateway.ts
    onesignal-gateway.ts
```

### Thin client wrapper

```ts
export function createPushClient(provider: PushProvider) {
  return {
    init: () => provider.init(),
    enable: () => provider.subscribe(),
    disable: () => provider.unsubscribe(),
    permission: () => provider.requestPermission(),
    current: () => provider.getCurrentSubscription(),
  };
}
```

### Provider decision

- **FirebaseProvider**: best default for web push starter path. Requires Firebase messaging setup + service worker + token flow. [web:18][web:39]
- **CloudflareWebPushProvider**: uses Push API + VAPID + service worker + backend endpoint on Workers/Agents; more DIY. [web:6]
- **OneSignalProvider**: use when “just make push work” matters more than control. [web:17]

### Migration plan

1. Extract current Firebase push code into `firebase-push-provider.ts`.
2. Normalize backend subscription records.
3. Route all sends through `PushGateway.notify()`.
4. Keep UI calling only `pushClient.enable()/disable()`.
5. Add second provider only when there is a real reason. [web:39][web:6]

### Default decision for this app

- **Now:** keep Firebase behind the abstraction. [web:18][web:39]
- **Later:** add Cloudflare Web Push adapter ONLY if we want to remove Firebase entirely. [web:6]
- **Next:** test OneSignal for lower maintenance. Research pros, cons and pricing. [web:17]
