import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { createConversationFileObjectUrl } from '@stores/files-store';
import {
  attachmentPreviewKey,
  createAttachmentPreviews,
} from './attachment-previews';

vi.mock('@stores/files-store', () => ({
  createConversationFileObjectUrl: vi.fn(),
}));

function image(key, fileSize = 100) {
  return {
    type: 'file',
    fileName: 'image.png',
    mimeType: 'image/png',
    fileSize,
    storage: { provider: 'r2', bucket: 'files', key },
  };
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

describe('attachment preview ownership', () => {
  let cache, changed, revoke;
  beforeEach(() => {
    vi.clearAllMocks();
    createConversationFileObjectUrl.mockReset();
    revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    changed = vi.fn();
    cache = createAttachmentPreviews(changed);
  });
  afterEach(() => {
    cache.dispose();
    vi.restoreAllMocks();
  });

  it('shares one load and URL across repeated references until the final reference leaves', async () => {
    createConversationFileObjectUrl.mockResolvedValue('blob:shared');
    const file = image('shared');
    cache.update('conversation', [file, { ...file }]);
    await vi.waitFor(() =>
      expect(changed).toHaveBeenLastCalledWith({
        [attachmentPreviewKey('conversation', file.storage)]: 'blob:shared',
      }),
    );
    expect(createConversationFileObjectUrl).toHaveBeenCalledExactlyOnceWith(
      'conversation',
      file.storage,
      expect.any(AbortSignal),
      1.5 * 1024 * 1024,
    );
    cache.update('conversation', [file]);
    expect(createConversationFileObjectUrl).toHaveBeenCalledTimes(1);
    expect(revoke).not.toHaveBeenCalled();
    cache.update('conversation', []);
    expect(revoke).toHaveBeenCalledExactlyOnceWith('blob:shared');
  });

  it('allows three concurrent downloads and cancels obsolete queued work', async () => {
    const loads = [];
    createConversationFileObjectUrl.mockImplementation(() => {
      const pending = deferred();
      loads.push(pending);
      return pending.promise;
    });
    cache.update(
      'conversation',
      Array.from({ length: 10 }, (_, i) => image(String(i))),
    );
    expect(loads).toHaveLength(3);
    loads[0].resolve('blob:first');
    await vi.waitFor(() => expect(loads).toHaveLength(4));
    const signals = createConversationFileObjectUrl.mock.calls.map(
      (call) => call[2],
    );
    cache.update(null, []);
    expect(signals.every((signal) => signal.aborted)).toBe(true);
    for (const load of loads.slice(1)) load.resolve('blob:obsolete');
    await vi.waitFor(() => expect(revoke).toHaveBeenCalledTimes(4));
    expect(loads).toHaveLength(4);
    expect(changed).toHaveBeenLastCalledWith({});
  });

  it('cannot publish a late URL over a replacement request for the same object', async () => {
    const old = deferred(),
      replacement = deferred();
    createConversationFileObjectUrl
      .mockReturnValueOnce(old.promise)
      .mockReturnValueOnce(replacement.promise);
    const file = image('same');
    cache.update('conversation', [file]);
    cache.update('conversation', []);
    cache.update('conversation', [file]);
    replacement.resolve('blob:new');
    old.resolve('blob:old');
    await vi.waitFor(() => expect(revoke).toHaveBeenCalledWith('blob:old'));
    expect(changed).toHaveBeenLastCalledWith({
      [attachmentPreviewKey('conversation', file.storage)]: 'blob:new',
    });
  });

  it('releases loaded URLs on dispose and revokes URLs that finish afterward', async () => {
    const late = deferred();
    createConversationFileObjectUrl
      .mockResolvedValueOnce('blob:loaded')
      .mockReturnValueOnce(late.promise);
    cache.update('conversation', [image('a'), image('b')]);
    await vi.waitFor(() =>
      expect(Object.values(changed.mock.calls.at(-1)[0])).toEqual([
        'blob:loaded',
      ]),
    );
    cache.dispose();
    expect(revoke).toHaveBeenCalledWith('blob:loaded');
    const calls = changed.mock.calls.length;
    late.resolve('blob:late');
    await vi.waitFor(() => expect(revoke).toHaveBeenCalledWith('blob:late'));
    expect(changed).toHaveBeenCalledTimes(calls);
    expect(
      createConversationFileObjectUrl.mock.calls.every(
        (call) => call[2].aborted,
      ),
    ).toBe(true);
  });

  it('does not repeatedly retry failed previews when the message list updates', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    createConversationFileObjectUrl.mockRejectedValue(
      new Error('preview too large'),
    );
    const file = image('failed');
    cache.update('conversation', [file]);
    await vi.waitFor(() => expect(console.warn).toHaveBeenCalledOnce());
    cache.update('conversation', [file, file]);
    expect(createConversationFileObjectUrl).toHaveBeenCalledTimes(1);
  });

  it('bounds preview count and skips large files while keeping other files out of automatic loading', async () => {
    createConversationFileObjectUrl.mockImplementation(
      async (_conversation, storage) => `blob:${storage.key}`,
    );
    cache.update('conversation', [
      ...Array.from({ length: 50 }, (_, i) => image(String(i))),
      image('large', 1.5 * 1024 * 1024 + 1),
      image('invalid', NaN),
      { ...image('pdf'), mimeType: 'application/pdf' },
    ]);
    await vi.waitFor(() =>
      expect(createConversationFileObjectUrl).toHaveBeenCalledTimes(40),
    );
    expect(
      createConversationFileObjectUrl.mock.calls.map((call) => call[1].key),
    ).toEqual(Array.from({ length: 40 }, (_, i) => String(49 - i)));
  });

  it('isolates preview identities by conversation, bucket and storage key', () => {
    const storage = image('key').storage;
    expect(
      new Set([
        attachmentPreviewKey('a', storage),
        attachmentPreviewKey('b', storage),
        attachmentPreviewKey('a', { ...storage, bucket: 'other' }),
        attachmentPreviewKey('a', { ...storage, key: 'other' }),
      ]).size,
    ).toBe(4);
  });
});
