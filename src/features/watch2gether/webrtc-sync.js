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
  // Connection monitoring
  connectionState: 'idle', // idle, connecting, connected, reconnecting, failed
  heartbeatInterval: null,
  missedHeartbeats: 0,
  maxMissedHeartbeats: 3,
  // Event delivery tracking
  pendingEvents: new Map(), // eventId -> { event, timestamp, retryCount }
  maxRetries: 3,
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
 * Send sync event through WebRTC data channel with retry logic
 * @param {string} eventType - Type of sync event
 * @param {Object} data - Event data
 * @returns {boolean} Success status
 */
export function sendSyncEvent(eventType, data) {
  const event = {
    type: eventType,
    data: data || {},
    timestamp: Date.now(),
    eventId: generateEventId(),
    requiresConfirmation: true,
  };

  // Prevent sync loops
  if (isRecentEvent(event.eventId)) {
    if (import.meta.env.DEV) {
      console.log('Preventing sync loop for event:', event.eventId);
    }
    return false;
  }

  return sendEventWithRetry(event);
}

/**
 * Send event with retry logic
 * @param {Object} event - Event to send
 * @param {number} attempt - Current attempt number
 * @returns {boolean} Success status
 */
function sendEventWithRetry(event, attempt = 1) {
  if (!state.dataChannel || state.dataChannel.readyState !== 'open') {
    // Queue message for when channel is ready
    state.messageQueue.push(event);

    if (import.meta.env.DEV) {
      console.log('Sync event queued (channel not ready):', event.type);
    }
    return false;
  }

  try {
    state.dataChannel.send(JSON.stringify(event));

    // Track for delivery confirmation
    if (event.requiresConfirmation) {
      state.pendingEvents.set(event.eventId, {
        event,
        timestamp: Date.now(),
        retryCount: attempt,
      });

      // Set timeout for confirmation
      setTimeout(() => {
        checkEventDelivery(event.eventId);
      }, 5000); // 5 second timeout
    }

    // Mark as recent to prevent loops
    state.syncLoopPrevention.set(event.eventId, Date.now());
    state.lastSyncTime = Date.now();

    if (import.meta.env.DEV) {
      console.log('Sync event sent:', event.type, 'attempt:', attempt);
    }

    return true;
  } catch (error) {
    console.error('Failed to send sync event:', error);

    // Retry if we haven't exceeded max attempts
    if (attempt < state.maxRetries) {
      if (import.meta.env.DEV) {
        console.log('Retrying event send, attempt:', attempt + 1);
      }
      setTimeout(() => {
        sendEventWithRetry(event, attempt + 1);
      }, 1000 * attempt); // Exponential backoff
    }

    return false;
  }
}

/**
 * Check if event was delivered and retry if needed
 * @param {string} eventId - Event ID to check
 */
function checkEventDelivery(eventId) {
  const pendingEvent = state.pendingEvents.get(eventId);
  if (!pendingEvent) return; // Already confirmed

  const { event, retryCount } = pendingEvent;

  if (retryCount < state.maxRetries) {
    if (import.meta.env.DEV) {
      console.log('Event not confirmed, retrying:', eventId);
    }
    sendEventWithRetry(event, retryCount + 1);
  } else {
    if (import.meta.env.DEV) {
      console.warn('Event delivery failed after max retries:', eventId);
    }
    state.pendingEvents.delete(eventId);
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
    connectionState: state.connectionState,
    queuedMessages: state.messageQueue.length,
    pendingEvents: state.pendingEvents.size,
    missedHeartbeats: state.missedHeartbeats,
    lastSyncTime: state.lastSyncTime,
  };
}

/**
 * Clean up WebRTC sync resources
 */
