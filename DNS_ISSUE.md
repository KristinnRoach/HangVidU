# DNS / Cloudflare follow-up

**2026-05-19**: `hangvidu.com` went down. Root cause: Firebase anchor IP `199.36.158.101` had a broken TLS edge for this domain ("No secure protocols supported" per SSL Labs, cert installed but handshake reset). Half of requests landed on it and failed.

**Quick fix applied**: removed the `199.36.158.101` A record in Cloudflare. Only `199.36.158.100` remains. Site healthy.

## TODO

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
