/**
 * Large File Transfer Integration Tests
 *
 * Purpose: Determine practical file size limits and test large file transfers
 *
 * Tests file transfers with various sizes and measures:
 * - Transfer time and throughput (MB/s)
 * - Memory usage (before/during/after)
 * - Browser stability (crashes, freezes, timeouts)
 * - Progress callback performance
 *
 * Test files are generated programmatically using pattern-based generation to avoid
 * actual disk usage.
 *
 * Reference: src/file-transfer/refactor.md section "File Size Limit Testing & Validation"
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebRTCFileTransport } from '../../src/file-transfer/transport/webrtc-file-transport.js';

const MB = 1024 * 1024;
const GB = 1024 * MB;

/**
 * Parse file size string like "100MB", "1.5GB", "750MB" to bytes.
 */
function parseSize(str) {
  const match = str.trim().match(/^([\d.]+)\s*(MB|GB)$/i);
  if (!match) throw new Error(`Invalid size format: "${str}" (use e.g. "100MB" or "1.5GB")`);
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  return Math.round(value * (unit === 'GB' ? GB : MB));
}

/**
 * Build test size list.
 *
 * Configured via VITE_FT_SIZES env var:
 *   VITE_FT_SIZES="100,250,500,750,900,1024" pnpm test:file-transfer
 *   VITE_FT_SIZES="500MB,1GB" pnpm test:file-transfer
 *
 * Values without a unit suffix are treated as MB.
 * Default (CI): only 100MB.
 */
function buildTestSizes() {
  const envSizes = import.meta.env.VITE_FT_SIZES;
  if (!envSizes) {
    return [{ size: 100 * MB, name: '100MB' }];
  }

  return envSizes.split(',').map((raw) => {
    const trimmed = raw.trim();
    // If it's just a number, treat as MB
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      const mb = parseFloat(trimmed);
      const bytes = Math.round(mb * MB);
      const label = mb >= 1024 ? `${(mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1)}GB` : `${mb}MB`;
      return { size: bytes, name: label };
    }
    const bytes = parseSize(trimmed);
    return { size: bytes, name: trimmed.toUpperCase() };
  });
}

/**
 * Generate a test file of specified size using pattern-based generation.
 * Creates a reusable 64KB pattern and tiles it to build the file.
 */
function generateTestFile(sizeBytes, name = 'test-file.bin', mimeType = 'application/octet-stream') {
  const PATTERN_SIZE = 64 * 1024;
  const pattern = new Uint8Array(PATTERN_SIZE);
  for (let i = 0; i < PATTERN_SIZE; i++) {
    pattern[i] = i % 256;
  }

  const CHUNK_SIZE = sizeBytes > 500 * MB ? 10 * MB : MB;
  const numChunks = Math.ceil(sizeBytes / CHUNK_SIZE);
  const chunks = [];

  for (let i = 0; i < numChunks; i++) {
    const chunkSize = i === numChunks - 1
      ? sizeBytes - (i * CHUNK_SIZE)
      : CHUNK_SIZE;

    const chunk = new Uint8Array(chunkSize);
    let offset = 0;
    while (offset < chunkSize) {
      const copySize = Math.min(PATTERN_SIZE, chunkSize - offset);
      chunk.set(pattern.subarray(0, copySize), offset);
      offset += copySize;
    }
    chunks.push(chunk);
  }

  return new File([new Blob(chunks, { type: mimeType })], name, { type: mimeType });
}

/**
 * Setup WebRTC peer connections with data channels for testing.
 */
