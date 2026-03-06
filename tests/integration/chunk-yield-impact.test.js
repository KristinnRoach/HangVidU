/**
 * CHUNK_YIELD_INTERVAL Impact Test
 *
 * Purpose: Measure the impact of disabling CHUNK_YIELD_INTERVAL on:
 * - Transfer throughput
 * - DataChannel backpressure behavior
 * - Time waiting for buffer drain
 * - Simulated media starvation risk
 *
 * Tests both CHUNK_YIELD_INTERVAL: 4 (current) vs null (proposed)
 * to understand the throughput gain vs media quality trade-off.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';

// We'll temporarily override config to test both scenarios
const MB = 1024 * 1024;

/**
 * Generate a test file of specified size
 */
function generateTestFile(sizeBytes, name = 'test-file.bin') {
  const PATTERN_SIZE = 64 * 1024;
  const pattern = new Uint8Array(PATTERN_SIZE);
  for (let i = 0; i < PATTERN_SIZE; i++) {
    pattern[i] = i % 256;
  }

  const CHUNK_SIZE = sizeBytes > 500 * MB ? 10 * MB : MB;
  const numChunks = Math.ceil(sizeBytes / CHUNK_SIZE);
  const chunks = [];

  for (let i = 0; i < numChunks; i++) {
    const chunkSize =
      i === numChunks - 1 ? sizeBytes - i * CHUNK_SIZE : CHUNK_SIZE;
    const chunk = new Uint8Array(chunkSize);
    let offset = 0;
    while (offset < chunkSize) {
      const copySize = Math.min(PATTERN_SIZE, chunkSize - offset);
      chunk.set(pattern.subarray(0, copySize), offset);
      offset += copySize;
    }
    chunks.push(chunk);
  }

  return new File([new Blob(chunks, { type: 'application/octet-stream' })], name, {
    type: 'application/octet-stream',
  });
}

/**
 * Setup peer connections for testing
 */
