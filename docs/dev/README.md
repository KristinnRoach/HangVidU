## Development

The `pnpm dev` command starts both Vite and ngrok for local development with HTTPS tunneling.

### Environment configuration

Your environment variables are managed in separate files for each environment:

- ` .env.development` for local/dev settings
- ` .env.production` for production deploys (do not commit real secrets)

Do NOT commit a real `.env.production` file.

To help local testing you can copy the template:

```bash
cp .env.production.example .env.production
# edit .env.production locally — do NOT commit this file
```

For Firebase Hosting deploys, use your local production env values when running the deploy scripts.

For custom ngrok domains (optional), set `NGROK_DOMAIN` in your ` .env.development` file :

```bash
NGROK_DOMAIN=your-custom-domain.ngrok-free.dev
```

If not set, ngrok will generate a random domain automatically.
