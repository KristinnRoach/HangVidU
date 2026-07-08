import { describe, expect, it, vi } from 'vite-plus/test';
import { attachReactions } from './attachReactions.js';

describe('attachReactions', () => {
  it('toggles the default reaction on double click', () => {
    const element = document.createElement('div');
    const onChange = vi.fn();
    attachReactions(element, 'message-1', 'user-1', onChange);
    const tap = () =>
      element.dispatchEvent(
        new Event('ontouchstart' in window ? 'touchend' : 'click', {
          bubbles: true,
          cancelable: true,
        }),
      );

    tap();
    tap();
    expect(element.querySelector('.reaction-badge')?.textContent).toBe('❤️');
    expect(onChange).toHaveBeenLastCalledWith({
      messageId: 'message-1',
      userId: 'user-1',
      reactionKey: 'heart',
    });

    tap();
    tap();
    expect(element.querySelector('.message-reactions')?.hidden).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith({
      messageId: 'message-1',
      userId: 'user-1',
      reactionKey: null,
    });
  });
});
