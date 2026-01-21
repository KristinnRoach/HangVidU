import {
  remoteBoxEl,
  localBoxEl,
  sharedBoxEl,
  chatControls,
} from '../elements.js';

import { hideElement } from '../utils/ui/ui-utils.js';

export function initUI() {
  hideElement(remoteBoxEl);
  hideElement(localBoxEl);
  hideElement(sharedBoxEl);
  hideElement(chatControls);
}
