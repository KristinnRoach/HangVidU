// icon-button.js
import { LitElement, html, css } from 'lit';
import faStyles from '@fortawesome/fontawesome-free/css/all.min.css?inline';

export class IconButton extends LitElement {
  static properties = {
    id: { type: String },
    title: { type: String },
    iconHtml: { type: String },
    className: { type: String },
  };

  static styles = css`
    button {
      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.75rem;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
    }

    button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    button:active {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .hidden {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      position: absolute;
      left: -9999px;
      top: -9999px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    // Inject FontAwesome styles into shadow root
    if (this.shadowRoot && faStyles) {
      const existingStyle = this.shadowRoot.querySelector('style[data-fa]');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.setAttribute('data-fa', 'true');
        style.textContent = faStyles;
        this.shadowRoot.prepend(style);
      }
    }
  }

  constructor() {
    super();
    this.id = '';
    this.title = '';
    this.iconHtml = '';
    this.className = '';
    this.onMount = null;
    this.onClick = null;
    this._mounted = false;
  }

  updated(changedProperties) {
    // Fire onMount only once, after initial render
    if (!this._mounted && this.onMount) {
      this._mounted = true;
      this.onMount(this);
    }
  }

  //   firstUpdated() {
  //     if (this.onMount) {
  //       this.onMount(this);
  //     }
  //   }

  render() {
    return html`
      <button
        id=${this.id}
        class=${this.className}
        title=${this.title}
        @click=${this._handleClick}
      >
        <span .innerHTML=${this.iconHtml}></span>
      </button>
    `;
  }

  _handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}

customElements.define('icon-button', IconButton);
