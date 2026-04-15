Removing unnecessary dynamic imports; this document lists retained, intentional dynamic imports.

Here are remaining runtime import() calls (in src/) and why they stay dynamic:

1. main.js
   ◦ import('./shared/pwa/PWA.js')  
   ▪ Only needed when PWA is enabled.
   ◦ import('./shared/pwa/test-update.js')  
   ▪ dev-only helper.
   ◦ import('./features/notifications/index.js')  
   ▪ only needed when push is unsupported.
2. features/notifications/components/enable-notifications-prompt.js
   ◦ import('./push-unsupported-notification.js')  
   ▪ fallback branch only (unsupported flow).
3. shared/i18n/index.js
   ◦ import('./en.json'), import('./is.json')  
   ▪ locale bundles loaded on demand.
4. shared/media/convert/eac3-lazy.js
   ◦ import('@mediabunny/ac3'), import('mediabunny')  
   ▪ Large, intentionally lazy loaded only on AC3/EAC3 retry path.
5. shared/pwa/PWA.js
   ◦ import('./update-handlers.js')  
   ▪ only when PWA enabled.
6. shared/pwa/update-handlers.js
   ◦ import('virtual:pwa-register')  
   ▪ virtual module may not exist when PWA plumbing is disabled.