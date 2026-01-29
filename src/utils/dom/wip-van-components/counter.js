// Minimal POC: Counter component
import createComponent from '../component.js';

export function createCounter(parent) {
  const counter = createComponent({
    initialProps: {
      count: 0,
      label: 'Click me',
    },

    template: `
      <div style="padding: 20px; text-align: center;">
        <h2>Counter POC</h2>
        <button onclick="increment" style="padding: 10px 20px; font-size: 18px;">
          [[label]]: [[count]]
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
