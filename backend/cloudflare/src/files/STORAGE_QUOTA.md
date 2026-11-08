# File storage quota

`TOTAL_FILE_STORAGE_BYTES` in `storage-quota.ts` sets the app-wide limit
(default: 1 GiB). The separate 5 MiB per-file limit is unchanged.

Before deploying the Worker, apply migration 0009 with `vp run migrate:remote`
from the repository root. Then use the normal `vp run deploy:cf` workflow.
The first upload or deletion initializes the D1 ledger from all existing R2
objects. Existing files count, including unattached files. Downloads remain
available when the quota is full; uploads return HTTP 507.

All writes must go through the Worker. Direct dashboard/S3 writes bypass the
ledger, and direct deletions do not reclaim ledger space. A storage quota does
not cap request charges or other Cloudflare costs.

Reservations remain charged if an R2 write throws, because the write may have
succeeded despite the error. A failed deletion or ledger update can also leave
an overcount. To reconcile, pause uploads and deletions (including in-flight
requests), clear `file_storage_usage` and `file_storage_quota_state` in a D1
transaction, then resume. The next upload/deletion rebuilds the ledger from R2.
Never reset the ledger while writes are in progress.
