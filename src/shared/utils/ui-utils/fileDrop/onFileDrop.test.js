import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { onFileDrop } from './onFileDrop.js';

describe('onFileDrop', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('passes dropped files as an array', () => {
    const element = document.createElement('div');
    const onDrop = vi.fn();
    const image = file('photo.png', 'image/png');
    document.body.appendChild(element);

    onFileDrop(element, onDrop);
    const event = dropEvent({ files: [image] });

    element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(onDrop).toHaveBeenCalledWith([image]);
  });

  it('filters accepted files without reconstructing a FileList', () => {
    const element = document.createElement('div');
    const onDrop = vi.fn();
    const image = file('photo.jpg', '');
    const text = file('notes.txt', '');
    document.body.appendChild(element);

    onFileDrop(element, onDrop, { accept: 'image/*' });

    element.dispatchEvent(dropEvent({ files: [image, text] }));

    expect(onDrop).toHaveBeenCalledWith([image]);
  });

  it('sets copy dropEffect during file dragover', () => {
    const element = document.createElement('div');
    const dataTransfer = {
      dropEffect: 'none',
      files: [],
      items: [{ kind: 'file' }],
    };
    document.body.appendChild(element);

    onFileDrop(element, vi.fn());
    const event = dragEvent('dragover', { dataTransfer });

    element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(dataTransfer.dropEffect).toBe('copy');
  });

  it('does not prevent default for non-file drops', () => {
    const element = document.createElement('div');
    const onDrop = vi.fn();
    document.body.appendChild(element);

    onFileDrop(element, onDrop);
    const event = dropEvent({
      files: [],
      items: [{ kind: 'string', type: 'text/plain' }],
    });

    element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onDrop).not.toHaveBeenCalled();
  });

  it('keeps dragover while moving between children', () => {
    vi.useFakeTimers();
    const element = document.createElement('div');
    const child = document.createElement('button');
    element.appendChild(child);
    document.body.appendChild(element);

    onFileDrop(element, vi.fn());

    element.dispatchEvent(dragEvent('dragenter'));
    child.dispatchEvent(dragEvent('dragleave', { relatedTarget: element }));
    vi.runAllTimers();

    expect(element.hasAttribute('dragover')).toBe(true);

    element.dispatchEvent(dragEvent('dragleave'));
    expect(element.hasAttribute('dragover')).toBe(true);

    vi.runAllTimers();

    expect(element.hasAttribute('dragover')).toBe(false);
  });
});

function file(name, type) {
  return new File(['content'], name, { type });
}

function dragEvent(type, { dataTransfer, relatedTarget } = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    dataTransfer: {
      value: dataTransfer || {
        files: [],
        items: [{ kind: 'file' }],
      },
    },
    relatedTarget: { value: relatedTarget || null },
  });
  return event;
}

function dropEvent({ files, items }) {
  return dragEvent('drop', {
    dataTransfer: {
      files,
      items:
        items ||
        files.map(() => ({
          kind: 'file',
        })),
    },
  });
}
