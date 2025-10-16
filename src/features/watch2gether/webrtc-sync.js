// webrtc-sync.js - WebRTC data channel sync for watch2gether

// ===== SYNC STATE =====
const state = {
  dataChannel: null,
  isInitiator: false,
  messageQueue: [],
  isConnected: false,
  eventListeners: new Map(),
  syncLoopPrevention: new Map(), // eventId -> timestamp
  lastSyncTime: 0,
};

// ===== PUBLIC API =====

/**
 * Initialize WebRTC data channel sync
 * @param {RTCPeerConnection} peerConnection - WebRTC peer connection
 * @param {boolean} isInitiator - Whether this peer initiates the connection
 */
export function initializeWebRTCSync(peerConnection, isInitiator) {
  state.isInitiator = isInitiator;
  state.messageQueue = [];
  state.isConnected = false;
  state.eventListeners.clear();
  state.syncLoopPrevention.clear();

  if (isInitiator) {
    // Initiator creates the data channel
    state.dataChannel = peerConnection.createDataChannel('watch-sync', {
      ordered: true,
      maxRetransmits: 3,
    });

    setupDataChannelHandlers(state.dataChannel);
  } else {
    // Joiner waits for data channel from initiator
    peerConnection.ondatachannel = (event) => {
      if (event.channel.label === 'watch-sync') {
        state.dataChannel = event.channel;
        setupDataChannelHandlers(state.dataChannel);
      }
    };
  }

  if (import.meta.env.DEV) {
    console.log(
      'WebRTC sync initialized as:',
      isInitiator ? 'initiator' : 'joiner'
    );
  }
}

/**
 * Send sync event through WebRTC data channel
 * @param {string} eventType - Type of sync event
 * @param {Object} data - Event data
 * @returns {boolean} Success status
 */
export function sendSyncEvent(eventType, data) {
  if (!state.dataChannel || state.dataChannel.readyState !== 'open') {
    // Queue message for when channel is ready
    state.messageQueue.push({ eventType, data, timestamp: Date.now() });

    if (import.meta.env.DEV) {
      console.log('Sync event queued (channel not ready):', eventType);
    }
    return false;
  }

  const event = {
    type: eventType,
    data: data || {},
    timestamp: Date.now(),
    eventId: generateEventId(),
  };

  // Prevent sync loops
  if (isRecentEvent(event.eventId)) {
    if (import.meta.env.DEV) {
      console.log('Preventing sync loop for event:', event.eventId);
    }
    return false;
  }

  try {
    state.dataChannel.send(JSON.stringify(event));

    // Mark as recent to prevent loops
    state.syncLoopPrevention.set(event.eventId, Date.now());
    state.lastSyncTime = Date.now();

    if (import.meta.env.DEV) {
      console.log('Sync event sent:', eventType, data);
    }

    return true;
  } catch (error) {
    console.error('Failed to send sync event:', error);
    return false;
  }
}

/**
 * Listen for sync events
 * @param {string} eventType - Event type to listen for ('*' for all events)
 * @param {Function} callback - Event callback
 * @returns {Function} Cleanup function
 */
export function onSyncEvent(eventType, callback) {
  if (!state.eventListeners.has(eventType)) {
    state.eventListeners.set(eventType, new Set());
  }

  state.eventListeners.get(eventType).add(callback);

  // Return cleanup function
  return () => {
    const listeners = state.eventListeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  };
}

/**
 * Get sync connection status
 * @returns {Object} Connection status
 */
export function getSyncStatus() {
  return {
    isConnected: state.isConnected,
    isInitiator: state.isInitiator,
    channelState: state.dataChannel?.readyState || 'none',
    queuedMessages: state.messageQueue.length,
    lastSyncTime: state.lastSyncTime,
  };
}

/**
 * Clean up WebRTC sync resources
 */