export function cleanupWebRTCSync() {
  // Stop connection monitoring
  stopConnectionMonitoring();

  if (state.dataChannel) {
    try {
      state.dataChannel.close();
    } catch (error) {
      console.warn('Error closing data channel:', error);
    }
  }

  state.dataChannel = null;
  state.isConnected = false;
  state.connectionState = 'idle';
  state.messageQueue = [];
  state.eventListeners.clear();
  state.syncLoopPrevention.clear();
  state.pendingEvents.clear();
  state.lastSyncTime = 0;
  state.missedHeartbeats = 0;

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
    state.connectionState = 'connected';
    state.missedHeartbeats = 0;

    if (import.meta.env.DEV) {
      console.log('WebRTC sync data channel opened');
    }

    // Start connection monitoring
    startConnectionMonitoring();

    // Process queued messages
    processMessageQueue();

    // Notify listeners
    notifyEventListeners('connection', { connected: true });
  };

  dataChannel.onclose = () => {
    state.isConnected = false;
    state.connectionState = 'disconnected';

    if (import.meta.env.DEV) {
      console.log('WebRTC sync data channel closed');
    }

    // Stop connection monitoring
    stopConnectionMonitoring();

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

  // Handle special event types
  if (type === 'heartbeat') {
    sendHeartbeatResponse(eventId);
    return;
  }

  if (type === 'heartbeat-response') {
    // Reset missed heartbeats counter
    state.missedHeartbeats = 0;
    return;
  }

  if (type === 'delivery-confirmation') {
    // Remove from pending events
    state.pendingEvents.delete(data.originalEventId);
    if (import.meta.env.DEV) {
      console.log('Delivery confirmed for event:', data.originalEventId);
    }
    return;
  }

  // Validate event
  if (!type || !eventId) {
    console.warn('Invalid sync event received:', syncEvent);
    return;
  }

  // Send delivery confirmation if required
  if (syncEvent.requiresConfirmation) {
    sendDeliveryConfirmation(eventId);
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

/**
 * Start connection monitoring with heartbeats
 */
function startConnectionMonitoring() {
  if (state.heartbeatInterval) {
    clearInterval(state.heartbeatInterval);
  }

  state.heartbeatInterval = setInterval(() => {
    sendHeartbeat();
  }, 10000); // Send heartbeat every 10 seconds

  if (import.meta.env.DEV) {
    console.log('Connection monitoring started');
  }
}

/**
 * Stop connection monitoring
 */
function stopConnectionMonitoring() {
  if (state.heartbeatInterval) {
    clearInterval(state.heartbeatInterval);
    state.heartbeatInterval = null;
  }

  if (import.meta.env.DEV) {
    console.log('Connection monitoring stopped');
  }
}

/**
 * Send heartbeat to check connection
 */
function sendHeartbeat() {
  if (!state.dataChannel || state.dataChannel.readyState !== 'open') {
    handleMissedHeartbeat();
    return;
  }

  const heartbeat = {
    type: 'heartbeat',
    timestamp: Date.now(),
    eventId: generateEventId(),
  };

  try {
    state.dataChannel.send(JSON.stringify(heartbeat));

    // Set timeout to detect missed response
    setTimeout(() => {
      handleMissedHeartbeat();
    }, 5000); // 5 second timeout
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    handleMissedHeartbeat();
  }
}

/**
 * Send heartbeat response
 * @param {string} originalEventId - Original heartbeat event ID
 */
function sendHeartbeatResponse(originalEventId) {
  if (!state.dataChannel || state.dataChannel.readyState !== 'open') {
    return;
  }

  const response = {
    type: 'heartbeat-response',
    timestamp: Date.now(),
    eventId: generateEventId(),
    data: { originalEventId },
  };

  try {
    state.dataChannel.send(JSON.stringify(response));
  } catch (error) {
    console.error('Failed to send heartbeat response:', error);
  }
}

/**
 * Handle missed heartbeat
 */
function handleMissedHeartbeat() {
  state.missedHeartbeats++;

  if (import.meta.env.DEV) {
    console.warn(
      'Missed heartbeat:',
      state.missedHeartbeats,
      '/',
      state.maxMissedHeartbeats
    );
  }

  if (state.missedHeartbeats >= state.maxMissedHeartbeats) {
    if (import.meta.env.DEV) {
      console.error('Connection lost - too many missed heartbeats');
    }

    state.connectionState = 'failed';
    notifyEventListeners('connection', {
      connected: false,
      reason: 'heartbeat_timeout',
    });
  }
}

/**
 * Send delivery confirmation
 * @param {string} originalEventId - Original event ID
 */
function sendDeliveryConfirmation(originalEventId) {
  if (!state.dataChannel || state.dataChannel.readyState !== 'open') {
    return;
  }

  const confirmation = {
    type: 'delivery-confirmation',
    timestamp: Date.now(),
    eventId: generateEventId(),
    data: { originalEventId },
  };

  try {
    state.dataChannel.send(JSON.stringify(confirmation));
  } catch (error) {
    console.error('Failed to send delivery confirmation:', error);
  }
}
