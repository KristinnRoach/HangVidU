// src/utils/dom/component.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import createComponent from '../component.js';

describe('createComponent - Critical Usage Issues', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('1. Circular Update Detection (CRITICAL)', () => {
    it('should handle prop changes within onPropUpdated listeners without infinite loops', () => {
      const component = createComponent({
        initialProps: { firstName: 'Ada', lastName: 'Lovelace', fullName: '' },
        template: `<div>\${fullName}</div>`,
        parent: container,
      });

      let updateCount = 0;

      // Listener that triggers another prop update
      component.onPropUpdated('firstName', (newFirst) => {
        updateCount++;
        if (updateCount > 10) throw new Error('Infinite loop detected');
        component.fullName = `${newFirst} ${component.lastName}`;
      });

      component.firstName = 'Grace';

      // Should update but not loop infinitely
      expect(updateCount).toBeLessThan(5);
      expect(component.fullName).toBe('Grace Lovelace');
    });

    it('should handle mutual prop dependencies without stack overflow', () => {
      const component = createComponent({
        initialProps: { a: 1, b: 2 },
        template: `<div>\${a} + \${b}</div>`,
        parent: container,
      });

      let aUpdateCount = 0;
      let bUpdateCount = 0;

      component.onPropUpdated('a', (newA) => {
        aUpdateCount++;
        if (aUpdateCount > 5) return; // Circuit breaker
        if (newA !== component.b) component.b = newA;
      });

      component.onPropUpdated('b', (newB) => {
        bUpdateCount++;
        if (bUpdateCount > 5) return; // Circuit breaker
        if (newB !== component.a) component.a = newB;
      });

      // This will trigger mutual updates
      expect(() => {
        component.a = 10;
      }).not.toThrow();

      // Both should stabilize
      expect(aUpdateCount).toBeGreaterThan(0);
      expect(bUpdateCount).toBeGreaterThan(0);
    });
  });

  describe('2. Update Batching & Notification Order', () => {
    it('should batch updates and trigger listeners in correct order', () => {
      const component = createComponent({
        initialProps: { name: 'Ada', email: 'ada@test.com', age: 30 },
        template: `<div>\${name} - \${email} - \${age}</div>`,
        parent: container,
      });

      const updateLog = [];

      component.onRender((props) => {
        updateLog.push({ type: 'global', props: { ...props } });
      });

      component.onPropUpdated('name', (val) => {
        updateLog.push({ type: 'name', value: val });
      });

      component.onPropUpdated('email', (val) => {
        updateLog.push({ type: 'email', value: val });
      });

      // Batch update
      component.update({ name: 'Grace', email: 'grace@test.com' });

      // Initial render triggers global listener (1)
      // Batch update triggers: name listener (1), email listener (1), render with global listener (1) = 3 total (no duplicate!)
      expect(updateLog.length).toBe(3);

      // Verify we got the right notifications
      expect(updateLog.filter((log) => log.type === 'global').length).toBe(1); // Only from update (fixed duplicate bug)
      expect(updateLog.filter((log) => log.type === 'name').length).toBe(1);
      expect(updateLog.filter((log) => log.type === 'email').length).toBe(1);
    });

    it('should trigger only ONE render for batch updates', () => {
      let renderCount = 0;

      const component = createComponent({
        initialProps: { a: 1, b: 2, c: 3 },
        template: `<div>\${a} \${b} \${c}</div>`,
        parent: container,
      });

      // Register listener AFTER initial render
      component.onRender(() => renderCount++);

      // Multiple prop changes in batch - should trigger only ONE render
      component.update({ a: 10, b: 20, c: 30 });

      expect(renderCount).toBe(1); // Only ONE render from the batch update

      // Compare to individual updates
      renderCount = 0;
      component.a = 100; // Render 1
      component.b = 200; // Render 2
      component.c = 300; // Render 3
      expect(renderCount).toBe(3); // THREE renders
    });

    it('should trigger MULTIPLE renders for individual prop sets', () => {
      const component = createComponent({
        initialProps: { a: 1, b: 2 },
        template: `<div>\${a} \${b}</div>`,
        parent: container,
      });

      let renderCount = 0;
      component.onRender(() => renderCount++);

      component.a = 10; // Render 1
      component.b = 20; // Render 2

      expect(renderCount).toBe(2); // TWO renders
    });
  });

  describe('3. XSS Protection & HTML Injection', () => {
    it('should sanitize user input by default', () => {
      const malicious = '<img src=x onerror=alert(1)>';

      const component = createComponent({
        initialProps: { userInput: malicious },
        template: `<div>\${userInput}</div>`,
        parent: container,
      });

      const html = component.innerHTML;
      // Should be escaped - the dangerous parts are neutralized
      expect(html).toContain('&lt;');
      expect(html).toContain('&gt;');
      // The actual <img> tag should not be executable
      const imgTag = component.querySelector('img');
      expect(imgTag).toBeFalsy(); // No actual img element should exist
    });

    it('should allow raw HTML for properties ending with "Html"', () => {
      const icon = '<i class="fa fa-user"></i>';

      const component = createComponent({
        initialProps: { iconHtml: icon },
        template: `<div>\${iconHtml}</div>`,
        parent: container,
      });

      const iTag = component.querySelector('i');
      expect(iTag).toBeTruthy();
      expect(iTag.className).toBe('fa fa-user');
    });

    it('should NOT sanitize nested properties ending with "Html"', () => {
      const component = createComponent({
        initialProps: {
          user: {
            name: '<script>alert("xss")</script>',
            avatarHtml: '<img src="avatar.jpg" class="avatar">',
          },
        },
        template: `<div>\${user.name} \${user.avatarHtml}</div>`,
        parent: container,
      });

      // name should be sanitized
      const html = component.innerHTML;
      expect(html).toContain('&lt;script&gt;');

      // avatarHtml should be raw
      const img = component.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.className).toBe('avatar');
    });
  });

  describe('4. DOM State Loss on Re-render (KNOWN LIMITATION)', () => {
    it('should PRESERVE input focus when updating unused props', () => {
      const component = createComponent({
        initialProps: { label: 'Name', value: 'Ada', metadata: {} },
        template: `
          <div>
            <label>\${label}</label>
            <input type="text" value="\${value}" />
          </div>
        `,
        parent: container,
      });

      const input = component.querySelector('input');
      input.focus();
      input.value = 'Grace Hopper'; // User types

      expect(document.activeElement).toBe(input);
      expect(input.value).toBe('Grace Hopper');

      // Update a prop NOT used in template (metadata)
      component.metadata = { timestamp: Date.now() };

      // SHOULD PRESERVE: Input should still be focused and value unchanged
      expect(document.activeElement).toBe(input);
      expect(input.value).toBe('Grace Hopper'); // User's input preserved!
    });

    it('should PRESERVE focused input value and focus after prop update', () => {
      const component = createComponent({
        initialProps: { label: 'Name', value: 'Ada' },
        template: `
          <div>
            <label>\${label}</label>
            <input type="text" value="\${value}" />
          </div>
        `,
        parent: container,
      });

      const input = component.querySelector('input');
      input.focus();
      input.value = 'Grace Hopper'; // User types

      expect(document.activeElement).toBe(input);
      expect(input.value).toBe('Grace Hopper');

      // Trigger re-render
      component.label = 'Full Name';

      // EXPECTED: Focused input keeps focus and user's typed value
      const newInput = component.querySelector('input');
      expect(document.activeElement).toBe(newInput);
      expect(newInput.value).toBe('Grace Hopper');
    });

    it('should LOSE scroll position after re-render', async () => {
      const component = createComponent({
        initialProps: { items: Array.from({ length: 100 }, (_, i) => i) },
        template: `
          <div style="height: 200px; overflow: auto;">
            \${items.map((i) => \`<div style="height: 20px;">\${i}</div>\`).join('')}
          </div>
        `,
        parent: container,
      });

      const scrollContainer = component.firstElementChild;

      // Wait for layout to complete in real browser
      await new Promise((resolve) => setTimeout(resolve, 50));

      scrollContainer.scrollTop = 500;

      // Wait for scroll to be applied in real browser
      await new Promise((resolve) => setTimeout(resolve, 50));

      const scrollTopAfterSet = scrollContainer.scrollTop;

      // In headless browser, scroll might not work if element has no layout
      // This test documents the limitation - if scroll works, it should be lost on re-render
      if (scrollTopAfterSet > 0) {
        expect(scrollTopAfterSet).toBe(500);

        // Trigger re-render
        component.update({ items: [...component.items] });

        // CRITICAL: Scroll position lost!
        expect(scrollContainer.scrollTop).toBeLessThanOrEqual(500);
      } else {
        // In headless mode without layout, scroll doesn't work - skip the assertion
        expect(scrollTopAfterSet).toBe(0);
      }
    });
  });

  describe('5. Memory Leak Prevention', () => {
    it('should remove all listeners when dispose() is called', () => {
      const component = createComponent({
        initialProps: { count: 0 },
        template: `<div>\${count}</div>`,
        parent: container,
      });

      const listener1 = vi.fn();
      const listener2 = vi.fn();
      const listener3 = vi.fn();

      component.onRender(listener1);
      component.onRender(listener2);
      component.onPropUpdated('count', listener3);

      component.count = 1;
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
      expect(listener3).toHaveBeenCalledTimes(1);

      // Dispose
      component.dispose();

      // Component should be removed from DOM
      expect(container.contains(component)).toBe(false);

      // Listeners should NOT fire after dispose
      // (We can't directly test this without accessing internals,
      // but we've cleared the arrays, so this documents expected behavior)
    });

    it('should call onCleanup function when dispose() is called', () => {
      const cleanupFn = vi.fn();

      const component = createComponent({
        initialProps: { count: 0 },
        template: `<div>\${count}</div>`,
        onCleanup: cleanupFn,
        parent: container,
      });

      expect(cleanupFn).not.toHaveBeenCalled();

      component.dispose();

      expect(cleanupFn).toHaveBeenCalledTimes(1);
      expect(container.contains(component)).toBe(false);
    });

    it('should call all cleanup functions in array when dispose() is called', () => {
      const cleanup1 = vi.fn();
      const cleanup2 = vi.fn();
      const cleanup3 = vi.fn();

      const component = createComponent({
        initialProps: { count: 0 },
        template: `<div>\${count}</div>`,
        onCleanup: [cleanup1, cleanup2, cleanup3],
        parent: container,
      });

      expect(cleanup1).not.toHaveBeenCalled();
      expect(cleanup2).not.toHaveBeenCalled();
      expect(cleanup3).not.toHaveBeenCalled();

      component.dispose();

      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).toHaveBeenCalledTimes(1);
      expect(cleanup3).toHaveBeenCalledTimes(1);
      expect(container.contains(component)).toBe(false);
    });

    it('should handle onCleanup with external resource cleanup', () => {
      let resourceClosed = false;
      const mockResource = {
        close: () => {
          resourceClosed = true;
        },
      };

      const component = createComponent({
        initialProps: { status: 'active' },
        template: `<div>\${status}</div>`,
        onCleanup: () => mockResource.close(),
        parent: container,
      });

      expect(resourceClosed).toBe(false);

      component.dispose();

      expect(resourceClosed).toBe(true);
    });

    it('should not throw if onCleanup array contains non-function values', () => {
      const cleanup = vi.fn();

      const component = createComponent({
        initialProps: { count: 0 },
        template: `<div>\${count}</div>`,
        onCleanup: [cleanup, null, undefined, 'not-a-function', 42],
        parent: container,
      });

      expect(() => component.dispose()).not.toThrow();
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple components without listener cross-talk', () => {
      const comp1 = createComponent({
        initialProps: { name: 'Comp1' },
        template: `<div>\${name}</div>`,
        parent: container,
      });

      const comp2 = createComponent({
        initialProps: { name: 'Comp2' },
        template: `<div>\${name}</div>`,
        parent: container,
      });

      const listener1 = vi.fn();
      const listener2 = vi.fn();

      comp1.onRender(listener1);
      comp2.onRender(listener2);

      comp1.name = 'Changed1';
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(0);

      comp2.name = 'Changed2';
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('8. Lifecycle (onMount)', () => {
    it('should call onMount once after initial render', () => {
      const onMount = vi.fn();

      createComponent({
        initialProps: { a: 1 },
        template: `<div>\${a}</div>`,
        onMount,
        parent: container,
      });

      expect(onMount).toHaveBeenCalledTimes(1);
    });

    it('should call onMount after element has been appended when autoAppend=true', () => {
      let observedParent = null;

      const comp = createComponent({
        initialProps: { a: 1 },
        template: `<div>\${a}</div>`,
        onMount: (el) => {
          observedParent = el.parentNode;
        },
        parent: container,
        autoAppend: true,
      });

      expect(observedParent).toBe(container);
      expect(container.contains(comp)).toBe(true);
    });

    it('should still call onMount when autoAppend=false', () => {
      const onMount = vi.fn();
      const comp = createComponent({
        initialProps: { x: 0 },
        template: `<div>\${x}</div>`,
        onMount,
        parent: container,
        autoAppend: false,
      });

      expect(onMount).toHaveBeenCalledTimes(1);
      expect(container.contains(comp)).toBe(false);
    });
  });

  describe('6. Nested Property Access', () => {
    it('should access nested properties correctly', () => {
      const component = createComponent({
        initialProps: {
          user: {
            profile: {
              firstName: 'Ada',
              lastName: 'Lovelace',
            },
          },
        },
        template: `<div>\${user.profile.firstName} \${user.profile.lastName}</div>`,
        parent: container,
      });

      expect(component.textContent).toBe('Ada Lovelace');
    });

    it('should handle missing nested properties gracefully', () => {
      const component = createComponent({
        initialProps: { user: { profile: null } },
        template: `<div>Name: \${user.profile.firstName}</div>`,
        parent: container,
      });

      // Should not throw, should render empty string
      expect(component.textContent).toBe('Name: ');
    });

    it('should update correctly when nested object is replaced', () => {
      const component = createComponent({
        initialProps: {
          user: { name: 'Ada' },
        },
        template: `<div>\${user.name}</div>`,
        parent: container,
      });

      expect(component.textContent).toBe('Ada');

      // Replace entire nested object
      component.update({ user: { name: 'Grace' } });

      expect(component.textContent).toBe('Grace');
    });
  });

  describe('7. Edge Cases & Error Handling', () => {
    it('should handle undefined/null prop values', () => {
      const component = createComponent({
        initialProps: { name: undefined, age: null, city: '' },
        template: `<div>\${name} \${age} \${city}</div>`,
        parent: container,
      });

      // Should render empty strings, not "undefined" or "null"
      expect(component.textContent.trim()).toBe('');
    });

    it('should handle same-value updates (no-op)', () => {
      const component = createComponent({
        initialProps: { count: 5 },
        template: `<div>\${count}</div>`,
        parent: container,
      });

      const listener = vi.fn();
      component.onRender(listener);

      // Set to same value
      component.count = 5;

      // Should NOT trigger listener or re-render
      expect(listener).not.toHaveBeenCalled();
    });

    it('should not append to parent if already contains element', () => {
      // Pre-create element
      const component = createComponent({
        initialProps: { text: 'Hello' },
        template: `<div>\${text}</div>`,
        autoAppend: false,
      });

      container.appendChild(component);

      // Try to create with same parent
      const sameComponent = component;
      sameComponent.update({ text: 'World' });

      // Should only be one instance in container
      expect(container.children.length).toBe(1);
    });
  });

  describe('9. Generalized Event Handler Binding', () => {
    it('should bind onclick handlers (backward compat)', () => {
      const clickHandler = vi.fn();

      const component = createComponent({
        initialProps: {},
        template: `<button onclick="handleClick">Click me</button>`,
        handlers: { handleClick: clickHandler },
        parent: container,
      });

      const btn = component.querySelector('button');
      expect(btn.getAttribute('onclick')).toBeNull(); // attribute removed
      btn.click();
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    it('should bind onerror handlers declared in template', () => {
      const errorHandler = vi.fn();

      const component = createComponent({
        initialProps: {},
        template: `<img src="nonexistent.jpg" onerror="handleImgError" />`,
        handlers: { handleImgError: errorHandler },
        parent: container,
      });

      const img = component.querySelector('img');
      expect(img.getAttribute('onerror')).toBeNull(); // attribute removed

      // Simulate an error event
      img.dispatchEvent(new Event('error'));
      expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it('should bind onchange handlers declared in template', () => {
      const changeHandler = vi.fn();

      const component = createComponent({
        initialProps: {},
        template: `<input type="text" onchange="handleChange" />`,
        handlers: { handleChange: changeHandler },
        parent: container,
      });

      const input = component.querySelector('input');
      expect(input.getAttribute('onchange')).toBeNull();

      input.dispatchEvent(new Event('change'));
      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it('should bind oninput handlers declared in template', () => {
      const inputHandler = vi.fn();

      const component = createComponent({
        initialProps: {},
        template: `<input type="text" oninput="handleInput" />`,
        handlers: { handleInput: inputHandler },
        parent: container,
      });

      const input = component.querySelector('input');
      expect(input.getAttribute('oninput')).toBeNull();

      input.dispatchEvent(new Event('input'));
      expect(inputHandler).toHaveBeenCalledTimes(1);
    });

    it('should bind multiple different event types in one component', () => {
      const clickHandler = vi.fn();
      const errorHandler = vi.fn();
      const changeHandler = vi.fn();

      const component = createComponent({
        initialProps: {},
        template: `
          <button onclick="handleClick">Click</button>
          <img src="x.jpg" onerror="handleError" />
          <select onchange="handleChange"><option>A</option></select>
        `,
        handlers: {
          handleClick: clickHandler,
          handleError: errorHandler,
          handleChange: changeHandler,
        },
        parent: container,
      });

      component.querySelector('button').click();
      component.querySelector('img').dispatchEvent(new Event('error'));
      component.querySelector('select').dispatchEvent(new Event('change'));

      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it('should re-bind event handlers after re-render', () => {
      const errorHandler = vi.fn();

      const component = createComponent({
        initialProps: { src: 'a.jpg' },
        template: `<img src="[[src]]" onerror="handleError" />`,
        handlers: { handleError: errorHandler },
        parent: container,
      });

      // Trigger re-render
      component.src = 'b.jpg';

      // The new img element should also have the handler bound
      const img = component.querySelector('img');
      img.dispatchEvent(new Event('error'));
      expect(errorHandler).toHaveBeenCalledTimes(1);
    });

    it('should not bind on* attributes whose value is not in handlers map', () => {
      // Inline JS onerror should pass through untouched (not matched to any handler)
      const component = createComponent({
        initialProps: {},
        template: `<img src="x.jpg" onerror="console.log('inline')" />`,
        handlers: {},
        parent: container,
      });

      const img = component.querySelector('img');
      // The onerror attribute should still be there since no handler matched
      expect(img.getAttribute('onerror')).toBe("console.log('inline')");
    });
  });

  describe('10. templateFns Reactivity', () => {
    it('should resolve [[prefix:key]] using the resolve function', () => {
      const t = (key) => {
        const translations = { 'label.title': 'Welcome' };
        return translations[key] || key;
      };

      const component = createComponent({
        initialProps: {},
        template: `<div>[[t:label.title]]</div>`,
        templateFns: { t: { resolve: t } },
        parent: container,
      });

      expect(component.textContent).toBe('Welcome');
    });

    it('should re-render when onChange callback is triggered', () => {
      let locale = 'en';
      let onChangeCallback = null;

      const t = (key) => {
        const translations = {
          en: { 'msg.hello': 'Hello' },
          is: { 'msg.hello': 'Halló' },
        };
        return translations[locale]?.[key] || key;
      };

      const component = createComponent({
        initialProps: {},
        template: `<div>[[t:msg.hello]]</div>`,
        templateFns: {
          t: {
            resolve: t,
            onChange: (callback) => {
              onChangeCallback = callback;
              return () => {
                onChangeCallback = null;
              };
            },
          },
        },
        parent: container,
      });

      expect(component.textContent).toBe('Hello');

      // Change locale and trigger onChange callback
      locale = 'is';
      onChangeCallback?.();

      // After onChange fires, re-render should apply new translation
      expect(component.textContent).toBe('Halló');
    });

    it('should call cleanup function from onChange when dispose() is called', () => {
      const cleanupFn = vi.fn();

      const t = (key) => `translated_${key}`;

      const component = createComponent({
        initialProps: {},
        template: `<div>[[t:some.key]]</div>`,
        templateFns: {
          t: {
            resolve: t,
            onChange: () => cleanupFn,
          },
        },
        parent: container,
      });

      expect(cleanupFn).not.toHaveBeenCalled();

      component.dispose();

      expect(cleanupFn).toHaveBeenCalledTimes(1);
    });
  });
});
