// Tests for pre-set property preservation and non-configurable property handling
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import defineComponent from '../wip-interop/native-web/vanElla.js';

describe('vanElla - pre-set and non-configurable properties', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('preserves a property set on the element before definition/upgrade', () => {
    const tag = 'x-pre-prop';

    // Create element before defining the component
    const el = document.createElement(tag);
    // Pre-set a property on the instance
    el.foo = 'prevalue';
    document.body.appendChild(el);

    // Define the custom element which should upgrade the existing node
    defineComponent(tag, {
      initialProps: { foo: '' },
      template: `<div>\${foo}</div>`,
    });

    // After upgrade, the rendered text should contain the pre-set value.
    // Content is rendered into the shadow root by default, so read that when
    // available.
    const contentRoot = el.shadowRoot ?? el;
    expect(contentRoot.textContent.trim()).toBe('prevalue');
  });

  it('does not throw when a non-configurable property exists and preserves its value', () => {
    const tag = 'x-nonconf';

    const el = document.createElement(tag);
    // Define a non-configurable own property
    Object.defineProperty(el, 'foo', {
      value: 'secret',
      configurable: false,
      writable: true,
      enumerable: true,
    });

    document.body.appendChild(el);

    // Defining the component should not throw when encountering the
    // non-configurable property. Our safe variant will skip proxying it.
    expect(() => {
      defineComponent(tag, {
        initialProps: { foo: '' },
        template: `<div>\${foo}</div>`,
      });
    }).not.toThrow();

    // The value should be preserved and rendered (may be in shadowRoot)
    const root = el.shadowRoot ?? el;
    expect(root.textContent.trim()).toBe('secret');
  });
});
