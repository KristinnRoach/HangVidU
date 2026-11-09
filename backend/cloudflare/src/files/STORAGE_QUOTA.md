# File storage quota

`TOTAL_FILE_STORAGE_BYTES` in `storage-quota.ts` sets the app-wide limit
(default: 5 GiB). The separate 5 MiB per-file limit is unchanged.

Before deploying the Worker, apply migrations through 0010 with `vp run migrate:remote`
from the repository root. Then use the normal `vp run deploy:cf` workflow.
Uploads and authorized deletions initialize the D1 ledger from existing R2
objects, at most 100 objects per request. Each page and its cursor commit
atomically; concurrent requests cannot replay stale pages or mark an incomplete
inventory ready. Until the final page commits, these requests return HTTP 503
with `Retry-After: 1` and perform no R2 writes. Retry the request to advance the
inventory; progress survives request failures. For a large existing bucket,
repeat an authorized upload request until initialization completes before
opening uploads to users (the first successful request stores that file).
Existing files count, including unattached files. Downloads remain available
during initialization and when the quota is full; full-quota uploads return
HTTP 507.

All writes must go through the Worker. Direct dashboard/S3 writes bypass the
ledger, and direct deletions do not reclaim ledger space. A storage quota does
not cap request charges or other Cloudflare costs.

Reservations remain charged if an R2 write throws, because the write may have
succeeded despite the error. Before deleting an R2 object, the Worker records
deletion intent and its uploader in D1. If deletion or quota release fails,
retry the same DELETE as that uploader (who must still be a conversation
member). A retry can finish even if the object is already missing. Quota release
and deletion-intent cleanup commit atomically. Ordinary 404s never release
reservations, since an upload may still be in flight.

To reconcile other overcounts, pause uploads and deletions (including in-flight
requests), clear `file_storage_usage`, `file_storage_quota_state`,
`file_storage_quota_inventory` and `file_storage_pending_deletions` in a D1
transaction, then resume. Subsequent upload/deletion requests rebuild the ledger
from R2 in bounded pages. Never reset the ledger while writes are in progress.

Unexpected client-observed upload failures (network, server errors other than
quota rejection, or invalid success metadata) are captured through the existing
browser Sentry SDK. Events include status and file size, without file names,
contents, object keys, or response bodies. Expected HTTP rejections remain logs.
