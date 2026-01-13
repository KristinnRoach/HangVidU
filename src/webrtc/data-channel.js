// src/webrtc/data-channel.js
import { initMessagesUI } from '../components/messages/messages-ui.js';
import { FileTransfer } from '../file-transfer.js';

/**
 * Setup data channel for text chat and file transfer.
 * For initiator: creates the channel.
 * For joiner: prepares to receive the channel from initiator.
 *
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {string} role - 'initiator' or 'joiner'
 * @param {Function} onMessagesUIReady - Callback invoked when messagesUI is initialized (for joiner's async setup)
 * @returns {{ dataChannel: RTCDataChannel, messagesUI: object }} Channel and UI handler
 */
export function setupDataChannel(pc, role, onMessagesUIReady = null) {
  let dataChannel;
  let messagesUI;
  let fileTransfer;

  if (role === 'initiator') {
    // Initiator creates the data channel
    dataChannel = pc.createDataChannel('chat');

    const sendMessage = (msg) => {
      if (dataChannel.readyState === 'open') {
        dataChannel.send(msg);
      }
    };

    messagesUI = initMessagesUI(sendMessage);
    fileTransfer = new FileTransfer(dataChannel);
    messagesUI.setFileTransfer(fileTransfer);

    dataChannel.onopen = () => {
      messagesUI.showMessagesToggle();
      messagesUI.appendChatMessage('💬 Chat connected');
    };

    dataChannel.onmessage = (event) => {
      // Check if it's a file transfer message
      if (typeof event.data === 'string') {
        const msg = JSON.parse(event.data);
        if (msg.type === 'FILE_META' || msg.type === 'FILE_CHUNK') {
          fileTransfer.handleMessage(event.data);
          return;
        }
      } else {
        // Binary data - assume it's file chunk
        fileTransfer.handleMessage(event.data);
        return;
      }
      // Otherwise, handle as text message
      messagesUI.receiveMessage(event.data);
    };
  } else if (role === 'joiner') {
    // Joiner waits to receive the data channel from initiator
    pc.ondatachannel = (event) => {
      dataChannel = event.channel;
      messagesUI = initMessagesUI((msg) => dataChannel.send(msg));
      fileTransfer = new FileTransfer(dataChannel);
      messagesUI.setFileTransfer(fileTransfer);

      // Notify callback that messagesUI is ready
      if (onMessagesUIReady) {
        onMessagesUIReady(messagesUI);
      }

      dataChannel.onopen = () => {
        messagesUI.showMessagesToggle();
        messagesUI.appendChatMessage('💬 Chat connected');
      };
      dataChannel.onmessage = (event) => {
        // Check if it's a file transfer message
        if (typeof event.data === 'string') {
          const msg = JSON.parse(event.data);
          if (msg.type === 'FILE_META' || msg.type === 'FILE_CHUNK') {
            fileTransfer.handleMessage(event.data);
            return;
          }
        } else {
          // Binary data - assume it's file chunk
          fileTransfer.handleMessage(event.data);
          return;
        }
        // Otherwise, handle as text message
        messagesUI.receiveMessage(event.data);
      };
    };
  }

  return { dataChannel, messagesUI, fileTransfer };
}
