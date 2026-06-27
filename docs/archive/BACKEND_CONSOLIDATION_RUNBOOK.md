# Backend Consolidation — Post-merge Runbook

**Owner:** project owner · **Execute after:** the consolidation implementation PR
is merged and its checks pass.

This runbook owns production deployment, verification, the seven-day compatibility
window, and old-Worker retirement. These are not implementation-PR completion gates.

## 1. Preconditions — abort before deploy if any fail

- [ ] Implementation tests, Wrangler config validation, and dry run are green
- [ ] Production D1/R2 IDs and all DO bindings match the approved plan
- [ ] `hangvidu-data` retains DO migrations v1/v2 and adds only the approved v3
  `SignalingRoom` transfer from `hangvidu-signaling`
- [ ] `SignalingRoom` is not also listed under `new_sqlite_classes`
- [ ] Production `APP_ENV`, CORS origins, and `VITE_HANGVIDU_API_URL` are correct
- [ ] `hangvidu-files` and `hangvidu-signaling` remain deployed
- [ ] Current production text, image, and call smoke checks pass before migration

## 2. Deploy backend

1. Deploy consolidated `hangvidu-data`. The v3 transfer is atomic; after it
   succeeds, recovery is forward-fix rather than rollback to pre-v3.
2. Verify health, resolve-direct, member/non-member reads, image
   upload/download/delete, live push, mailbox, and signaling through
   `hangvidu-data`.
3. Verify signaling through the old `hangvidu-signaling` URL. Cloudflare forwards
   its existing binding to the transferred namespace, so old and new clients use
   the same rooms.
4. If any backend check fails, do not deploy the client. Forward-fix the Worker
   and repeat all checks.

Active signaling sockets may reconnect during the migration. The client restores
room presence after reconnect; a call in progress may still experience a one-time
interruption.

## 3. Deploy client

1. Deploy the client with
   `VITE_HANGVIDU_API_URL=https://hangvidu-data.kristinnroach.workers.dev`.
2. Confirm the immediate service-worker update activates the new client.
3. Smoke-test send/receive text and image plus place/receive/cancel call.

## 4. Seven-day compatibility window

- Keep `hangvidu-files` and `hangvidu-signaling` deployed for exactly seven days.
- Freeze `hangvidu-signaling`: do not redeploy or modify it during this window.
  Its already-deployed binding forwards automatically after the transfer.
- If the old signaling Worker develops an issue, do not attempt an ad-hoc
  redeploy. Either forward-fix `hangvidu-data` or end the compatibility window
  early after verifying updated clients. Any exceptional old-Worker redeploy
  requires a separately reviewed recovery plan with an explicit cross-script
  binding; it is not part of this runbook.

## 5. Retirement

After seven days:

1. Repeat production health, text, image, mailbox, and call smoke tests.
2. Retire `hangvidu-files` and `hangvidu-signaling`.
3. Update architecture and operations documentation to the as-built layout.

Dormant clients may require a refresh after old endpoints are retired. Indefinite
legacy compatibility is out of scope.

Reference: [Cloudflare Durable Object transfer migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#transfer-migration).