export function cleanupWebRTCSync() {
  if (state.dataChannel) {
    try {
      state.dataChannel.close();
    } catch (error) {
      console.warn('Error closing data channel:', error);
    }
  }

  state.dataChannel = null;
  state.isConnected = false;
  state.messageQueue = [];
  state.eventListeners.clear();
  state.syncLoopPrevention.clear();
  state.lastSyncTime = 0;

  if (import.meta.env.DEV) {
    console.log('WebRTC sync cleaned up');
  }
}

// ===== PRIVATE HELPERS =====

/**
 * Setup data channel event handlers
 * @param {RTCDataChannel} dataChannel - Data channel to setup
 */
function setupDataChannelHandlers(dataChannel) {
  dataChannel.onopen = () => {
    state.isConnected = true;

    if (import.meta.env.DEV) {
      console.log('WebRTC sync data channel opened');
    }

    // Process queued messages
    processMessageQueue();

    // Notify listeners
    notifyEventListeners('connection', { connected: true });
  };

  dataChannel.onclose = () => {
    state.isConnected = false;

    if (import.meta.env.DEV) {
      console.log('WebRTC sync data channel closed');
    }

    // Notify listeners
    notifyEventListeners('connection', { connected: false });
  };

  dataChannel.onerror = (error) => {
    console.error('WebRTC sync data channel error:', error);

    // Notify listeners
    notifyEventListeners('error', { error });
  };

  dataChannel.onmessage = (event) => {
    try {
      const syncEvent = JSON.parse(event.data);
      handleIncomingSyncEvent(syncEvent);
    } catch (error) {
      console.error('Failed to parse sync event:', error);
    }
  };
}

/**
 * Handle incoming sync event from peer
 * @param {Object} syncEvent - Received sync event
 */
function handleIncomingSyncEvent(syncEvent) {
  const { type, data, eventId, timestamp } = syncEvent;

  // Validate event
  if (!type || !eventId) {
    console.warn('Invalid sync event received:', syncEvent);
    return;
  }

  // Check for sync loops
  if (isRecentEvent(eventId)) {
    if (import.meta.env.DEV) {
      console.log('Ignoring duplicate event:', eventId);
    }
    return;
  }

  // Mark as recent to prevent loops
  state.syncLoopPrevention.set(eventId, Date.now());

  // Check if event is too old (more than 10 seconds)
  if (Date.now() - timestamp > 10000) {
    if (import.meta.env.DEV) {
      console.log(
        'Ignoring old sync event:',
        type,
        Date.now() - timestamp,
        'ms old'
      );
    }
    return;
  }

  if (import.meta.env.DEV) {
    console.log('Received sync event:', type, data);
  }

  // Notify specific event listeners
  notifyEventListeners(type, data);

  // Notify wildcard listeners
  notifyEventListeners('*', { type, data, timestamp });

  state.lastSyncTime = Date.now();
}

/**
 * Process queued messages when channel becomes ready
 */
function processMessageQueue() {
  if (state.messageQueue.length === 0) {
    return;
  }

  if (import.meta.env.DEV) {
    console.log(
      'Processing',
      state.messageQueue.length,
      'queued sync messages'
    );
  }

  const messages = [...state.messageQueue];
  state.messageQueue = [];

  for (const { eventType, data } of messages) {
    sendSyncEvent(eventType, data);
  }
}

/**
 * Notify event listeners
 * @param {string} eventType - Event type
 * @param {Object} data - Event data
 */
function notifyEventListeners(eventType, data) {
  const listeners = state.eventListeners.get(eventType);
  if (listeners) {
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in sync event listener:', error);
      }
    });
  }
}

/**
 * Check if event was recently processed (sync loop prevention)
 * @param {string} eventId - Event identifier
 * @returns {boolean} True if recent
 */
function isRecentEvent(eventId) {
  const recentTime = state.syncLoopPrevention.get(eventId);
  if (!recentTime) return false;

  // Consider events recent for 5 seconds
  const isRecent = Date.now() - recentTime < 5000;

  // Clean up old entries
  if (!isRecent) {
    state.syncLoopPrevention.delete(eventId);
  }

  return isRecent;
}

/**
 * Generate unique event identifier
 * @returns {string} Unique event ID
 */
function generateEventId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
