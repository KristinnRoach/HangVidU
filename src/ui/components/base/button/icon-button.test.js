import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import createIconButton from './icon-button.js';

describe('createIconButton', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders icon and fires click handler', () => {
    const onClick = vi.fn();
    const btn = createIconButton({
      title: 'Call',
      lucideIcon: 'phone',
      onClick,
      parent: container,
    });

    const button = btn.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.querySelector('svg')).toBeTruthy();

    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabledAttr', () => {
    const btn = createIconButton({
      title: 'Copy',
      lucideIcon: 'copy',
      disabledAttr: 'disabled',
      parent: container,
    });

    const button = btn.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);

    // Enable by updating prop and re-rendering
    btn.update({ disabledAttr: '' });
    const button2 = btn.querySelector('button');
    expect(button2.hasAttribute('disabled')).toBe(false);
  });
});
