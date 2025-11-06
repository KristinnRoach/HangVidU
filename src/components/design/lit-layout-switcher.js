// import { html, css, LitElement } from 'lit';

// class LayoutSwitcher extends LitElement {
//   static styles = css`
//     .base {
//       position: relative;
//       overflow: hidden;
//     }
//     .A {
//       width: 100dvw;
//       height: 100dvh;
//     }
//     .B {
//       width: 20dvw;
//       height: auto;
//     }
//     .toggle {
//       position: absolute;
//       top: 10px;
//       right: 10px;
//       z-index: 999;
//       background: blue;
//       color: white;
//       border: none;
//       padding: 5px 10px;
//       cursor: pointer;
//     }

//     ::slotted(*) {
//       width: 100%;
//       height: 100%;
//       display: block;
//     }

//     ::slotted(video) {
//       aspect-ratio: 16/9; /* or 4/3, 1/1, 9/16 -- change as needed */
//       width: 100%;
//       height: auto;
//       object-fit: contain;
//       display: block;
//     }
//   `;

//   static properties = {
//     srcUrl: { type: String },
//     currentLayout: { type: String },
//   };

//   constructor() {
//     super();
//     this.currentLayout = 'A';
//   }

//   render() {
//     return html`
//       <div class="base ${this.currentLayout}">
//         <slot></slot>
//         <button class="toggle" @click=${this.onClick}>
//           ${this.currentLayout}
//         </button>
//       </div>
//     `;
//   }

//   onClick = () => {
//     this.currentLayout = this.currentLayout === 'A' ? 'B' : 'A';
//   };

//   firstUpdated() {
//     const video = this.querySelector('video');
//     if (!video) return;
//     video.addEventListener('loadedmetadata', () => {
//       const { videoWidth, videoHeight } = video;
//       if (videoWidth && videoHeight) {
//         const ratio = videoWidth / videoHeight;
//         video.style.aspectRatio = `${videoWidth} / ${videoHeight}`; // Example: '16 / 9'
//       } else {
//         // fallback to default aspect ratio
//         video.style.aspectRatio = '16 / 9';
//       }
//     });
//   }
// }

// customElements.define('layout-switcher', LayoutSwitcher);
