// src/features/call/signaling/index.js
//
// Barrel for the Firebase signaling adapters that bridge src/lib/webrtc
// to Firebase RTDB. Importing this module also wires the lib's logger to
// devDebug so library traces respect the app's existing debug flag.

import { setLogger } from '../../../lib/webrtc/index.js';
import { devDebug } from '../../../shared/utils/dev/dev-utils.js';

setLogger(devDebug);

export { createFirebaseIceTransport } from './firebase-ice-transport.js';
export { createFirebaseDataSignaling } from './firebase-data-signaling.js';
export {
  createDataConnection,
  joinDataConnection,
  closeDataConnection,
} from './data-connection.js';
