# SW Video Serving — Manual Browser Tests

Paste these in the browser console after `pnpm build:hosting && pnpm preview`.

## 1. Verify SW is active

```js
(async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  console.table({
    registered: !!reg,
    active: !!reg?.active,
    controller: !!navigator.serviceWorker.controller,
    state: reg?.active?.state || 'none',
  });
})();
```

## 2. OPFS write + SW range request test

Writes a 10KB file to OPFS, registers it with the SW, tests full fetch, range fetch, and open-ended range fetch.

```js
(async () => {
  const FILE_ID = 'test-video-e2e-' + Date.now();
  const MIME = 'video/mp4';

  // Write test file to OPFS
  const root = await navigator.storage.getDirectory();
  const dir = await root.getDirectoryHandle('file-transfers', { create: true });
  const fh = await dir.getFileHandle(FILE_ID, { create: true });
  const w = await fh.createWritable();
  const data = new Uint8Array(10240);
  for (let i = 0; i < data.length; i++) data[i] = i % 256;
  await w.write(data);
  await w.close();

  // Register with SW
  navigator.serviceWorker.controller.postMessage({ type: 'REGISTER_VIDEO', fileId: FILE_ID, mimeType: MIME });
  await new Promise(r => setTimeout(r, 100));

  const url = '/_video-serve/' + FILE_ID;

  // Full fetch
  const full = await fetch(url);
  const fullBuf = await full.arrayBuffer();
  console.assert(full.status === 200, 'Full: expected 200, got', full.status);
  console.assert(full.headers.get('Content-Type') === MIME, 'Full: wrong Content-Type');
  console.assert(full.headers.get('Accept-Ranges') === 'bytes', 'Full: missing Accept-Ranges');
  console.assert(fullBuf.byteLength === 10240, 'Full: wrong body size', fullBuf.byteLength);

  // Range fetch
  const range = await fetch(url, { headers: { Range: 'bytes=0-499' } });
  const rangeBuf = await range.arrayBuffer();
  console.assert(range.status === 206, 'Range: expected 206, got', range.status);
  console.assert(range.headers.get('Content-Range') === 'bytes 0-499/10240', 'Range: wrong Content-Range');
  console.assert(rangeBuf.byteLength === 500, 'Range: wrong body size');

  // Open-ended range
  const open = await fetch(url, { headers: { Range: 'bytes=5000-' } });
  const openBuf = await open.arrayBuffer();
  console.assert(open.status === 206, 'Open range: expected 206, got', open.status);
  console.assert(open.headers.get('Content-Range') === 'bytes 5000-10239/10240', 'Open range: wrong Content-Range');
  console.assert(openBuf.byteLength === 5240, 'Open range: wrong body size');

  // Cleanup
  navigator.serviceWorker.controller.postMessage({ type: 'UNREGISTER_VIDEO', fileId: FILE_ID });
  await dir.removeEntry(FILE_ID);

  console.log('All SW video serving tests passed');
})();
```

## 3. Video element playback test

Tests that a `<video>` element accepts the SW URL and fires `loadstart`. Uses a minimal MP4 ftyp box — won't play real video but confirms the SW-to-video pipeline works.

```js
(async () => {
  const FILE_ID = 'test-playback-' + Date.now();
  const MIME = 'video/mp4';

  const root = await navigator.storage.getDirectory();
  const dir = await root.getDirectoryHandle('file-transfers', { create: true });
  const fh = await dir.getFileHandle(FILE_ID, { create: true });
  const w = await fh.createWritable();
  // Minimal MP4 ftyp box (20 bytes)
  await w.write(new Uint8Array([
    0,0,0,0x14, 0x66,0x74,0x79,0x70, 0x69,0x73,0x6F,0x6D,
    0,0,0,0,    0x69,0x73,0x6F,0x6D,
  ]));
  await w.close();

  navigator.serviceWorker.controller.postMessage({ type: 'REGISTER_VIDEO', fileId: FILE_ID, mimeType: MIME });
  await new Promise(r => setTimeout(r, 100));

  const video = document.createElement('video');
  const events = [];
  video.addEventListener('loadstart', () => events.push('loadstart'));
  video.addEventListener('loadeddata', () => events.push('loadeddata'));
  video.addEventListener('error', () => events.push('error:' + (video.error?.message || video.error?.code)));

  video.src = '/_video-serve/' + FILE_ID;
  video.load();

  await new Promise(r => setTimeout(r, 2000));
  console.log('Video events:', events);
  console.log('networkState:', video.networkState, 'readyState:', video.readyState);
  console.assert(events.includes('loadstart'), 'Expected loadstart event');
  console.assert(video.currentSrc.includes('/_video-serve/'), 'currentSrc should be SW URL');

  video.src = '';
  navigator.serviceWorker.controller.postMessage({ type: 'UNREGISTER_VIDEO', fileId: FILE_ID });
  await dir.removeEntry(FILE_ID);
  console.log('Video element test done');
})();
```
