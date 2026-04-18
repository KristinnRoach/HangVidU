import { afterEach, describe, expect, it, vi } from 'vitest';
import { keepVirtualKeyboardOpenOnTap } from './keepVirtualKeyboardOpenOnTap.js';

describe('keepVirtualKeyboardOpenOnTap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('handles touch pointerdown even when button is not 0', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const onTap = vi.fn();

    keepVirtualKeyboardOpenOnTap(button, onTap);

    const event = new Event('pointerdown', { bubbles: true, cancelable: true });
    Object.defineProperties(event, {
      button: { value: -1 },
      pointerType: { value: 'touch' },
    });

    button.dispatchEvent(event);

    expect(onTap).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('ignores non-primary mouse buttons', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const onTap = vi.fn();

    keepVirtualKeyboardOpenOnTap(button, onTap);

    const event = new Event('pointerdown', { bubbles: true, cancelable: true });
    Object.defineProperties(event, {
      button: { value: 2 },
      pointerType: { value: 'mouse' },
    });

    button.dispatchEvent(event);

    expect(onTap).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it('preserves keyboard and assistive-tech activation via click', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const onTap = vi.fn();

    keepVirtualKeyboardOpenOnTap(button, onTap);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'detail', { value: 0 });

    button.dispatchEvent(event);

    expect(onTap).toHaveBeenCalledTimes(1);
  });
});
