# Suggested Next Slice

Recommended next slice: define the core interfaces without wiring runtime.

Deliverables:

- Add a `MessageRepository` interface for persistent backends.
- Add a `PrivateMessageTransport` interface for P2PRoom/data-channel delivery.
- Add a small `MessagingService` interface that depends only on those contracts.
- Add focused tests using in-memory fakes.
- Update `messaging-core-design.html` if the interface names or boundaries
  change.

Why this next:

- It keeps Firebase RTDB swappable before an RTDB implementation is ported.
- It lets private mode align with P2PRoom lifecycle before UI code depends on it.
- It avoids carrying over legacy controller responsibilities into the new module.
