// src/utils/dom/component.js
import {
  captureInputState,
  captureMediaState,
  html,
  restoreInputState,
  restoreMediaState,
} from './helpers.js';

// === MAIN VANILLA JS COMPONENT FUNCTION ===

/**
 * Creates a functional vanilla JS component with reactive props and templated rendering.
 * @param {Object} options
 * @param {Object} options.initialProps - Initial properties of the component.
 * @param {string} options.template - Template string with ${prop} placeholders.
 * @param {Object} [options.handlers] - Event handlers map { handlerName: function }.
 * @param {HTMLElement} [options.parent=null] - Parent element to auto-append component to.
 * @param {string} [options.containerTag='div'] - Tag name of the root element container.
 * @param {string} [options.className=''] - CSS class name(s) to apply to the container element.
 * @param {boolean} [options.autoAppend=true] - Whether to append to parent automatically.
 * @param {boolean} [options.preserveInputState=true] - Whether to preserve input/media state during re-renders.
 * @returns {HTMLElement} The root component element with reactive props and update API.
 */
const createComponent = ({
  initialProps,
  template,
  handlers = {},
  parent = null,
  containerTag = 'div',
  className = '',
  autoAppend = true,
  preserveInputState = true,
}) => {
  const element = document.createElement(containerTag); // container tag customizable
  if (className) element.className = className;

  let currentProps = { ...initialProps };

  // Track which props are actually used in the template
  const usedProps = new Set();
  const placeholderRegex = /\$\{([^}]+)\}/g;
  let match;
  while ((match = placeholderRegex.exec(template)) !== null) {
    const key = match[1].trim().split('.')[0]; // Get root prop (e.g., "user" from "user.name")
    usedProps.add(key);
  }

  // Global update listeners (any prop updated)
  const updateListeners = [];

  // Per-prop listeners map: { propName: [callback, ...] }
  const propListeners = {};

  const render = () => {
    // Capture state before render if needed
    let inputState = [];
    let mediaState = [];
    if (preserveInputState) {
      inputState = captureInputState(element);
      mediaState = captureMediaState(element);
    }

    // Render
    element.textContent = '';
    const content = html(template, currentProps);
    element.appendChild(content);

    // Attach event handlers
    Object.keys(handlers).forEach((handlerName) => {
      const elements = element.querySelectorAll(`[onclick="${handlerName}"]`);
      elements.forEach((el) => {
        el.removeAttribute('onclick'); // Remove the attribute
        el.addEventListener('click', handlers[handlerName]);
      });
    });

    // Restore state after render
    if (preserveInputState) {
      restoreInputState(element, inputState);
      restoreMediaState(element, mediaState);
    }

    // Notify listeners
    updateListeners.forEach((listener) => listener({ ...currentProps }));
  };

  // Define getters/setters with per-prop event notification
  for (const prop of Object.keys(initialProps)) {
    propListeners[prop] = [];

    Object.defineProperty(element, prop, {
      get() {
        return currentProps[prop];
      },
      set(value) {
        if (currentProps[prop] !== value) {
          currentProps[prop] = value;
          // Only re-render if this prop is actually used in the template
          if (usedProps.has(prop)) {
            render();
          }
          // Always notify per-prop listeners
          propListeners[prop].forEach((cb) => cb(value));
        }
      },
      configurable: true,
      enumerable: true,
    });
  }

  element.update = (newProps) => {
    let changed = false;
    let shouldRender = false;

    for (const key in newProps) {
      if (newProps[key] !== currentProps[key]) {
        currentProps[key] = newProps[key];
        // Check if this prop is used in template
        if (usedProps.has(key)) {
          shouldRender = true;
        }
        // Notify per-prop listeners on batch update
        if (propListeners[key]) {
          propListeners[key].forEach((cb) => cb(newProps[key]));
        }
        changed = true;
      }
    }

    // Only re-render if a prop used in the template changed
    if (changed && shouldRender) {
      render(); // render() already calls updateListeners, no need to duplicate
    }
  };

  /**
   * Registers a callback to run on any prop update.
   * @param {function} listener - Callback receiving current props object.
   */
  element.onUpdate = (listener) => {
    if (typeof listener === 'function') {
      updateListeners.push(listener);
    }
  };

  /**
   * Registers a callback to run when a specific prop changes.
   * @param {string} prop - Property name to listen for.
   * @param {function} listener - Callback receiving the new prop value.
   */
  element.onPropUpdate = (prop, listener) => {
    if (typeof listener === 'function' && propListeners[prop]) {
      propListeners[prop].push(listener);
    }
  };

  /**
   * Cleanup method to remove all listeners and detach from parent.
   * Call this when component is no longer needed to prevent memory leaks.
   */
  element.dispose = () => {
    updateListeners.length = 0;
    for (const prop in propListeners) {
      propListeners[prop].length = 0;
    }
    element.remove();
  };

  render();

  if (autoAppend && parent && !parent.contains(element)) {
    parent.appendChild(element);
  }

  return element;
};

export default createComponent;

/**
 * Usage example:
 *
 * import createComponent from './src/utils/createComponent.js';
 *
 * const userCard = createComponent({
 *   initialProps: { name: 'Ada', email: 'ada@example.com' },
 *   template: `
 *     <div class="user-card">
 *       <h2>${name}</h2>
 *       <p>${email}</p>
 *     </div>
 *   `,
 *   parent: document.body,
 *   containerTag: 'section',  // optional, default is 'div'
 *   class: 'my-component',    // optional, adds CSS class to container
 *   autoAppend: true,         // default is true
 * });
 *
 * // Listen for any prop updates
 * userCard.onUpdate((props) => {
 *   console.log('UserCard updated:', props);
 * });
 *
 * // Listen specifically for name changes
 * userCard.onPropUpdate('name', (newName) => {
 *   console.log('Name changed:', newName);
 * });
 *
 * // Getters
 * console.log(userCard.name);  // "Ada"
 *
 * // Update individual prop (triggers re-render and listeners)
 * userCard.name = 'Grace Hopper';
 *
 * // Batch update multiple props
 * userCard.update({ name: 'Alan Turing', email: 'alan@example.com' });
 *
 * // Clean up when done
 * userCard.dispose();
 *
 * // If autoAppend was false:
 * // document.body.appendChild(userCard);
 */
