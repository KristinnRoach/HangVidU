# R2 File Storage First Slice

This first slice keeps Firebase RTDB as the message database and moves file
bytes out of RTDB. RTDB stores message metadata plus an R2 object key/public URL.

## 1. Create The Bucket

Create one private R2 bucket in Cloudflare:

```bash
pnpm dlx wrangler@latest login
pnpm dlx wrangler@latest r2 bucket create hangvidu-message-files
```

Dashboard path: **R2 Object Storage > Create bucket**.

For the fastest image-load validation, attach a temporary public read base:

- preferred: add an R2 custom domain such as `files.your-domain.com`
- temporary: enable the bucket's public `r2.dev` URL

Do not keep private user content publicly readable longer than needed. The next
hardening step should be a Worker download endpoint that verifies Firebase auth
and conversation membership before streaming the R2 object.

## 2. Create Migration Credentials

In Cloudflare, create an R2 API token with object read/write access scoped to
`hangvidu-message-files`.

Copy [.env.r2.example](../.env.r2.example) to `.env.r2.local` and fill in:

```bash
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=hangvidu-message-files
R2_PUBLIC_BASE_URL=https://files.your-domain.com
GOOGLE_APPLICATION_CREDENTIALS=functions/service-account-key.json
FIREBASE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
```

`.env.r2.local` is ignored by git through the existing `.env.*.local` rule.

## 3. Dry-Run The RTDB Scan

```bash
pnpm migrate:rtdb-files:r2:dry
```

Useful filters:

```bash
pnpm migrate:rtdb-files:r2:dry -- --conversation=user-a_user-b
pnpm migrate:rtdb-files:r2:dry -- --limit=5
```

The dry run prints migratable RTDB file messages with `type: "file"` and a
`data:` URL, but does not upload or write RTDB.

## 4. Upload And Patch RTDB

```bash
pnpm migrate:rtdb-files:r2 -- --limit=5
```

Once the app renders those files from R2, run the rest:

```bash
pnpm migrate:rtdb-files:r2
```

By default the script keeps the original RTDB `data` field as a fallback. After
verification, remove old inline bytes with:

```bash
pnpm migrate:rtdb-files:r2 -- --remove-data
```

## 5. RTDB File Shape After Migration

The migration patches each file message with:

```json
{
  "type": "file",
  "fileName": "demo.png",
  "mimeType": "image/png",
  "fileSize": 123,
  "url": "https://files.example.com/message-files/conversation/message/demo.png",
  "storage": {
    "provider": "r2",
    "bucket": "hangvidu-message-files",
    "key": "message-files/conversation/message/demo.png"
  }
}
```

The current app still supports the old inline `data:` shape, so rollback is just
removing `url`/`storage` from affected messages as long as `data` has not been
removed.
