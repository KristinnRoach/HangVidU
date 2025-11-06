# Lit vs Vanilla for Web Component Wrappers

## TL;DR: **Stick with vanilla (vanElla)**

**Why:** You already have 90% of what Lit provides, and Lit would either duplicate or replace your existing system.

---

## Comparison

### Your Current Stack (vanElla + createComponent)

```javascript
// ~100 lines of vanilla code (vanElla.draft.js)
// Zero dependencies
// Full control

defineComponent('my-counter', {
  initialProps: { count: 0 },
  template: `<button onclick="inc">\${count}</button>`,
  handlers: {
    inc: function () {
      this.count++;
    },
  },
  reflect: true,
  shadow: 'open',
});
```

**What you get:**

- ✅ Property/attribute reflection
- ✅ Shadow DOM
- ✅ Reactive updates
- ✅ Event emission
- ✅ Input state preservation (your killer feature!)
- ✅ Works with your existing `createComponent` system
- ✅ ~100 lines you fully control

---

### Lit Approach

```javascript
// npm install lit (~5KB)
// Different mental model
// New template syntax

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class MyCounter extends LitElement {
  @property({ type: Number, reflect: true })
  count = 0;

  static styles = css`...`;

  render() {
    return html` <button @click=${() => this.count++}>${this.count}</button> `;
  }
}

customElements.define('my-counter', MyCounter);
```

**What you get:**

- ✅ Property/attribute reflection (automatic)
- ✅ Shadow DOM (automatic)
- ✅ Reactive updates (efficient)
- ✅ Battle-tested
- ✅ Great TypeScript support
- ❌ **Can't use your `createComponent` system**
- ❌ **No input state preservation** (standard Web Component issue)
- ❌ Different template syntax (`html\`...\``vs your`\${prop}`)
- ❌ New dependency (5KB + learning curve)

---

## Key Decision Points

### 1. **Would Lit replace or wrap?**

**Option A: Lit replaces createComponent**

```javascript
// Throw away all your work
// Lose input preservation
// Learn new system
// ❌ Bad idea
```

**Option B: Lit wraps createComponent**

```javascript
class MyComp extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this._vanilla = createComponent({...});
  }
  render() {
    return html`<div></div>`; // Just a container
  }
}
// 🤔 What's the point? You're just adding Lit overhead
```

### 2. **What does Lit give you that vanElla doesn't?**

| Feature            | vanElla                | Lit                     |
| ------------------ | ---------------------- | ----------------------- |
| Prop reflection    | ✅ Manual but works    | ✅ Automatic            |
| Shadow DOM         | ✅ Works               | ✅ Works                |
| Reactive props     | ✅ Via createComponent | ✅ Built-in             |
| Input preservation | ✅ **Your USP**        | ❌ No                   |
| Template syntax    | Your custom `\${prop}` | Lit's `html\`${prop}\`` |
| Bundle size        | ~0KB (vanilla)         | ~5KB                    |
| Learning curve     | Minimal                | Medium                  |
| Control            | 100%                   | ~60%                    |

### 3. **The real question: What problem does Lit solve for you?**

**Problems Lit solves:**

- ✅ Boilerplate for Web Components (you already solved this with vanElla)
- ✅ Prop/attribute sync (you already have this)
- ✅ Efficient re-rendering (you already have this via smart prop tracking)

**Problems Lit creates:**

- ❌ Can't reuse your `createComponent` system easily
- ❌ Lose input state preservation
- ❌ Different template syntax (migration cost)
- ❌ Dependency to maintain

---

## Practical Example: Current vs Lit

### Your Current System (65 lines total)

```javascript
// counter.js (25 lines)
export function createCounter(parent) {
  const counter = createComponent({
    initialProps: { count: 0, label: 'Click me' },
    template: `<button onclick="increment">\${label}: \${count}</button>`,
    handlers: { increment: () => counter.count++ },
    parent,
  });
  return counter;
}

// Web Component wrapper (40 lines with vanElla)
import { defineComponent } from './vanElla.draft.js';
import { createCounter } from './counter.js';

defineComponent('v-counter', {
  initialProps: { count: 0, label: 'Click me' },
  template: `<button onclick="increment">\${label}: \${count}</button>`,
  handlers: {
    increment: function () {
      this.count++;
    },
  },
});

// Use anywhere
<v-counter count='5'></v-counter>;
```

### Lit Equivalent (50 lines, but loses createComponent)

```javascript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

class VCounter extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: String }) label = 'Click me';

  increment() {
    this.count++;
  }

  render() {
    return html`
      <button @click=${this.increment}>${this.label}: ${this.count}</button>
    `;
  }
}

customElements.define('v-counter', VCounter);

// Use anywhere
<v-counter count='5'></v-counter>;
```

**Analysis:**

- Lit version is cleaner (no wrapper needed)
- BUT you lose ability to use `createCounter` standalone
- Lit version has no input preservation
- Two separate code paths (Lit components + vanilla components)

---

## My Recommendation: **Stick with vanilla**

### Why vanilla wins for you:

1. **You already have 90% of Lit's value**

   - vanElla is ~100 lines and does everything you need
   - You maintain full control

2. **Lit doesn't solve your actual problems**

   - You're not writing tons of Web Components (yet)
   - You already have prop reflection
   - You already have reactivity

3. **Lit would fragment your codebase**

   - Some components with `createComponent`
   - Some with Lit
   - Confusion about which to use

4. **Your input preservation is unique**

   - Lit doesn't have this
   - It's your competitive advantage
   - Don't lose it!

5. **Minimal philosophy alignment**
   - You said: "minimal, unopinionated, don't want lock-in"
   - vanElla: 100 lines, zero deps, full control ✅
   - Lit: 5KB dep, opinionated patterns ❌

---

## When you SHOULD consider Lit:

- ✅ Building a design system with dozens of Web Components
- ✅ Need TypeScript decorators + strict typing
- ✅ Team already knows Lit
- ✅ Don't care about input preservation
- ✅ Want community/ecosystem support

## When to stick with vanilla (YOUR CASE):

- ✅ Small number of components
- ✅ Want full control
- ✅ Already have working system
- ✅ Input preservation matters
- ✅ Minimal bundle size matters
- ✅ Fluid development (don't want lock-in)

---

## Action Items

**Short term:** Test vanElla.draft.js

1. Make counter Web Component
2. Test in vanilla JS
3. Test in React (just use `<v-counter>`)
4. Verify prop reflection works

**If vanElla works:** You're done! 🎉

**If vanElla has issues:** Fix them (still faster than learning Lit)

**Only consider Lit if:** You need to build 20+ Web Components and hate maintaining vanElla

---

## Bottom Line

**Lit is great, but it's solving a problem you don't have.**

Your system is:

- ✅ Simpler
- ✅ More flexible
- ✅ Already working
- ✅ Has unique features (input preservation)
- ✅ Aligns with your philosophy

**Verdict: Test vanElla first. Only add Lit if you hit a wall.**
