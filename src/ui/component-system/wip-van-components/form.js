// Minimal POC: Form with input preservation
import createComponent from '../component.js';

export function createForm(parent) {
  const form = createComponent({
    initialProps: {
      title: 'User Form',
      submitCount: 0,
    },

    template: `
      <div style="padding: 20px;">
        <h2>[[title]]</h2>
        <form>
          <input type="text" name="username" placeholder="Username" style="display: block; margin: 10px 0; padding: 8px;">
          <input type="email" name="email" placeholder="Email" style="display: block; margin: 10px 0; padding: 8px;">
          <textarea name="bio" placeholder="Bio" style="display: block; margin: 10px 0; padding: 8px; width: 200px; height: 60px;"></textarea>
          <button type="submit" style="padding: 10px 20px;">Submit</button>
        </form>
        <p>Submitted: [[submitCount]] times</p>
        <button onclick="changeTitle" style="margin-top: 10px; padding: 8px;">
          Change Title (triggers re-render)
        </button>
      </div>
    `,

    handlers: {
      changeTitle: () => {
        form.title = form.title === 'User Form' ? 'Updated Form' : 'User Form';
      },
    },

    onMount: (el) => {
      // Listen for form submission
      const formEl = el.querySelector('form');
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        form.submitCount++;
        console.log('Form submitted!', {
          username: formEl.username.value,
          email: formEl.email.value,
          bio: formEl.bio.value,
        });
      });
    },

    parent,
    className: 'form-component',
  });

  return form;
}
