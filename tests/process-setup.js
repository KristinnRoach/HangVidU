// Suppress the birpc teardown race condition (vitest-browser + manual mocks).
// When the RPC channel closes while a mock resolution is still in flight, Node
// emits an unhandledRejection that makes vitest exit with code 1 even though
// all tests passed. This is a known upstream issue; swallow it here.
export function setup() {
  const onUnhandledRejection = (reason) => {
    const msg = reason?.message ?? '';
    const causeMsg = reason?.cause?.message ?? '';
    if (msg.includes('rpc is closed') || causeMsg.includes('rpc is closed')) return;
    throw reason;
  };

  process.on('unhandledRejection', onUnhandledRejection);

  return () => {
    process.off('unhandledRejection', onUnhandledRejection);
  };
}
