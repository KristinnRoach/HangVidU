// src/utils/dom/component.js
import {
  captureInputState,
  captureMediaState,
  html,
  sanitize,
  restoreInputState,
  restoreMediaState,
} from './component-utils.js';
import { isDOMReady } from './dom-utils.js';

// === MAIN VANILLA JS COMPONENT FUNCTION ===

/**
 * Creates a functional vanilla JS component with reactive props and templated rendering.
 *
 * NOTE: Templates support simple property interpolation only ([[prop]], [[obj.nested]]).
 * Expressions ([[count > 0 ? 'yes' : 'no']]) are NOT supported - use onPropUpdated() instead.
 * See README.md for full template syntax documentation.
 *
 * @param {Object} options
 * @param {Object} options.initialProps - Initial properties of the component.
 * @param {string} options.template - Template string with [[prop]] placeholders.
 * @param {Object} [options.handlers] - Event handlers map { handlerName: function }.
 * @param {HTMLElement} [options.parent=null] - Parent element to auto-append component to.
 * @param {string} [options.containerTag='div'] - Tag name of the root element container.
 * @param {string} [options.className=''] - CSS class name(s) to apply to the container element.
 * @param {Function} [options.onMount] - Called once after initial render (after append if autoAppend).
 * @param {Function|Function[]} [options.onCleanup] - Function(s) to run on component disposal.
 * @param {Object<string, ((string) => string) | {resolve: (string) => string, onChange?: function}>} [options.templateFns]
 *   String-to-string functions callable from templates via [[prefix:arg]] syntax.
 *   Either a bare function (static) or { resolve, onChange } for reactive re-rendering.
 *   Prefix names should contain only letters, numbers, and underscores (e.g., "t", "fmt", "i18n_v2").
 * @param {boolean} [options.autoAppend=true] - Whether to append to parent automatically.
 * @param {boolean} [options.preserveInputState=true] - Whether to preserve input/media state during re-renders.
 * @returns {HTMLElement} The root component element with reactive props and update API.
 */
