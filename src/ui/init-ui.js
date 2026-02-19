import {
  remoteBoxEl,
  localBoxEl,
  sharedBoxEl,
  chatControls,
} from '../elements.js';

import { hideElement } from './utils/ui-utils.js';

/** Hides video boxes and chat controls on startup (shown when call connects). */
export function initUI() {
  hideElement(remoteBoxEl);
  hideElement(localBoxEl);
  hideElement(sharedBoxEl);
  hideElement(chatControls);
}
