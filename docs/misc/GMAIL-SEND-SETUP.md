# Gmail Send Setup Guide

## Issue

Gmail send authorization popup closes immediately or fails with "popup_closed" error.

## Root Causes

1. Gmail API not enabled in Google Cloud Console
2. OAuth consent screen missing required scope
3. Authorized origins not configured for development

## Solution

### 1. Enable Gmail API

Go to [Google Cloud Console](https://console.cloud.google.com/):

1. Select your project: `vidu-aae11`
2. Navigate to **APIs & Services > Library**
3. Search for "Gmail API"
4. Click **Enable**

### 2. Configure OAuth Consent Screen

Go to **APIs & Services > OAuth consent screen**:

1. Click **Edit App**
2. Scroll to **Scopes** section
3. Click **Add or Remove Scopes**
4. Add the following scope:
   - `https://www.googleapis.com/auth/gmail.send` (Send email on your behalf)
5. Click **Update** and **Save and Continue**

### 3. Configure Authorized JavaScript Origins

Go to **APIs & Services > Credentials**:

1. Find your OAuth 2.0 Client ID: `765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad`
2. Click to edit
3. Under **Authorized JavaScript origins**, ensure these are added:
   - `https://localhost:5173` ⚠️ **IMPORTANT: Your actual dev server port**
   - `https://vidu-aae11.web.app` (production)
   - `https://haunted-salley-cunningly.ngrok-free.dev` (ngrok domain)
4. Under **Authorized redirect URIs**, ensure these are added:
   - `https://localhost:5173` ⚠️ **IMPORTANT: Your actual dev server port**
   - `https://vidu-aae11.web.app` (production)
   - `https://haunted-salley-cunningly.ngrok-free.dev` (ngrok domain)
5. Click **Save**
6. **Wait 5-10 minutes** for changes to propagate

### 4. Test the Flow

1. Clear browser cache and cookies for `accounts.google.com`
2. Restart your dev server: `pnpm dev`
3. Try sending an email invite again
4. The OAuth popup should now stay open and show the Gmail send permission request

## Expected Behavior

When clicking "Send Email Invite":

1. Button shows "Requesting permission..."
2. OAuth popup opens showing Gmail send permission request
3. User clicks "Allow"
4. Popup closes automatically
5. Emails are sent
6. Button shows "✓ Sent X emails!"

## Troubleshooting

### Popup still closes immediately

- Check browser console for CORS errors
- Verify all origins are using HTTPS (not HTTP)
- Try in incognito mode to rule out extension interference

### "Authorization cancelled" error

- This is expected if user clicks "Cancel" or closes popup
- The app falls back to `mailto:` links as a backup

### "Access denied" error

- User needs to grant permission in the OAuth popup
- If they previously denied, they need to revoke access in Google Account settings and try again

## Development vs Production

- **Development**: Uses `localhost:5101` with HTTPS (Vite dev server)
- **Production**: Uses `vidu-aae11.web.app`
- Both need to be configured in Google Cloud Console

## Security Notes

- Gmail send scope is sensitive - Google may require app verification for production use
- For development/testing, you can add test users in OAuth consent screen
- The app only sends emails on behalf of the authenticated user (not from a service account)
