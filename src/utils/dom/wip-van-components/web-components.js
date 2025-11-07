// Minimal Web Component test using vanElla
import { defineComponent } from '../wip-interop/native-web/vanElla.js';

// Define a simple counter Web Component
defineComponent('v-counter', {
  initialProps: {
    count: 0,
    label: 'Click me',
  },

  template: `
    <div style="padding: 20px; border: 2px solid #4CAF50; border-radius: 8px;">
      <h3>Web Component Counter</h3>
      <button onclick="increment" style="padding: 10px 20px; font-size: 16px;">
        \${label}: \${count}
      </button>
      <button onclick="reset" style="margin-left: 10px; padding: 10px;">
        Reset
      </button>
    </div>
  `,

  handlers: {
    increment: function () {
      this.count++;
    },
    reset: function () {
      this.count = 0;
    },
  },

  shadow: 'open',
  reflect: true,
});

// Define a form Web Component to test input preservation
defineComponent('v-form', {
  initialProps: {
    title: 'Test Form',
  },

  template: `
    <div style="padding: 20px; border: 2px solid #2196F3; border-radius: 8px; margin-top: 20px;">
      <h3>\${title}</h3>
      <input type="text" placeholder="Type here..." style="display: block; margin: 10px 0; padding: 8px;">
      <button onclick="changeTitle" style="padding: 8px 16px;">
        Change Title (test input preservation)
      </button>
    </div>
  `,

  handlers: {
    changeTitle: function () {
      this.title = this.title === 'Test Form' ? 'Updated Form' : 'Test Form';
    },
  },

  shadow: 'open',
  reflect: true,
  preserveInputState: true,
});

console.log('✅ Web Components defined: <v-counter> and <v-form>');
