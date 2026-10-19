import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { onFilePaste, acceptsFilePasteTarget } from './onFilePaste.js';

const cleanups = [];
afterEach(() => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
  document.body.innerHTML = '';
});

function paste(target, files = [], prevented = false) {
  const event = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { files } });
  if (prevented) event.preventDefault();
  target.dispatchEvent(event);
  return event;
}

describe('onFilePaste', () => {
  it('forwards image and non-image files', () => {
    const image = new File(['photo'], 'photo.png', { type: 'image/png' });
    const text = new File(['notes'], 'notes.txt', { type: 'text/plain' });
    const received = vi.fn();
    cleanups.push(onFilePaste(document, received, () => true));
    const event = paste(document.body, [image, text]);
    expect(event.defaultPrevented).toBe(true);
    expect(received).toHaveBeenCalledExactlyOnceWith([image, text]);
  });

  it('leaves text-only and already-handled paste alone', () => {
    const received = vi.fn();
    cleanups.push(onFilePaste(document, received, () => true));
    expect(paste(document.body).defaultPrevented).toBe(false);
    paste(
      document.body,
      [new File(['photo'], 'photo.png', { type: 'image/png' })],
      true,
    );
    expect(received).not.toHaveBeenCalled();
  });

  it('forwards files with unknown MIME types using an element listener', () => {
    const target = document.createElement('div');
    const file = new File(['bytes'], 'attachment');
    const received = vi.fn();
    cleanups.push(onFilePaste(target, received, () => true));
    expect(paste(target, [file]).defaultPrevented).toBe(true);
    expect(received).toHaveBeenCalledExactlyOnceWith([file]);
  });

  it('reads eligibility on each event and removes its listener', () => {
    const received = vi.fn();
    let enabled = false;
    const cleanup = onFilePaste(document, received, () => enabled);
    cleanups.push(cleanup);
    const files = [new File(['photo'], 'photo.png', { type: 'image/png' })];
    expect(paste(document.body, files).defaultPrevented).toBe(false);
    enabled = true;
    paste(document.body, files);
    cleanup();
    expect(paste(document.body, files).defaultPrevented).toBe(false);
    expect(received).toHaveBeenCalledOnce();
  });
});

describe('file paste target ownership', () => {
  it('accepts the composer, panel content and body, but not another editor', () => {
    const panel = document.createElement('div');
    const composer = document.createElement('textarea');
    const message = document.createElement('button');
    const search = document.createElement('input');
    const editor = document.createElement('div');
    editor.setAttribute('contenteditable', 'true');
    panel.append(composer, message, editor);
    document.body.append(panel, search);
    const received = vi.fn();
    cleanups.push(
      onFilePaste(document, received, (event) =>
        acceptsFilePasteTarget(event, panel, composer),
      ),
    );
    const files = [new File(['photo'], 'photo.png', { type: 'image/png' })];
    for (const target of [composer, message, document.body])
      expect(paste(target, files).defaultPrevented).toBe(true);
    for (const target of [search, editor])
      expect(paste(target, files).defaultPrevented).toBe(false);
    expect(received).toHaveBeenCalledTimes(3);
  });

  it('does not send while a dialog is open', () => {
    const composer = document.createElement('textarea');
    const dialog = document.createElement('dialog');
    dialog.setAttribute('open', '');
    document.body.append(composer, dialog);
    const received = vi.fn();
    cleanups.push(
      onFilePaste(document, received, (event) =>
        acceptsFilePasteTarget(event, document.body, composer),
      ),
    );
    const files = [new File(['photo'], 'photo.png', { type: 'image/png' })];
    expect(paste(composer, files).defaultPrevented).toBe(false);
    expect(received).not.toHaveBeenCalled();
  });
});
