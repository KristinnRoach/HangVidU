import { describe, expect, it } from 'vitest';
import { FileTransferController } from './file-transfer-controller.js';

class FakeTransport {
  constructor() {
    this.peer = null;
    this.callback = null;
    this.cleaned = false;
  }

  connect(peer) {
    this.peer = peer;
  }

  send(data) {
    this.peer?.callback?.(data);
  }

  onMessage(callback) {
    this.callback = callback;
  }

  isReady() {
    return !this.cleaned && !!this.peer;
  }

  cleanup() {
    this.cleaned = true;
    this.callback = null;
  }
}

describe('FileTransferController transport injection', () => {
  it('sends and receives files through an injected transport', async () => {
    const senderTransport = new FakeTransport();
    const receiverTransport = new FakeTransport();
    senderTransport.connect(receiverTransport);
    receiverTransport.connect(senderTransport);

    const sender = new FileTransferController({ transport: senderTransport });
    const receiver = new FileTransferController({
      transport: receiverTransport,
    });

    const received = new Promise((resolve) => {
      receiver.onFileReceived = resolve;
    });

    const file = new File(['hello over transport'], 'hello.txt', {
      type: 'text/plain',
    });

    await sender.sendFile(file);

    const result = await received;
    expect(result.name).toBe('hello.txt');
    expect(result.mimeType).toBe('text/plain');
    expect(await result.file.text()).toBe('hello over transport');

    sender.cleanup();
    receiver.cleanup();
    expect(senderTransport.cleaned).toBe(true);
    expect(receiverTransport.cleaned).toBe(true);
  });

  it('rejects transports that do not implement the required contract', () => {
    expect(() => new FileTransferController({ transport: {} })).toThrow(
      'transport missing send()',
    );
  });
});
