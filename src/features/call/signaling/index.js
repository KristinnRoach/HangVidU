// src/features/call/signaling/index.js
//
// Barrel for the Firebase signaling adapters that bridge @kidlib/p2p
// to Firebase RTDB. Importing this module also wires the lib's logger to
// devDebug so library traces respect the app's existing debug flag.

import { setLogger } from '@kidlib/p2p';
import { devDebug } from '../../../shared/utils/dev/dev-utils.js';

setLogger(devDebug);

export { createFirebaseIceTransport } from './firebase-ice-transport.js';
export { createFirebaseCallSignaling } from './firebase-call-signaling.js';
export { createFirebaseDataSignaling } from './firebase-data-signaling.js';
export {
  createDataConnection,
  joinDataConnection,
} from './data-connection.js';
