export class SelectMediaDevice extends HTMLElement {
  static observedAttributes = ['type'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.updateDevices();
    navigator.mediaDevices.addEventListener('devicechange', () =>
      this.updateDevices()
    );
  }

  disconnectedCallback() {
    navigator.mediaDevices.removeEventListener('devicechange', () =>
      this.updateDevices()
    );
  }

  attributeChangedCallback() {
    this.updateDevices();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        select {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }
        select:focus {
          outline: 2px solid #0066ff;
          outline-offset: 2px;
        }
      </style>
      <select></select>
    `;
  }

  async updateDevices() {
    const type = this.getAttribute('type') || 'videoinput';
    const devices = await navigator.mediaDevices.enumerateDevices();
    const filtered = devices.filter((d) => d.kind === type);
    const select = this.shadowRoot.querySelector('select');

    select.innerHTML = filtered
      .map(
        (d, i) =>
          `<option value="${d.deviceId}">${
            d.label || `${type} ${i + 1}`
          }</option>`
      )
      .join('');

    this.dispatchEvent(
      new CustomEvent('deviceschanged', {
        detail: { devices: filtered },
      })
    );
  }

  get value() {
    return this.shadowRoot.querySelector('select').value;
  }

  set value(val) {
    this.shadowRoot.querySelector('select').value = val;
  }
}

customElements.define('select-media-device', SelectMediaDevice);