async function setupPeerConnections() {
  const pc1 = new RTCPeerConnection();
  const pc2 = new RTCPeerConnection();

  // Exchange ICE candidates between peers
  pc1.onicecandidate = (e) => { if (e.candidate) pc2.addIceCandidate(e.candidate); };
  pc2.onicecandidate = (e) => { if (e.candidate) pc1.addIceCandidate(e.candidate); };

  const senderChannel = pc1.createDataChannel('files', { ordered: true });

  let receiverChannel = null;
  const receiverReady = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('DataChannel open timeout')), 10000);
    pc2.ondatachannel = (event) => {
      receiverChannel = event.channel;
      if (receiverChannel.readyState === 'open') {
        clearTimeout(timeout);
        resolve();
      } else {
        receiverChannel.onopen = () => { clearTimeout(timeout); resolve(); };
        receiverChannel.onerror = (e) => {
          clearTimeout(timeout);
          reject(e?.error ?? new Error('DataChannel error'));
        };
      }
    };
  });

  const offer = await pc1.createOffer();
  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();
  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);

  // Wait for ICE connection
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('ICE connection timeout')), 30000);

    const checkConnection = () => {
      const s1 = pc1.iceConnectionState;
      const s2 = pc2.iceConnectionState;
      if (s1 === 'connected' || s1 === 'completed' || s2 === 'connected' || s2 === 'completed') {
        clearTimeout(timeout);
        resolve();
      } else if (s1 === 'failed' || s2 === 'failed') {
        clearTimeout(timeout);
        reject(new Error(`ICE connection failed: pc1=${s1}, pc2=${s2}`));
      }
    };

    pc1.oniceconnectionstatechange = checkConnection;
    pc2.oniceconnectionstatechange = checkConnection;
    checkConnection();

    pc1.onconnectionstatechange = () => {
      if (pc1.connectionState === 'connected') { clearTimeout(timeout); resolve(); }
    };
  });

  // Wait for data channels to open
  if (senderChannel.readyState !== 'open') {
    await new Promise((resolve) => { senderChannel.onopen = resolve; });
  }
  await receiverReady;

  return {
    sender: senderChannel,
    receiver: receiverChannel,
    cleanup: () => {
      senderChannel.close();
      if (receiverChannel) receiverChannel.close();
      pc1.close();
      pc2.close();
    },
  };
}

function getMemoryUsage() {
  if (performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
    };
  }
  return null;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDuration(ms) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

