# Phase 1: Investigation & Root Cause Analysis - Context

**Gathered:** 2025-12-26
**Status:** Ready for planning

<vision>
## How This Should Work

This phase uses a mixed approach starting with code analysis followed by testing. Begin by reading through the camera switch implementation to understand the WebRTC flow, then validate theories through controlled testing.

The investigation should trace through the entire code path: when a user switches cameras, what happens to the local stream, how is that communicated to the peer connection, and where exactly does the remote peer's video stream freeze.

Use minimal proof-of-concept tests to validate theories without implementing full fixes. These should be small, focused test cases that help confirm or reject hypotheses about the failure mechanism.

</vision>

<essential>
## What Must Be Nailed

All three of these are equally critical for this phase:

- **Understanding the exact failure point** - Know precisely where in the WebRTC flow the remote stream freezes
- **Identifying the root cause** - Not just where it fails, but WHY it fails — what's the underlying issue with track replacement or renegotiation
- **Creating a reproducible test case** - Have a reliable way to reproduce the freeze on demand for testing fixes in Phase 2

</essential>

<boundaries>
## What's Out of Scope

- **Implementing any fixes** - This is investigation only. The actual fix implementation happens in Phase 2.

</boundaries>

<specifics>
## Specific Ideas

- **Minimal proof-of-concept tests** - Create small test cases to validate theories about the failure mechanism without implementing the full solution
- Focus on understanding the WebRTC track replacement mechanics and peer connection behavior during camera switches

</specifics>

<notes>
## Additional Context

The investigation should follow a "code first, then test" sequence:
1. Read and understand the existing camera switch implementation
2. Form theories about why remote streams freeze
3. Create minimal tests to validate or reject those theories
4. Document findings to inform Phase 2's fix implementation

The output should be clear understanding + reproducible test case, not a working fix.

</notes>

---

*Phase: 01-investigation-root-cause*
*Context gathered: 2025-12-26*
