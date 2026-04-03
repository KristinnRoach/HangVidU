// Test to verify event listeners don't accumulate on re-render
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import createComponent from '../component.js';

describe('Event Listener Memory - No Leaks', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should NOT accumulate listeners on re-render (listeners fire once per click)', () => {
    let clickCount = 0;
    const handleClick = vi.fn(() => clickCount++);

    const component = createComponent({
      initialProps: { count: 0 },
      template: `<button onclick="handleClick">Count: \${count}</button>`,
      handlers: {
        handleClick,
      },
      parent: container,
    });

    const getButton = () => component.querySelector('button');

    // Initial state
    getButton().click();
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(clickCount).toBe(1);

    // Re-render by updating prop
    component.count = 1;
    getButton().click();
    expect(handleClick).toHaveBeenCalledTimes(2); // Should be 2, not 3
    expect(clickCount).toBe(2);

    // Re-render again
    component.count = 2;
    getButton().click();
    expect(handleClick).toHaveBeenCalledTimes(3); // Should be 3, not 6
    expect(clickCount).toBe(3);

    // Re-render multiple times
    component.count = 3;
    component.count = 4;
    component.count = 5;
    getButton().click();
    expect(handleClick).toHaveBeenCalledTimes(4); // Should be 4, not 10+
    expect(clickCount).toBe(4);
  });

  it('should NOT fire handler multiple times if listener accumulated', () => {
    const mockHandler = vi.fn();

    const component = createComponent({
      initialProps: { text: 'Click me', unusedProp: 0 },
      template: `<button onclick="test">\${text}</button>`,
      handlers: {
        test: mockHandler,
      },
      parent: container,
    });

    // Trigger many re-renders
    for (let i = 0; i < 10; i++) {
      component.text = `Click ${i}`;
    }

    // Click once
    const button = component.querySelector('button');
    button.click();

    // Should fire exactly once, not 10+ times
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple buttons without listener accumulation', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const component = createComponent({
      initialProps: { count: 0 },
      template: `
        <button onclick="btn1">Button 1</button>
        <button onclick="btn2">Button 2: \${count}</button>
      `,
      handlers: {
        btn1: handler1,
        btn2: handler2,
      },
      parent: container,
    });

    const [btn1, btn2] = component.querySelectorAll('button');

    // Initial clicks
    btn1.click();
    btn2.click();
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    // Re-render
    component.count = 1;
    const [newBtn1, newBtn2] = component.querySelectorAll('button');

    newBtn1.click();
    newBtn2.click();
    expect(handler1).toHaveBeenCalledTimes(2); // Should be 2, not 3
    expect(handler2).toHaveBeenCalledTimes(2); // Should be 2, not 3
  });
});