describe('Large File Transfer Integration Tests', () => {
  const TEST_SIZES = buildTestSizes();

  const testResults = [];
  let hitSizeLimit = false;

  // Reuse a single peer connection pair across all tests to avoid repeated setup
  let sharedConnections = null;

  beforeAll(async () => {
    console.log('\n[file-transfer-large] Starting test suite');
    console.log(`[file-transfer-large] Browser: ${navigator.userAgent}`);
    console.log(`[file-transfer-large] Sizes: ${TEST_SIZES.map((t) => t.name).join(', ')}`);
    console.log(`[file-transfer-large] Setting up shared peer connection...\n`);
    sharedConnections = await setupPeerConnections();
  });

  afterAll(() => {
    if (sharedConnections) sharedConnections.cleanup();

    // Summary
    const successful = testResults.filter((r) => r.success);
    const failed = testResults.filter((r) => !r.success && r.status !== 'skipped');

    console.log('\n' + '='.repeat(60));
    console.log('  LARGE FILE TRANSFER TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`  Browser: ${navigator.userAgent}`);
    console.log('');

    // Results table
    console.log('  Size     | Status  | Time       | Speed (MB/s)');
    console.log('  ' + '-'.repeat(52));
    testResults.forEach((r) => {
      const sizeCol = r.sizeName.padEnd(8);
      if (r.status === 'skipped') {
        console.log(`  ${sizeCol} | SKIP    |            |`);
      } else if (r.success) {
        const timeCol = formatDuration(r.transferTime).padEnd(10);
        const speedCol = r.throughput.toFixed(1);
        console.log(`  ${sizeCol} | OK      | ${timeCol} | ${speedCol}`);
      } else {
        const err = (r.error || 'unknown').substring(0, 30);
        console.log(`  ${sizeCol} | FAIL    | ${err}`);
      }
    });

    // Average speed
    if (successful.length > 0) {
      const totalMB = successful.reduce((sum, r) => sum + r.fileSize / MB, 0);
      const totalSec = successful.reduce((sum, r) => sum + r.transferTime / 1000, 0);
      const avgSpeed = totalMB / totalSec;
      const secPer100MB = (100 / avgSpeed);
      console.log('');
      console.log(`  Avg speed: ${avgSpeed.toFixed(1)} MB/s (~${secPer100MB.toFixed(2)}s per 100MB)`);
    }

    if (failed.length > 0) {
      const lastOk = successful.length > 0 ? successful[successful.length - 1] : null;
      const firstFail = failed[0];
      console.log(`  Practical limit: ${lastOk ? `${lastOk.sizeName} OK` : 'none passed'}, ${firstFail.sizeName} failed`);
    } else if (successful.length > 0) {
      console.log(`  All tested sizes passed (up to ${successful[successful.length - 1].sizeName})`);
    }

    console.log('='.repeat(60) + '\n');
  });

  TEST_SIZES.forEach(({ size, name }) => {
    it(`should transfer ${name} file successfully`, async () => {
      if (hitSizeLimit) {
        testResults.push({ sizeName: name, fileSize: size, status: 'skipped', success: false });
        console.log(`[${name}] SKIPPED (smaller size failed)`);
        return;
      }

      const result = {
        sizeName: name,
        fileSize: size,
        status: 'running',
        success: false,
        transferTime: 0,
        throughput: 0,
        memoryBefore: null,
        memoryAfter: null,
        progressCallbacks: 0,
        avgProgressInterval: 0,
        errors: [],
        error: null,
      };

      let senderTransport = null;
      let receiverTransport = null;
      let testFile = null;
      let receivedFile = null;

      try {
        result.memoryBefore = getMemoryUsage();

        // Create transports using shared connections
        senderTransport = new WebRTCFileTransport(sharedConnections.sender);
        receiverTransport = new WebRTCFileTransport(sharedConnections.receiver);

        // Generate test file
        console.log(`[${name}] Generating file...`);
        testFile = generateTestFile(size, `test-${name.toLowerCase()}.bin`);
        expect(testFile.size).toBe(size);

        // Receiver setup
        const receivePromise = new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('File receive timeout')), 300000);
          receiverTransport.onFileReceived((file) => { clearTimeout(timeout); receivedFile = file; resolve(file); });
        });

        // Progress tracking with live output
        const sizeMB = size / MB;
        let lastLoggedPct = -10; // log every 10%
        const sendProgress = [];

        const progressCallback = (progress) => {
          sendProgress.push({ progress, timestamp: performance.now() });
          const pct = Math.floor(progress * 100);
          if (pct >= lastLoggedPct + 10) {
            lastLoggedPct = pct;
            const elapsed = (performance.now() - transferStartTime) / 1000;
            const transferredMB = (progress * sizeMB);
            const speed = elapsed > 0 ? (transferredMB / elapsed).toFixed(1) : '...';
            console.log(`[${name}] ${pct}% (${transferredMB.toFixed(0)}/${sizeMB.toFixed(0)} MB) ${speed} MB/s`);
          }
        };

        // Start transfer
        console.log(`[${name}] Transferring...`);
        const transferStartTime = performance.now();

        const sendPromise = senderTransport.sendFile(testFile, progressCallback);

        await Promise.all([sendPromise, receivePromise]);

        const transferTime = performance.now() - transferStartTime;
        result.transferTime = transferTime;
        result.throughput = sizeMB / (transferTime / 1000);

        // Verify received file
        expect(receivedFile).toBeDefined();
        expect(receivedFile.size).toBe(size);
        expect(receivedFile.name).toBe(testFile.name);

        // Spot-check content integrity (first, middle, last 1KB)
        const verify = async (offset, label) => {
          const src = new Uint8Array(await testFile.slice(offset, offset + 1024).arrayBuffer());
          const dst = new Uint8Array(await receivedFile.slice(offset, offset + 1024).arrayBuffer());
          for (let i = 0; i < src.length; i++) {
            if (src[i] !== dst[i]) {
              result.errors.push(`${label} mismatch at byte ${offset + i}`);
              return false;
            }
          }
          return true;
        };
        const okFirst = await verify(0, 'First');
        const okMiddle = size > 2048 ? await verify(Math.floor(size / 2), 'Middle') : true;
        const okLast = size > 2048 ? await verify(size - 1024, 'Last') : true;
        if (!okFirst || !okMiddle || !okLast) {
          throw new Error(`Integrity check failed: ${result.errors[0] ?? 'mismatch'}`);
        }

        // Progress stats
        result.progressCallbacks = sendProgress.length;
        if (sendProgress.length > 1) {
          const intervals = [];
          for (let i = 1; i < sendProgress.length; i++) {
            intervals.push(sendProgress[i].timestamp - sendProgress[i - 1].timestamp);
          }
          result.avgProgressInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        }

        result.memoryAfter = getMemoryUsage();
        result.success = true;
        result.status = 'success';

        console.log(`[${name}] DONE ${formatDuration(transferTime)} @ ${result.throughput.toFixed(1)} MB/s`);

      } catch (error) {
        result.success = false;
        result.status = 'failed';
        result.error = error.message;
        console.error(`[${name}] FAILED: ${error.message}`);

        // Don't throw for known browser limits — document them instead
        const knownBrowserErrors = [
          'NotReadableError',
          'could not be read',
          'out of memory',
          'allocation size overflow',
        ];
        const isKnownLimit = knownBrowserErrors.some((e) => error.message.includes(e) || error.name === e);
        if (!isKnownLimit) throw error;

        hitSizeLimit = true;
        console.log(`[${name}] ^ Known browser limit — skipping larger sizes`);
      } finally {
        if (senderTransport) senderTransport.cleanup();
        if (receiverTransport) receiverTransport.cleanup();

        // Release large file references so GC can reclaim memory between tests
        testFile = null;
        receivedFile = null;

        if (globalThis.gc) globalThis.gc();
        testResults.push(result);
      }
    }, 600000);
  });
});
