const OPFS_DIR_NAME = 'file-transfers';

/**
 * StreamingFileWriter — writes received file chunks to OPFS (Origin Private File System)
 * so they never accumulate in RAM. After all chunks are written, returns a disk-backed File.
 */
export class StreamingFileWriter {
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
    // Return the disk-backed File directly — do NOT wrap in new File()
    // as that reads the entire content into memory, defeating OPFS streaming.
    // Note: .name will be the fileId, not the original filename.
    return await this._fileHandle.getFile();
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
    if (!StreamingFileWriter.isSupported()) return;
    try {
      const root = await navigator.storage.getDirectory();
      await root.removeEntry(OPFS_DIR_NAME, { recursive: true });
    } catch {
      // directory may not exist — that's fine
    }
  }
}
