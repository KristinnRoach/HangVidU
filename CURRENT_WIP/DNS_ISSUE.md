# DNS / Cloudflare follow-up

**2026-05-19**: `hangvidu.com` went down. Root cause: Firebase anchor IP `199.36.158.101` had a broken TLS edge for this domain ("No secure protocols supported" per SSL Labs, cert installed but handshake reset). Half of requests landed on it and failed.

**Quick fix applied**: removed the `199.36.158.101` A record in Cloudflare. Only `199.36.158.100` remains. Site healthy.

## TODO

- [ ] After each Firebase Hosting deploy, run:
  ```
  pnpm check:prod-routing
  ```
  If pnpm is repairing local dependencies, the script can be run directly:
  ```
  bash scripts/check-production-routing.sh
  ```
  Use strict mode when the production domain should be healthy for IPv4-only clients too:
  ```
  pnpm check:prod-routing:strict
  ```
- [ ] Re-test `.101` in ~1 week:
  ```
  curl --resolve hangvidu.com:443:199.36.158.101 -I https://hangvidu.com
  ```
  If it returns 200, re-add the `A hangvidu.com → 199.36.158.101` record in Cloudflare for redundancy.
- [ ] Walk through full Cloudflare DNS setup for `hangvidu.com`:
  - Confirm both Firebase A records (`.100` + `.101`) are present once `.101` is healthy
  - Confirm `www` CNAME → `vidu-aae11.web.app`
  - TXT verification records (`google-site-verification`, `hosting-site=...`) intact
  - Proxy status: DNS only (orange cloud off) — required for current Firebase setup
- [ ] (Optional) Consider Cloudflare Load Balancing or orange-cloud proxy for real health-aware failover. DNS round-robin is not failover — clients can't recover from TLS-layer failures.

## Notes

- Firebase Console shows "Connected" even when an anchor edge is broken — not a reliable health signal.
- SSL Labs (`https://www.ssllabs.com/ssltest/analyze.html?d=hangvidu.com`) is the best external probe for per-IP TLS status.

## 2026-05-27 follow-up

After `pnpm deploy:fb`, Firebase Hosting reported the custom domain as "Connected" and the default site
`https://vidu-aae11.web.app/` served the new release, but `https://hangvidu.com/` timed out for many clients.

Findings:

- Live channel release time: `2026-05-27 17:36:58`.
- `https://vidu-aae11.web.app/` returned `200`.
- `https://hangvidu.com/` returned `200` only after adding `AAAA hangvidu.com -> 2620:0:890::100`.
- Forced IPv6 worked: `curl --resolve 'hangvidu.com:443:[2620:0:890::100]' -I https://hangvidu.com/`.
- Forced IPv4 to `.100` still timed out.
- Forced IPv4 to `.101` still reset TLS.
- Cloudflare production records remained DNS-only; the working path was Firebase IPv6, not Cloudflare proxying.

Remaining robustness options:

- Keep the apex `AAAA` record in place.
- Keep monitoring both address families after deploys; Firebase Console "Connected" does not prove all anchor IPs are healthy.
- If IPv4 remains unhealthy, consider Cloudflare proxy or Cloudflare Load Balancing as a production failover layer.
- If proxying with both `A` and `AAAA` origins fails, test removing the broken `A` origin while keeping the proxied `AAAA` origin.
- Keep Firebase Hosting cache headers explicit for PWA-sensitive files (`index.html`, `sw.js`, `manifest.webmanifest`) so deploys are easier to reason about.
