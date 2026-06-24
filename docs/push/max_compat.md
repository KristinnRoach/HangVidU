// Push architecture starter: PWA + Capacitor + possible React Native

type Runtime = 'pwa' | 'capacitor' | 'react-native'
type Platform = 'web' | 'ios' | 'android'
type Provider = 'fcm' | 'webpush' | 'onesignal'

export type DevicePushRegistration = {
userId: string
platform: Platform
runtime: Runtime
provider: Provider
token?: string
endpoint?: string
p256dh?: string
auth?: string
createdAt: number
updatedAt: number
}

export interface PushProvider {
init(): Promise<void>
requestPermission(): Promise<NotificationPermission>
subscribe(): Promise<DevicePushRegistration>
unsubscribe(): Promise<void>
getCurrentRegistration(): Promise<DevicePushRegistration | null>
registerWithBackend(input: DevicePushRegistration): Promise<void>
}

export interface PushGateway {
upsertRegistration(input: DevicePushRegistration): Promise<void>
deleteRegistration(input: {
userId: string
platform: Platform
runtime: Runtime
provider: Provider
token?: string
endpoint?: string
}): Promise<void>
notify(input: {
userId: string
title: string
body: string
data?: Record<string, unknown>
}): Promise<void>
}

export function createPushClient(provider: PushProvider) {
return {
init: () => provider.init(),
enable: () => provider.subscribe(),
disable: () => provider.unsubscribe(),
permission: () => provider.requestPermission(),
current: () => provider.getCurrentRegistration(),
}
}

/\*
Decision rules:

- PWA only: use web push / FCM abstraction.
- PWA + Capacitor: keep same architecture, but store device-style registrations and use native push tokens on iOS/Android.
- Possible React Native later: keep the same gateway + normalized schema; rewrite only the client adapter.
- Firebase is still the easiest default if Capacitor or native mobile is likely.
- Cloudflare is good for backend ownership, not as a turnkey native-push replacement.
  \*/
