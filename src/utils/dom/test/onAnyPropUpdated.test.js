// Minimal tests for onAnyPropUpdated
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import createComponent from '../component.js';

describe('createComponent - onAnyPropUpdated', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('fires with changedKeys on single set', () => {
    const c = createComponent({
      initialProps: { a: 1, b: 2 },
      // template uses only a; updating b should still notify
      template: `<div>\${a}</div>`,
      parent: container,
    });

    const payloads = [];
    c.onAnyPropUpdated((p) => payloads.push(p));

    c.b = 3;

    expect(payloads.length).toBe(1);
    expect(payloads[0].changedKeys).toEqual(['b']);
  });

  it('batches keys on update()', () => {
    const c = createComponent({
      initialProps: { a: 1, b: 2 },
      template: `<div>\${a}</div>`,
      parent: container,
    });

    let last;
    c.onAnyPropUpdated((p) => (last = p));

    c.update({ a: 9, b: 8 });

    expect(last).toBeTruthy();
    expect(last.changedKeys.sort()).toEqual(['a', 'b']);
  });
});
