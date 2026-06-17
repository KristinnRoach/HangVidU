# R2 File Storage First Slice

This first slice keeps Firebase RTDB as the message database and moves file
bytes out of RTDB. RTDB stores message metadata plus an R2 object key.

## 1. Create The Bucket

Create one private R2 bucket in Cloudflare:

```bash
pnpm dlx wrangler@latest login
pnpm dlx wrangler@latest r2 bucket create hangvidu-files
```

Dashboard path: **R2 Object Storage > Create bucket**.

Files are served through the authenticated files Worker, not through public R2
object URLs. Keep the bucket private.

## 2. Create Migration Credentials

In Cloudflare, create an R2 API token with object read/write access scoped to
`hangvidu-files`.

Copy [.env.r2.example](../.env.r2.example) to `.env.r2.local` and fill in:

```bash
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=hangvidu-files
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

The dry run prints migratable RTDB image messages with `type: "file"`, an
`image/*` MIME type, and a `data:` URL, but does not upload or write RTDB.
Already-migrated rows with `storage.provider: "r2"` are skipped, so
`candidates: 0` is expected after the migration has run.

## 4. Upload And Patch RTDB

```bash
pnpm migrate:rtdb-files:r2 -- --limit=5
```

Once the app renders those files from R2, run the rest:

```bash
pnpm migrate:rtdb-files:r2
```

By default the script leaves the original RTDB `data` field untouched during the
upload step. After verification, remove old inline bytes from already-migrated
R2 image messages with:

```bash
pnpm migrate:rtdb-files:r2 -- --remove-data
```

Use the `--remove-data` dry run first if you only want to inspect remaining
inline-byte cleanup candidates.

## 5. RTDB File Shape After Migration

The migration patches each file message with:

```json
{
  "type": "file",
  "fileName": "demo.png",
  "mimeType": "image/png",
  "fileSize": 123,
  "storage": {
    "provider": "r2",
    "bucket": "hangvidu-files",
    "key": "conversation-files/conversation/message"
  }
}
```

The canonical key shape is `conversation-files/{conversationId}/{objectId}`.
For migrated rows, `{objectId}` is the RTDB message id. Rows from the earlier
legacy R2 key shape (`conversations/{conversationId}/media/...`) were rewritten
with:

```bash
pnpm migrate:rtdb-files:r2:rewrite-legacy
```

Verify all old legacy R2 media objects have canonical copies with:

```bash
pnpm migrate:rtdb-files:r2:verify-legacy-copies
```
