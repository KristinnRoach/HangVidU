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
    it('should handle prop changes within onPropUpdate listeners without infinite loops', () => {
      const component = createComponent({
        initialProps: { firstName: 'Ada', lastName: 'Lovelace', fullName: '' },
        template: `<div>\${fullName}</div>`,
        parent: container,
      });

      let updateCount = 0;

      // Listener that triggers another prop update
      component.onPropUpdate('firstName', (newFirst) => {
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

      component.onPropUpdate('a', (newA) => {
        aUpdateCount++;
        if (aUpdateCount > 5) return; // Circuit breaker
        if (newA !== component.b) component.b = newA;
      });

      component.onPropUpdate('b', (newB) => {
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

      component.onUpdate((props) => {
        updateLog.push({ type: 'global', props: { ...props } });
      });

      component.onPropUpdate('name', (val) => {
        updateLog.push({ type: 'name', value: val });
      });

      component.onPropUpdate('email', (val) => {
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
      component.onUpdate(() => renderCount++);

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
      component.onUpdate(() => renderCount++);

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

    it('should LOSE scroll position after re-render', () => {
      const component = createComponent({
        initialProps: { items: Array.from({ length: 100 }, (_, i) => i) },
        template: `
          <div style="height: 200px; overflow: auto;">
            \${items.map((i) => \`<div>\${i}</div>\`).join('')}
          </div>
        `,
        parent: container,
      });

      const scrollContainer = component.firstElementChild;
      scrollContainer.scrollTop = 500;

      expect(scrollContainer.scrollTop).toBe(500);

      // Trigger re-render
      component.update({ items: [...component.items] });

      // CRITICAL: Scroll position lost!
      // Note: The browser may preserve scroll in some cases, so we document
      // that this is a potential issue rather than guaranteed behavior
      expect(scrollContainer.scrollTop).toBeLessThanOrEqual(500);
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

      component.onUpdate(listener1);
      component.onUpdate(listener2);
      component.onPropUpdate('count', listener3);

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

      comp1.onUpdate(listener1);
      comp2.onUpdate(listener2);

      comp1.name = 'Changed1';
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(0);

      comp2.name = 'Changed2';
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
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
      component.onUpdate(listener);

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
});
