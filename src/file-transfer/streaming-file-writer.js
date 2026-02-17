import { devDebug } from '../utils/dev/dev-utils';

const OPFS_DIR_NAME = 'file-transfers';
const PROBE_FILE_NAME = '__quota_probe__';
// Probe at the streaming threshold — confirms OPFS is usable for large files.
// Actual transfers may exceed this; write failures are handled by fallback paths.
const PROBE_SIZE = 200 * 1024 * 1024; // 200MB (would not work in most "incognito" modes)

/**
 * StreamingFileWriter — writes received file chunks to OPFS (Origin Private File System)
 * so they never accumulate in RAM. After all chunks are written, returns a disk-backed File.
 */
export class StreamingFileWriter {
  /** @type {Promise<boolean>|null} */
  static _probePromise = null;
  /** @type {boolean|null} null = not yet probed */
  static _opfsAvailable = null;

  /**
   * Feature-detect OPFS + FileSystemWritableFileStream support.
   * @returns {boolean}
   */
  static isSupported() {
    try {
      return (
        typeof navigator !== 'undefined' &&
        typeof navigator.storage?.getDirectory === 'function'
      );
    } catch {
      return false;
    }
  }

  /**
   * Probe whether OPFS is usable and cache the result.
   *
   * Writes a probe file to confirm the origin can actually use OPFS
   * (fails in incognito/restricted browsers). Call this early (e.g. when
   * FileTransfer is created) so the result is ready by the time FILE_META
   * arrives — keeping the streaming decision synchronous and avoiding
   * race conditions with incoming chunks.
   *
   * @returns {Promise<boolean>}
   */
  static probeOPFS() {
    if (StreamingFileWriter._probePromise)
      return StreamingFileWriter._probePromise;

    if (!StreamingFileWriter.isSupported()) {
      StreamingFileWriter._opfsAvailable = false;
      return Promise.resolve(false);
    }

    StreamingFileWriter._probePromise = StreamingFileWriter._doProbe().then(
      (ok) => {
        StreamingFileWriter._opfsAvailable = ok;
        return ok;
      },
    );
    return StreamingFileWriter._probePromise;
  }

  /**
   * Synchronous check: is OPFS usable? Returns null if probe hasn't completed.
   * @returns {boolean|null}
   */
  static isOPFSAvailable() {
    return StreamingFileWriter._opfsAvailable;
  }

  /** @private */
  static async _doProbe() {
    let dirHandle;
    try {
      const root = await navigator.storage.getDirectory();
      dirHandle = await root.getDirectoryHandle(OPFS_DIR_NAME, {
        create: true,
      });
      const fileHandle = await dirHandle.getFileHandle(PROBE_FILE_NAME, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.truncate(PROBE_SIZE);
      await writable.close();
      await dirHandle.removeEntry(PROBE_FILE_NAME);
      return true;
    } catch (err) {
      console.warn(
        `[OPFS] Probe write failed (${(PROBE_SIZE / 1024 / 1024).toFixed(0)} MB):`,
        err.name,
      );
      try {
        await dirHandle?.removeEntry(PROBE_FILE_NAME);
      } catch {
        // ignore
      }
      return false;
    }
  }

  /** Reset cached probe state (for testing and cleanup). */
  static resetProbeCache() {
    StreamingFileWriter._probePromise = null;
    StreamingFileWriter._opfsAvailable = null;
  }

  /**
   * @param {string} fileId  — unique transfer identifier
   * @param {string} fileName — original file name (used for the final File object)
   */
  constructor(fileId, fileName) {
    this.fileId = fileId;
    this.fileName = fileName;
    /** @type {FileSystemDirectoryHandle|null} */
    this._dirHandle = null;
    /** @type {FileSystemFileHandle|null} */
    this._fileHandle = null;
    /** @type {FileSystemWritableFileStream|null} */
    this._writable = null;
  }

  /**
   * Open (or create) a temp file inside the `file-transfers/` OPFS subdirectory
   * and obtain a writable stream.
   */
  async init() {
    const root = await navigator.storage.getDirectory();
    this._dirHandle = await root.getDirectoryHandle(OPFS_DIR_NAME, {
      create: true,
    });
    this._fileHandle = await this._dirHandle.getFileHandle(this.fileId, {
      create: true,
    });
    this._writable = await this._fileHandle.createWritable();
  }

  /**
   * Write a single chunk at the correct byte offset.
   * @param {ArrayBuffer} data
   * @param {number} offset — byte offset within the file
   */
  async writeChunk(data, offset, isOrdered) {
    if (!isOrdered) {
      await this._writable.seek(offset);
    }
    await this._writable.write(data);
  }

  /**
   * Close the writable stream and return a disk-backed File.
   * @returns {Promise<File>}
   */
  async finalize() {
    await this._writable.close();
    this._writable = null;

    const opfsFile = await this._fileHandle.getFile();

    devDebug(
      `[OPFS] Finalized file: ${this.fileName}. OPFS filename: ${opfsFile.type}, mime-type: ${opfsFile.type}, size: ${opfsFile.size} bytes`,
    );

    // Return the disk-backed File directly — do NOT wrap in new File()
    // as that reads the entire content into memory, defeating OPFS streaming.
    // Note: .name will be the fileId, not the original filename.
    return opfsFile;
  }

  /**
   * Abort the transfer — close the stream and remove the temp file.
   */
  async abort() {
    try {
      await this._writable?.close();
    } catch {
      // may already be closed
    }
    this._writable = null;
    try {
      await this._dirHandle?.removeEntry(this.fileId);
    } catch {
      // file may not exist
    }
  }

  /**
   * Remove ALL temp files from the OPFS `file-transfers/` directory.
   * Call on hangup / cleanup.
   */
  static async cleanup() {
    StreamingFileWriter.resetProbeCache();
    if (!StreamingFileWriter.isSupported()) return;
    try {
      const root = await navigator.storage.getDirectory();
      await root.removeEntry(OPFS_DIR_NAME, { recursive: true });
    } catch {
      // directory may not exist — that's fine
    }
  }
}