const createComponent = ({
  initialProps = {},
  template = '',
  handlers = {},
  parent = null,
  // TODO: autoWrap??,
  // !? Get rid of automatic wrapper if not requested to avoid unexpected extra containers + className applies to wrapper!!?
  // !? Deferred to when able to check ALL usage of createComponent (also blood pressure app?). After that, move to self contained repo I can publish and import anywhere.
  containerTag = 'div',
  className = '',
  onMount = null,
  onCleanup = null,
  templateFns = {},
  autoAppend = true,
  preserveInputState = true,
} = {}) => {
  if (!isDOMReady()) {
    console.error(
      'createComponent: DOM must be ready before creating components.',
    );
    return null;
  }

  const element = document.createElement(containerTag); // container tag customizable
  if (className) element.className = className;

  let currentProps = { ...initialProps };

  // Setup templateFns: extract resolve functions and subscribe to onChange triggers
  const templateFnResolvers = {};
  const templateFnCleanups = [];
  for (const [prefix, config] of Object.entries(templateFns)) {
    // Validate prefix contains only safe characters
    if (!/^[a-zA-Z0-9_]+$/.test(prefix)) {
      console.warn(
        `[createComponent]: templateFns prefix "${prefix}" contains special characters. ` +
          `Use only letters, numbers, and underscores (e.g., "t", "fmt", "i18n_v2").`,
      );
    }
    templateFnResolvers[prefix] =
      typeof config === 'function' ? config : config.resolve;
    if (config?.onChange) {
      const unsub = config.onChange(() => render());
      if (typeof unsub === 'function') {
        templateFnCleanups.push(unsub);
      } else {
        console.warn(
          `[createComponent]: templateFns.${prefix}.onChange did not return cleanup function`,
        );
      }
    }
  }

  // Track which props are actually used in the template
  const usedProps = new Set();
  const placeholderRegex = /\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g;
  let match;
  while ((match = placeholderRegex.exec(template)) !== null) {
    const key = (match[1] || match[2]).trim().split('.')[0]; // Get root prop (e.g., "user" from "user.name")
    usedProps.add(key);
  }

  // Global update listeners (any prop updated)
  const renderListeners = []; // onRender listeners (after render)
  const anyUpdateListeners = []; // onAnyPropUpdated listeners (after state change, render optional)

  // Per-prop listeners map: { propName: [callback, ...] }
  const singlePropListeners = {};

  const render = () => {
    // Capture state before render if needed
    let inputState = [];
    let mediaState = [];
    if (preserveInputState) {
      inputState = captureInputState(element);
      mediaState = captureMediaState(element);
    }

    // Pre-resolve templateFns (e.g. [[t:key]] → resolved string) before prop interpolation
    let resolvedTemplate = template;
    for (const [prefix, fn] of Object.entries(templateFnResolvers)) {
      resolvedTemplate = resolvedTemplate.replace(
        new RegExp(`\\[\\[${prefix}:([^\\]]+)\\]\\]`, 'g'),
        (_, key) => sanitize(String(fn(key.trim()) ?? '')),
      );
    }

    // Render
    element.textContent = '';
    const content = html(resolvedTemplate, currentProps);
    element.appendChild(content);

    // Attach event handlers for any on<event>="handlerName" attributes
    // Single DOM walk: for each on* attr, look up handler by name
    const allEls = element.querySelectorAll('*');
    allEls.forEach((el) => {
      for (const attr of Array.from(el.attributes)) {
        if (!attr.name.startsWith('on')) continue;
        if (!(attr.value in handlers)) continue;
        const fn = handlers[attr.value];
        const eventType = attr.name.slice(2); // "onclick" -> "click"
        el.removeAttribute(attr.name);
        if (typeof fn === 'function') {
          el.addEventListener(eventType, fn);
        }
      }
    });

    // Restore state after render
    if (preserveInputState) {
      restoreInputState(element, inputState);
      restoreMediaState(element, mediaState);
    }

    // Notify listeners // TODO: optimize
    renderListeners.forEach((listener) => listener({ ...currentProps }));
  };

  const notifyPropsUpdated = (changedKeys) => {
    if (!Array.isArray(changedKeys) || changedKeys.length === 0) return;
    const payload = { props: { ...currentProps }, changedKeys };
    anyUpdateListeners.forEach((listener) => listener(payload));
  };

  // Define getters/setters with per-prop event notification
  for (const prop of Object.keys(initialProps)) {
    singlePropListeners[prop] = [];

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
          singlePropListeners[prop].forEach((cb) => cb(value));
          // Notify global props-updated listeners for single prop change
          notifyPropsUpdated([prop]);
        }
      },
      configurable: true,
      enumerable: true,
    });
  }

  element.update = (newProps) => {
    let changed = false;
    let shouldRender = false;
    const changedKeys = [];

    for (const key in newProps) {
      if (newProps[key] !== currentProps[key]) {
        currentProps[key] = newProps[key];
        // Check if this prop is used in template
        if (usedProps.has(key)) {
          shouldRender = true;
        }
        // Notify per-prop listeners on batch update
        if (singlePropListeners[key]) {
          singlePropListeners[key].forEach((cb) => cb(newProps[key]));
        }
        changed = true;
        changedKeys.push(key);
      }
    }

    // Only re-render if a prop used in the template changed
    if (changed && shouldRender) {
      render(); // render() already calls updateListeners
    }

    // Notify global props-updated listeners once per batch
    if (changedKeys.length > 0) {
      notifyPropsUpdated(changedKeys);
    }
  };

  /**
   * Registers a callback to run on any prop update.
   * @param {function} listener - Callback receiving current props object.
   */
  element.onRender = (listener) => {
    if (typeof listener === 'function') {
      renderListeners.push(listener);
    }
  };

  /**
   * Registers a callback to run when one or more props are updated (via setter or update()).
   * Called even if no re-render occurs. Listener receives { props, changedKeys }.
   * @param {function} listener
   */
  element.onAnyPropUpdated = (listener) => {
    if (typeof listener === 'function') {
      anyUpdateListeners.push(listener);
    }
  };

  /**
   * Registers a callback to run when a specific prop changes.
   * @param {string} prop - Property name to listen for.
   * @param {function} listener - Callback receiving the new prop value.
   */
  element.onPropUpdated = (prop, listener) => {
    if (typeof listener === 'function' && singlePropListeners[prop]) {
      singlePropListeners[prop].push(listener);
    }
  };

  /**
   * Cleanup method to remove all listeners and detach from parent.
   * Call this when component is no longer needed to prevent memory leaks.
   */
  element.dispose = () => {
    // Run custom cleanup functions if provided
    if (onCleanup) {
      if (Array.isArray(onCleanup)) {
        onCleanup.forEach((fn) => {
          if (typeof fn === 'function') fn();
        });
      } else if (typeof onCleanup === 'function') {
        onCleanup();
      }
    }

    templateFnCleanups.forEach((unsub) => {
      if (typeof unsub === 'function') unsub();
    });
    renderListeners.length = 0;
    anyUpdateListeners.length = 0;
    for (const prop in singlePropListeners) {
      singlePropListeners[prop].length = 0;
    }
    element.remove();
  };

  render();

  if (autoAppend && parent && !parent.contains(element)) {
    parent.appendChild(element);
  }

  // Call onMount after initial render and (if enabled) append
  if (typeof onMount === 'function') {
    try {
      onMount(element);
      // setTimeout(() => onMount(element), 0); // ! Testing setTimeout to avoid blocking
    } catch (e) {
      console.warn(
        '[createComponent]: Error in onMount handler of component',
        e,
      );
      /* no-op */
    }
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
 *       <h2>[[name]]</h2>
 *       <p>[[email]]</p>
 *     </div>
 *   `,
 *   parent: document.body,
 *   containerTag: 'section',  // optional, default is 'div'
 *   class: 'my-component',    // optional, adds CSS class to container
 *   autoAppend: true,         // default is true
 * });
 *
 * // Listen for any prop updates (after render)
 * userCard.onRender((props) => {
 *   console.log('UserCard updated:', props);
 * });
 *
 * // Listen for any prop changes (render optional)
 * userCard.onAnyPropUpdated(({ changedKeys }) => {
 *   console.log('Props changed:', changedKeys);
 * });
 *
 * // Listen specifically for name changes
 * userCard.onPropUpdated('name', (newName) => {
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
