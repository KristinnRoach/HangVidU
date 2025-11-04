// Test for event handler binding in createComponent
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import createComponent from '../component.js';

describe('createComponent - Event Handler Binding', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should bind event handlers from handlers object', () => {
    const mockHandler = vi.fn();

    const component = createComponent({
      initialProps: { text: 'Click me' },
      template: `<button onclick="handleClick">\${text}</button>`,
      handlers: {
        handleClick: mockHandler,
      },
      parent: container,
    });

    const button = component.querySelector('button');
    expect(button).toBeTruthy();

    // Click the button
    button.click();
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should preserve event handlers across re-renders', () => {
    const mockHandler = vi.fn();

    const component = createComponent({
      initialProps: { count: 0 },
      template: `<button onclick="increment">Count: \${count}</button>`,
      handlers: {
        increment: mockHandler,
      },
      parent: container,
    });

    const button1 = component.querySelector('button');
    button1.click();
    expect(mockHandler).toHaveBeenCalledTimes(1);

    // Re-render by updating prop
    component.count = 1;

    const button2 = component.querySelector('button');
    button2.click();
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple handlers', () => {
    const mockLogin = vi.fn();
    const mockLogout = vi.fn();

    const component = createComponent({
      initialProps: { user: null },
      template: `
        <button onclick="handleLogin">Login</button>
        <button onclick="handleLogout">Logout</button>
      `,
      handlers: {
        handleLogin: mockLogin,
        handleLogout: mockLogout,
      },
      parent: container,
    });

    const buttons = component.querySelectorAll('button');
    buttons[0].click(); // Login
    buttons[1].click(); // Logout

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('should remove onclick attribute after binding', () => {
    const component = createComponent({
      initialProps: { text: 'Test' },
      template: `<button onclick="test">Test</button>`,
      handlers: {
        test: vi.fn(),
      },
      parent: container,
    });

    const button = component.querySelector('button');
    expect(button.hasAttribute('onclick')).toBe(false);
  });
});
