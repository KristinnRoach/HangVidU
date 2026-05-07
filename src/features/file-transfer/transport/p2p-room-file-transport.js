import { FileTransport } from './file-transport.js';
import { TransferConfig } from '../config.js';

const BACKPRESSURE_THRESHOLD = TransferConfig.BACKPRESSURE_THRESHOLD;
const FILE_META_TYPE = 'FILE_META';
const FILE_CHUNK_TYPE = 'FILE_CHUNK';

/**
 * FileTransport adapter for @kidlib/p2p room messaging.
 *
 * Outbound data is sent through room.send(memberId, data). Incoming data is
 * received from the room's message event and filtered to the existing
 * file-transfer protocol so unrelated room messages are ignored.
 */
export class P2PRoomFileTransport extends FileTransport {
  /**
   * Create a transport for one remote room member.
   * @param {{ room: Object, memberId: string }} options
   */
  constructor({ room, memberId }) {
    super();

    if (!room || typeof room.send !== 'function' || typeof room.on !== 'function') {
      throw new Error('P2PRoomFileTransport requires a p2p room');
    }
    if (!memberId || typeof memberId !== 'string') {
      throw new Error('P2PRoomFileTransport requires memberId');
    }

    this.room = room;
    this.memberId = memberId;
    this._messageCallback = null;
    this._unsubscribe = null;
  }

  /**
   * Send one raw protocol payload to the configured member.
   * @param {string|ArrayBuffer|ArrayBufferView|Blob} data
   * @returns {void}
   */
  send(data) {
    this.room.send(this.memberId, data);
  }

  /**
   * Register the incoming file-transfer payload callback.
   * @param {(data: string|ArrayBuffer|ArrayBufferView|Blob) => void} callback
   * @returns {void}
   */
  onMessage(callback) {
    if (typeof callback !== 'function') {
      throw new Error('P2PRoomFileTransport.onMessage requires callback');
    }

    this._messageCallback = callback;
    this._unsubscribe?.();

    this._unsubscribe = this.room.on('dataChannelMessage', async (event) => {
      const remoteMemberId = event?.memberId ?? event?.peerId;
      if (remoteMemberId !== this.memberId) return;

      const data = event?.data;
      if (!(await isFileTransferPayload(data))) return;

      this._messageCallback?.(data);
    });
  }

  /**
   * Return whether the member's data channel is open.
   * @returns {boolean}
   */
  isReady() {
    const channel = this._getDataChannel();
    if (channel) return channel.readyState === 'open';

    return (
      this.room?.state === 'joined' &&
      Array.isArray(this.room?.members) &&
      this.room.members.includes(this.memberId)
    );
  }

  /**
   * Return a wait function that resolves after the member channel drains.
   * @returns {() => Promise<void>}
   */
  getWaitForDrain() {
    return async () => {
      const dc = this._getDataChannel();
      if (
        !dc ||
        dc.readyState !== 'open' ||
        dc.bufferedAmount <= BACKPRESSURE_THRESHOLD
      ) {
        return;
      }

      let previousThreshold;
      try {
        previousThreshold = dc.bufferedAmountLowThreshold;
        dc.bufferedAmountLowThreshold = BACKPRESSURE_THRESHOLD;
      } catch {}

      await new Promise((resolve) => {
        let resolved = false;
        let pollId = null;

        const cleanup = () => {
          try {
            dc.removeEventListener?.('bufferedamountlow', onLow);
          } catch {}
          if (pollId !== null) clearInterval(pollId);
        };

        const onLow = () => {
          if (resolved) return;
          if (
            !dc ||
            dc.readyState !== 'open' ||
            dc.bufferedAmount <= BACKPRESSURE_THRESHOLD
          ) {
            resolved = true;
            cleanup();
            resolve();
          }
        };

        try {
          dc.addEventListener?.('bufferedamountlow', onLow);
        } catch {}

        onLow();
        pollId = setInterval(onLow, 50);
      }).finally(() => {
        try {
          if (previousThreshold !== undefined) {
            dc.bufferedAmountLowThreshold = previousThreshold;
          }
        } catch {}
      });
    };
  }

  /**
   * Remove only this adapter's room listener; never closes the room.
   * @returns {void}
   */
  cleanup() {
    this._unsubscribe?.();
    this._unsubscribe = null;
    this._messageCallback = null;
    this.room = null;
  }

  /**
   * Read the current room data channel for this member.
   * @returns {RTCDataChannel|null}
   * @private
   */
  _getDataChannel() {
    return this.room?.dataChannels?.get?.(this.memberId) ?? null;
  }
}

/**
 * Return whether a raw room message belongs to this file-transfer protocol.
 * @param {unknown} data
 * @returns {Promise<boolean>}
 */
async function isFileTransferPayload(data) {
  if (typeof data === 'string') return isFileMetaMessage(data);
  const arrayBuffer = await toArrayBuffer(data);
  if (!arrayBuffer) return false;
  return isFileChunkPacket(arrayBuffer);
}

/**
 * Return whether a string payload is FILE_META JSON.
 * @param {string} data
 * @returns {boolean}
 */
function isFileMetaMessage(data) {
  try {
    return JSON.parse(data)?.type === FILE_META_TYPE;
  } catch {
    return false;
  }
}

/**
 * Convert binary-like DataChannel payloads into ArrayBuffer.
 * @param {unknown} data
 * @returns {Promise<ArrayBuffer|null>}
 */
async function toArrayBuffer(data) {
  if (data instanceof ArrayBuffer) return data;
  if (data instanceof Blob) return data.arrayBuffer();
  if (ArrayBuffer.isView(data)) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  return null;
}

/**
 * Return whether an ArrayBuffer contains a FILE_CHUNK packet.
 * @param {ArrayBuffer} arrayBuffer
 * @returns {boolean}
 */
function isFileChunkPacket(arrayBuffer) {
  try {
    if (arrayBuffer.byteLength < 4) return false;
    const metaLength = new DataView(arrayBuffer).getUint32(0, true);
    const metaEnd = 4 + metaLength;
    if (metaLength <= 0 || arrayBuffer.byteLength < metaEnd) return false;

    const metaJson = new TextDecoder().decode(
      new Uint8Array(arrayBuffer, 4, metaLength),
    );
    return JSON.parse(metaJson)?.type === FILE_CHUNK_TYPE;
  } catch {
    return false;
  }
}
