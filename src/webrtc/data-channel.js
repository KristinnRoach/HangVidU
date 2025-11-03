// src/webrtc/data-channel.js
import { initMessagesUI } from '../components/messages/messages-ui.js';

/**
 * Setup data channel for text chat and file transfer.
 * For initiator: creates the channel.
 * For joiner: prepares to receive the channel from initiator.
 *
 * @param {RTCPeerConnection} pc - The peer connection
 * @param {string} role - 'initiator' or 'joiner'
 * @returns {{ dataChannel: RTCDataChannel, messagesUI: object }} Channel and UI handler
 */
export function setupDataChannel(pc, role) {
  let dataChannel;
  let messagesUI;

  if (role === 'initiator') {
    // Initiator creates the data channel
    dataChannel = pc.createDataChannel('chat');

    const sendMessage = (msg) => {
      if (dataChannel.readyState === 'open') {
        dataChannel.send(msg);
      }
    };

    messagesUI = initMessagesUI(sendMessage);

    dataChannel.onopen = () => {
      messagesUI.showMessagesToggle();
      messagesUI.appendChatMessage('💬 Chat connected');
    };

    dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
  } else if (role === 'joiner') {
    // Joiner waits to receive the data channel from initiator
    pc.ondatachannel = (event) => {
      dataChannel = event.channel;
      messagesUI = initMessagesUI((msg) => dataChannel.send(msg));

      dataChannel.onopen = () => {
        messagesUI.showMessagesToggle();
        messagesUI.appendChatMessage('💬 Chat connected');
      };
      dataChannel.onmessage = (e) => messagesUI.receiveMessage(e.data);
    };
  }

  return { dataChannel, messagesUI };
}