async function setupPeerConnections() {
  const rtcConfig = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };
  const pc1 = new RTCPeerConnection(rtcConfig);
  const pc2 = new RTCPeerConnection(rtcConfig);

  pc1.onicecandidate = (e) => {
    if (e.candidate) pc2.addIceCandidate(e.candidate);
  };
  pc2.onicecandidate = (e) => {
    if (e.candidate) pc1.addIceCandidate(e.candidate);
  };

  const senderChannel = pc1.createDataChannel('files', { ordered: true });

  let receiverChannel = null;
  const receiverReady = new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('DataChannel open timeout')),
      10000,
    );
    pc2.ondatachannel = (event) => {
      receiverChannel = event.channel;
      if (receiverChannel.readyState === 'open') {
        clearTimeout(timeout);
        resolve();
      } else {
        receiverChannel.onopen = () => {
          clearTimeout(timeout);
          resolve();
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
    const timeout = setTimeout(
      () => reject(new Error('ICE connection timeout')),
      30000,
    );

    const checkConnection = () => {
      const s1 = pc1.iceConnectionState;
      const s2 = pc2.iceConnectionState;
      if (
        s1 === 'connected' ||
        s1 === 'completed' ||
        s2 === 'connected' ||
        s2 === 'completed'
      ) {
        clearTimeout(timeout);
        resolve();
      } else if (s1 === 'failed' || s2 === 'failed') {
        clearTimeout(timeout);
        reject(new Error(`ICE connection failed`));
      }
    };

    pc1.oniceconnectionstatechange = checkConnection;
    pc2.oniceconnectionstatechange = checkConnection;
    checkConnection();
  });

  if (senderChannel.readyState !== 'open') {
    await new Promise((resolve) => {
      senderChannel.onopen = resolve;
    });
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

/**
 * Simulate file transfer with configurable CHUNK_YIELD_INTERVAL
 * Returns metrics about backpressure and transfer performance
 */
async function simulateTransfer(
  senderChannel,
  receiverChannel,
  file,
  yieldInterval,
) {
  const CHUNK_SIZE = 65536; // 64KB network chunk size
  const BACKPRESSURE_THRESHOLD = 256 * 1024; // 256KB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  const metrics = {
    totalTime: 0,
    throughput: 0,
    backpressureEvents: 0,
    totalDrainWaitTime: 0,
    maxBufferedAmount: 0,
    avgBufferedAmount: 0,
    drainWaits: [], // For detailed analysis
  };

  let bufferedAmountSamples = 0;
  const drainWaits = [];

  // Receiver setup
  let receivedChunks = 0;
  const receivePromise = new Promise((resolve) => {
    receiverChannel.onmessage = () => {
      receivedChunks++;
      if (receivedChunks === totalChunks) {
        resolve();
      }
    };
  });

  // Sender: send chunks with optional yield
  const startTime = performance.now();

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = await file.slice(start, end).arrayBuffer();

    // Send chunk
    senderChannel.send(chunk);

    // Monitor backpressure
    const bufferedAmount = senderChannel.bufferedAmount;
    metrics.maxBufferedAmount = Math.max(metrics.maxBufferedAmount, bufferedAmount);
    metrics.avgBufferedAmount += bufferedAmount;
    bufferedAmountSamples++;

    // Handle backpressure
    if (bufferedAmount > BACKPRESSURE_THRESHOLD) {
      metrics.backpressureEvents++;
      const drainStart = performance.now();

      // Wait for drain
      await new Promise((resolve) => {
        const checkDrain = () => {
          if (senderChannel.bufferedAmount <= BACKPRESSURE_THRESHOLD) {
            resolve();
          } else {
            setTimeout(checkDrain, 10);
          }
        };
        checkDrain();
      });

      const drainDuration = performance.now() - drainStart;
      metrics.totalDrainWaitTime += drainDuration;
      drainWaits.push(drainDuration);
    }

    // Yield to event loop if configured (simulate CHUNK_YIELD_INTERVAL)
    if (yieldInterval !== null && (i + 1) % yieldInterval === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  metrics.totalTime = performance.now() - startTime;
  metrics.throughput = (file.size / MB) / (metrics.totalTime / 1000);
  metrics.avgBufferedAmount =
    bufferedAmountSamples > 0 ? metrics.avgBufferedAmount / bufferedAmountSamples : 0;
  metrics.drainWaits = drainWaits;

  // Wait for all chunks to be received
  await receivePromise;

  return metrics;
}

const isFirefox =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Firefox');

if (!isFirefox) {
  describe('CHUNK_YIELD_INTERVAL Impact Test', () => {
    let connections = null;

    beforeAll(async () => {
      console.log('\n[chunk-yield-impact] Setting up peer connections...');
      connections = await setupPeerConnections();
    });

    afterAll(() => {
      if (connections) connections.cleanup();
    });

    it('should measure impact of yield interval on 100MB transfer', async () => {
      const FILE_SIZE = 100 * MB;
      const testFile = generateTestFile(FILE_SIZE, 'test-yield-impact.bin');

      console.log(
        `\n[chunk-yield-impact] Testing 100MB transfer with different CHUNK_YIELD_INTERVAL values`,
      );

      // Test WITH yield interval (current behavior)
      console.log('\n[chunk-yield-impact] Test 1: CHUNK_YIELD_INTERVAL = 4');
      const withYield = await simulateTransfer(
        connections.sender,
        connections.receiver,
        testFile,
        4, // yield every 4 chunks
      );

      // Test WITHOUT yield interval (proposed behavior)
      console.log('[chunk-yield-impact] Test 2: CHUNK_YIELD_INTERVAL = null');
      const withoutYield = await simulateTransfer(
        connections.sender,
        connections.receiver,
        testFile,
        null, // no yield
      );

      // Log results
      console.log('\n' + '='.repeat(70));
      console.log('  CHUNK_YIELD_INTERVAL IMPACT ANALYSIS');
      console.log('='.repeat(70));

      console.log('\nTransfer Performance:');
      console.log(
        `  WITH yield (4):     ${withYield.totalTime.toFixed(0)}ms @ ${withYield.throughput.toFixed(1)} MB/s`,
      );
      console.log(
        `  WITHOUT yield:      ${withoutYield.totalTime.toFixed(0)}ms @ ${withoutYield.throughput.toFixed(1)} MB/s`,
      );
      const speedup = withYield.throughput / withoutYield.throughput;
      console.log(
        `  Speed difference:   ${speedup > 1 ? 'WITH yield is SLOWER by ' + speedup.toFixed(2) + 'x' : 'WITHOUT yield is SLOWER by ' + (1 / speedup).toFixed(2) + 'x'}`,
      );

      console.log('\nBackpressure Behavior:');
      console.log(
        `  WITH yield (4):     ${withYield.backpressureEvents} events, ${withYield.totalDrainWaitTime.toFixed(0)}ms total drain time`,
      );
      console.log(
        `  WITHOUT yield:      ${withoutYield.backpressureEvents} events, ${withoutYield.totalDrainWaitTime.toFixed(0)}ms total drain time`,
      );

      console.log('\nBuffer Saturation:');
      console.log(
        `  WITH yield (4):     max ${(withYield.maxBufferedAmount / 1024).toFixed(0)}KB, avg ${(withYield.avgBufferedAmount / 1024).toFixed(0)}KB`,
      );
      console.log(
        `  WITHOUT yield:      max ${(withoutYield.maxBufferedAmount / 1024).toFixed(0)}KB, avg ${(withoutYield.avgBufferedAmount / 1024).toFixed(0)}KB`,
      );

      console.log('\nInterpretation:');
      if (withoutYield.maxBufferedAmount > 2 * MB) {
        console.log(
          `  ⚠️  WITHOUT yield: Buffer reaches ${(withoutYield.maxBufferedAmount / MB).toFixed(1)}MB (HIGH RISK for media starvation)`,
        );
      } else if (withoutYield.maxBufferedAmount > 1 * MB) {
        console.log(
          `  ⚠️  WITHOUT yield: Buffer reaches ${(withoutYield.maxBufferedAmount / MB).toFixed(1)}MB (MODERATE risk for media starvation)`,
        );
      } else {
        console.log(
          `  ✓  WITHOUT yield: Buffer stays low (${(withoutYield.maxBufferedAmount / MB).toFixed(1)}MB) - safe for media`,
        );
      }

      console.log('='.repeat(70) + '\n');

      // Both should complete without error
      expect(withYield.totalTime).toBeGreaterThan(0);
      expect(withoutYield.totalTime).toBeGreaterThan(0);
    }, 600000);
  });
}
