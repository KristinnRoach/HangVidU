# Suggested Next Slice

Recommended next slice: resolve direct conversation ID compatibility.

Deliverables:

- Decide whether contacts should migrate stored direct conversation IDs to
  `dm:{sortedUserA}:{sortedUserB}` or whether `messaging-next` should accept
  legacy `{sortedUserA}_{sortedUserB}` IDs through an explicit compatibility
  layer.
- Implement only the chosen compatibility path.
- Add focused tests for contact selection into `messaging-next`.
- Update `messaging-core-design.html`, `DECISIONS.md`, and `QUESTIONS.md` if
  the compatibility rule changes the core design.

Why this next:

- The schema and docs say direct conversations use `dm:` IDs, but existing
  contacts may still carry legacy underscore IDs.
- Manual testing through the feature flag depends on contact selection using the
  same conversation identity as the new core.
- This is a fundamental rule; leaving it ambiguous will make repository and
  private transport work harder to reason about.
