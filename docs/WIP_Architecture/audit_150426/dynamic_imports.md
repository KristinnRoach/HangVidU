Remaining runtime import() calls (in src/) and why they stay dynamic

1. main.js
   ◦ import('./shared/pwa/PWA.js')  
   ▪ Should stay dynamic: only needed when PWA is enabled.
   ◦ import('./shared/pwa/test-update.js')  
   ▪ Should stay dynamic: dev-only helper.
   ◦ import('./features/notifications/index.js')  
   ▪ Should stay dynamic: only needed when push is unsupported.
2. features/notifications/components/enable-notifications-prompt.js
   ◦ import('./push-unsupported-notification.js')  
   ▪ Should stay dynamic: fallback branch only (unsupported flow).
3. shared/i18n/index.js
   ◦ import('./en.json'), import('./is.json')  
   ▪ Should stay dynamic: locale bundles loaded on demand.
4. shared/media/convert/eac3-lazy.js
   ◦ import('@mediabunny/ac3'), import('mediabunny')  
   ▪ Large, intentionally lazy loaded only on AC3/EAC3 retry path.
5. shared/pwa/PWA.js
   ◦ import('./update-handlers.js')  
   ▪ Should stay dynamic: only when PWA enabled.
6. shared/pwa/update-handlers.js
   ◦ import('virtual:pwa-register')  
   ▪ Should stay dynamic: virtual module may not exist when PWA plumbing is disabled.
