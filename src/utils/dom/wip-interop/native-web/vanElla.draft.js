import createComponent from '../../component.js';

const toAttrName = (prop) => prop.replace(/([A-Z])/g, '-$1').toLowerCase();
const toPropName = (attr) =>
  attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const isPrimitive = (v) =>
  v == null || ['string', 'number', 'boolean'].includes(typeof v);

export function defineComponent(
  tagName,
  {
    initialProps = {},
    template,
    handlers = {},
    shadow = 'open', // 'open' | 'closed' | false
    reflect = true, // reflect primitive props <-> attributes
    preserveInputState = true,
    className = '',
    containerTag = 'div',
    onMount,
    onCleanup,
    emitEvents = true,
    batchRenders = true,
  } = {}
) {
  if (customElements.get(tagName)) return customElements.get(tagName);

  class VanillaElement extends HTMLElement {
    static get observedAttributes() {
      if (!reflect) return [];
      return Object.keys(initialProps)
        .filter((k) => isPrimitive(initialProps[k]))
        .map(toAttrName);
    }

    constructor() {
      super();
      this._shadow = shadow ? this.attachShadow({ mode: shadow }) : null;
      this._comp = null;
      this._propMap = Object.create(null);

      // Property proxies
      for (const key of Object.keys(initialProps)) {
        Object.defineProperty(this, key, {
          get: () => (this._comp ? this._comp[key] : this._propMap[key]),
          set: (v) => {
            if (this._comp) {
              this._comp[key] = v;
            } else {
              this._propMap[key] = v;
            }
            if (reflect && isPrimitive(v)) {
              const name = toAttrName(key);
              if (typeof v === 'boolean') {
                if (v) this.setAttribute(name, '');
                else this.removeAttribute(name);
              } else {
                this.setAttribute(name, String(v));
              }
            }
          },
        });
      }
    }

    connectedCallback() {
      if (this._comp) return;

      // Seed props: initialProps + attribute values + pre-set properties
      const seed = { ...initialProps };

      if (reflect) {
        for (const key of Object.keys(initialProps)) {
          const attrName = toAttrName(key);
          if (this.hasAttribute(attrName)) {
            seed[key] = this._parseAttrValue(
              initialProps[key],
              this.getAttribute(attrName)
            );
          }
        }
      }

      Object.assign(seed, this._propMap);

      const parent = this._shadow ?? this;

      // Bind handlers to the component element that will be created
      const boundHandlers = {};
      for (const [key, fn] of Object.entries(handlers)) {
        boundHandlers[key] = (...args) => {
          // Call handler with component as 'this'
          return fn.call(this._comp, ...args);
        };
      }

      this._comp = createComponent({
        initialProps: seed,
        template,
        handlers: boundHandlers,
        parent,
        containerTag,
        className,
        onMount: (el) => {
          // Re-emit internal events on host for easy interop and reflect changes
          // Note: el is the component element, same as this._comp
          el.onAnyPropUpdated(({ props, changedKeys }) => {
            if (emitEvents) {
              this.dispatchEvent(
                new CustomEvent('props-updated', {
                  detail: { props, changedKeys },
                  bubbles: false,
                  composed: true,
                })
              );
            }
            if (reflect) {
              for (const k of changedKeys) {
                const v = props[k];
                if (isPrimitive(v)) {
                  const name = toAttrName(k);
                  if (typeof v === 'boolean') {
                    if (v) this.setAttribute(name, '');
                    else this.removeAttribute(name);
                  } else {
                    this.setAttribute(name, String(v));
                  }
                }
              }
            }
          });
          el.onRender((props) => {
            if (emitEvents) {
              this.dispatchEvent(
                new CustomEvent('render', {
                  detail: { props },
                  bubbles: false,
                  composed: true,
                })
              );
            }
          });
          onMount?.(el);
        },
        onCleanup,
        autoAppend: true,
        preserveInputState,
        emitEvents,
        batchRenders,
      });
    }

    attributeChangedCallback(name, _oldValue, newValue) {
      if (!this._comp) return;
      const prop = toPropName(name);
      const baseline = initialProps[prop];
      if (baseline === undefined) return;
      const parsed = this._parseAttrValue(baseline, newValue);
      this._comp[prop] = parsed;
    }

    disconnectedCallback() {
      this._comp?.dispose();
      this._comp = null;
    }

    _parseAttrValue(baseline, raw) {
      if (typeof baseline === 'boolean') return raw !== null;
      if (typeof baseline === 'number') return Number(raw);
      return raw;
    }
  }

  customElements.define(tagName, VanillaElement);
  return VanillaElement;
}

export default defineComponent;
