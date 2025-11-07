// Proposal: Tagged template literal for easier syntax

/**
 * Tagged template function that preserves ${prop} placeholders as strings.
 * Usage: html`<div>${name}</div>` => "<div>${name}</div>"
 */
export function html(strings, ...values) {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    // Convert the value back to a placeholder string
    result += `\${${values[i]}}` + strings[i + 1];
  }
  return result;
}

// ALTERNATIVE: Even simpler - just use String.raw
export const template = String.raw;

// ============================================
// USAGE COMPARISON
// ============================================

// ❌ Current way (easy to forget escape):
const oldWay = `<div>\${count}</div>`;

// ✅ Proposed way with custom tag:
const newWay1 = html`<div>${'count'}</div>`; // Still awkward - need quotes

// ✅ Better: Just use String.raw (built-in):
const newWay2 = String.raw`<div>${count}</div>`; // Won't evaluate, preserves literal

// ============================================
// REAL EXAMPLE
// ============================================

// Old approach:
const templateOld = `
  <button>\${label}: \${count}</button>
`;

// New approach with String.raw:
const templateNew = String.raw`
  <button>${label}: ${count}</button>
`;

console.log(templateOld); // "<button>${label}: ${count}</button>"
console.log(templateNew); // "<button>${label}: ${count}</button>"

// Both produce the same string, but String.raw is cleaner to write!
