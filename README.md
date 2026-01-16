# HangVidU

A simple peer-to-peer video chat app with a watch-together mode.

## Try it now

**Live demo**: [https://vidu-aae11.web.app/](https://vidu-aae11.web.app/)

## Usage

1. Click the "Call" button to generate a one-time video chat link
2. Share the link with a partner
3. Partner opens the link in a browser to start video chat
4. Search youtube videos or paste direct url to hosted video in search bar
5. Watch in sync with your partner

## Stack

- WebRTC for P2P connection, Firebase for signaling

## Limitations

- Only works for 1-to-1 connections

## Development

The `pnpm dev` command starts both Vite and ngrok for local development with HTTPS tunneling.

### Environment configuration

Your environment variables are managed in separate files for each environment:

- ` .env.development` for local/dev settings
- ` .env.production` for production deploys (do not commit real secrets)

Production secrets are stored in GitHub Actions Secrets and used by the CI workflow when building and deploying. Do NOT commit a real ` .env.production` file.

To help local testing you can copy the template:

```bash
cp .env.production.example .env.production
# edit .env.production locally — do NOT commit this file
```

To update GitHub Actions Secrets from your local ` .env.production` (local admin only) use the GitHub CLI or the GitHub UI. Example commands:

```bash
# authenticate gh (if needed)
gh auth login

# Inspect VITE_ values locally (preview, no network calls)
grep -E '^VITE_[A-Z0-9_]+' .env.production || true

# Set a single secret (replace OWNER/REPO)
gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "vidu-aae11.web.app" --repo OWNER/REPO

# Loop to set all VITE_ secrets from .env.production (local, admin only)
while IFS= read -r line; do
	[[ "$line" =~ ^#.*$ || -z "$line" ]] && continue
	KEY="${line%%=*}"; VALUE="${line#*=}"
	gh secret set "$KEY" --body "$VALUE" --repo OWNER/REPO
done < .env.production
```

Notes:

- Run these commands only from a trusted machine where you are authenticated with `gh` or using the GitHub UI.
- Prefer updating secrets via the GitHub UI or a secure vault for stricter access control.

For custom ngrok domains (optional), set `NGROK_DOMAIN` in your ` .env.development` file :

```bash
NGROK_DOMAIN=your-custom-domain.ngrok-free.dev
```

If not set, ngrok will generate a random domain automatically.
