// Minimal implementation - just export String.raw as template helper

// Add to component-utils.js exports:
export const template = String.raw;

// That's it!

// ============================================
// USAGE IN counter.js
// ============================================

import createComponent from '../component.js';
import { template } from '../component-utils.js';

export function createCounter(parent) {
  const counter = createComponent({
    initialProps: {
      count: 0,
      label: 'Click me',
    },

    // ✅ No more escape characters needed!
    template: template`
      <div style="padding: 20px; text-align: center;">
        <h2>Counter POC</h2>
        <button onclick="increment" style="padding: 10px 20px; font-size: 18px;">
          ${label}: ${count}
        </button>
        <button onclick="reset" style="margin-left: 10px; padding: 10px;">
          Reset
        </button>
      </div>
    `,

    handlers: {
      increment: () => counter.count++,
      reset: () => counter.update({ count: 0 }),
    },

    parent,
    className: 'counter-component',
  });

  return counter;
}

// ============================================
// OR: Make it the default for template property
// ============================================

// In createComponent, modify the function signature:
const createComponent = ({
  initialProps,
  template, // can be string or tagged template
  // ...
}) => {
  // Auto-detect if template is a function (tagged template result)
  // Actually String.raw returns a string directly, so no change needed!

  const templateStr =
    typeof template === 'function' ? template`${template}` : template;

  // ... rest of code
};
