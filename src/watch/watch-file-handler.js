import { t } from '../i18n/index.js';
import { initIcons } from '../ui/icons.js';
import { isVideoMime } from '../utils/is-video-mime.js';
import {
  handleVideoSelection,
  createWatchRequest,
  acceptWatchRequest,
  cancelWatchRequest,
} from '../firebase/watch-sync.js';
import {
  registerVideoForServing,
  isSwServingSupported,
} from '../file-transfer/video-serving.js';
import { devDebug } from '../utils/dev/dev-utils.js';

/**
 * Creates a watch-file handler that coordinates watch-together flows
 * for video files sent/received during calls.
 *
 * @param {Object} opts
 * @param {Function} opts.notify - Show an ephemeral status message in chat: notify({ text })
 * @returns {Object} Handler API
 */
export function createWatchFileHandler({ notify }) {
  const sentFiles = new Map();

  // ---------------------------------------------------------------------------
  // PROMPTS
  // ---------------------------------------------------------------------------

  /**
   * Prompt user to choose action for received video file
   * @param {string} fileName
   * @returns {Promise<'download'|'watch'>}
   */
  function promptFileAction(fileName) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'file-action-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      const dialog = document.createElement('div');
      dialog.className = 'file-action-prompt';
      dialog.style.cssText = `
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `;

      dialog.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">📹</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">${t('message.video_received')}</h3>
          <p id="file-name-display" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="download-file-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              <i data-lucide="download" style="margin-right: 8px;"></i>${t('message.download')}
            </button>
            <button id="watch-together-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i data-lucide="play" style="margin-right: 8px;"></i>${t('message.watch_together')}
            </button>
          </div>
        </div>
      `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      const fileNameDisplay = dialog.querySelector('#file-name-display');
      fileNameDisplay.textContent = fileName;

      const downloadBtn = dialog.querySelector('#download-file-btn');
      const watchBtn = dialog.querySelector('#watch-together-btn');

      downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.background = 'var(--bg-hover, #333)';
      });
      downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.background = 'var(--bg-secondary, #2a2a2a)';
      });
      watchBtn.addEventListener('mouseenter', () => {
        watchBtn.style.opacity = '0.9';
      });
      watchBtn.addEventListener('mouseleave', () => {
        watchBtn.style.opacity = '1';
      });

      downloadBtn.addEventListener('click', () => {
        overlay.remove();
        resolve('download');
      });
      watchBtn.addEventListener('click', () => {
        overlay.remove();
        resolve('watch');
      });

      initIcons(dialog);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          resolve('download');
        }
      });
    });
  }

  /**
   * Prompt sender to join watch together when receiver requests
   * @param {string} fileName
   * @returns {Promise<boolean>}
   */
  function promptJoinWatchTogether(fileName) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'watch-request-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      const dialog = document.createElement('div');
      dialog.className = 'watch-request-prompt';
      dialog.style.cssText = `
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `;

      dialog.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">${t('message.watch_request.title')}</h3>
          <p id="watch-request-filename" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <p style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 13px;">
            ${t('message.watch_request.body')}
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="decline-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              ${t('call.decline')}
            </button>
            <button id="accept-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i data-lucide="play" style="margin-right: 8px;"></i>${t('shared.join')}
            </button>
          </div>
        </div>
      `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      const fileNameDisplay = dialog.querySelector('#watch-request-filename');
      fileNameDisplay.textContent = fileName;

      const declineBtn = dialog.querySelector('#decline-watch-btn');
      const acceptBtn = dialog.querySelector('#accept-watch-btn');

      declineBtn.addEventListener('mouseenter', () => {
        declineBtn.style.background = 'var(--bg-hover, #333)';
      });
      declineBtn.addEventListener('mouseleave', () => {
        declineBtn.style.background = 'var(--bg-secondary, #2a2a2a)';
      });
      acceptBtn.addEventListener('mouseenter', () => {
        acceptBtn.style.opacity = '0.9';
      });
      acceptBtn.addEventListener('mouseleave', () => {
        acceptBtn.style.opacity = '1';
      });

      declineBtn.addEventListener('click', () => {
        overlay.remove();
        resolve(false);
      });
      acceptBtn.addEventListener('click', () => {
        overlay.remove();
        resolve(true);
      });

      initIcons(dialog);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          resolve(false);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // WATCH FILE REQUEST (incoming from remote via CustomEvent)
  // ---------------------------------------------------------------------------

  async function onWatchFileRequest(e) {
    const { fileName } = e.detail;
    const file = sentFiles.get(fileName);

    if (!file) {
      notify({
        text: `❌ ${t('message.watch.file_unavailable', { name: fileName })}`,
      });
      await cancelWatchRequest();
      return;
    }

    notify({
      text: `🎬 ${t('message.watch.partner_wants', { name: fileName })}`,
    });

    const accepted = await promptJoinWatchTogether(fileName);

    if (accepted) {
      notify({ text: `✅ ${t('message.watch.joining')}` });
      const success = await acceptWatchRequest(file);
      if (!success) {
        notify({ text: `❌ ${t('message.watch.failed_load')}` });
      }
    } else {
      notify({ text: `❌ ${t('message.watch.declined')}` });
      await cancelWatchRequest();
    }
  }

  document.addEventListener('watch:file-request', onWatchFileRequest);

  // ---------------------------------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------------------------------

  /**
   * Handle a received file that may be a video. If it is, prompts the user
   * to download or watch together. Returns true if handled (video), false if not.
   */
  async function handleReceivedVideo({ file, name, mimeType, opfsId }) {
    if (!isVideoMime(mimeType, file)) return false;

    const action = await promptFileAction(name);

    if (action === 'watch') {
      notify({ text: `📹 ${t('message.received_video', { name })}` });
      notify({ text: `🎬 ${t('message.watch.requesting')}` });

      const effectiveMimeType = mimeType || file.type;
      let videoSource;
      if (opfsId && isSwServingSupported()) {
        try {
          videoSource = await registerVideoForServing(
            opfsId,
            effectiveMimeType,
          );
          devDebug('[WatchFileHandler] Serving video via SW at:', videoSource);
        } catch (err) {
          console.warn(
            '[WatchFileHandler] SW video registration failed, falling back to blob:',
            err,
          );
          videoSource = file;
        }
      } else {
        videoSource = file;
        devDebug('[WatchFileHandler] Serving video via in-memory blob URL');
        devDebug(
          'isSwServingSupported():',
          isSwServingSupported(),
          'opfsId:',
          opfsId,
        );
      }

      const success = await handleVideoSelection(
        videoSource,
        effectiveMimeType,
      );

      if (!success) {
        notify({ text: `❌ ${t('message.watch.failed_load')}` });
        return true;
      }

      const requestCreated = await createWatchRequest(name, file);
      if (requestCreated) {
        notify({ text: `⏳ ${t('message.watch.waiting')}` });
      } else {
        notify({ text: `❌ ${t('message.watch.request_failed')}` });
      }
    } else {
      // Download the video file
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      notify({ text: `📎 ${t('message.downloaded', { name })}` });
    }

    return true;
  }

  /**
   * Track a sent file — if it's a video, stores it for potential watch-together requests.
   */
  function trackSentVideoFile(file) {
    if (isVideoMime(file.type, file)) {
      sentFiles.set(file.name, file);
    }
  }

  function reset() {
    sentFiles.clear();
  }

  function cleanup() {
    reset();
    document.removeEventListener('watch:file-request', onWatchFileRequest);
  }

  return { handleReceivedVideo, trackSentVideoFile, reset, cleanup };
}
