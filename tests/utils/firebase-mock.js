/**
 * Enhanced Firebase Mock System
 * Provides realistic Firebase behavior simulation including failure modes,
 * race conditions, and connection issues for testing incoming call reliability.
 */

export class EnhancedFirebaseMock {
  constructor() {
    this.listeners = new Map(); // roomId -> Set of listeners
    this.connectionState = 'connected';
    this.eventQueue = [];
    this.responseDelay = 0;
    this.failureMode = null;
    this.eventHistory = [];
    this.duplicateEventCount = 0;
  }

  /**
   * Simulate Firebase connection states
   */
  simulateConnectionLoss() {
    this.connectionState = 'disconnected';
    this.eventHistory.push({
      type: 'connection_lost',
      timestamp: Date.now(),
    });
  }

  simulateReconnection() {
    this.connectionState = 'connected';
    this.eventHistory.push({
      type: 'connection_restored',
      timestamp: Date.now(),
    });
    // Replay queued events
    this.replayQueuedEvents();
  }

  simulateSlowResponse(delayMs) {
    this.responseDelay = delayMs;
  }

  /**
   * Simulate various failure modes
   */
  simulateListenerFailure(roomId, failureType) {
    this.failureMode = { roomId, type: failureType };
  }

  simulateRaceCondition(eventA, eventB, delayMs) {
    // Simulate events arriving out of order
    setTimeout(() => {
      this.triggerEvent(eventB);
    }, delayMs);
    this.triggerEvent(eventA);
  }

  /**
   * Mock Firebase Realtime Database interface
   */
  ref(path) {
    return new MockDatabaseRef(path, this);
  }

  /**
   * Event management
   */
  triggerEvent(event) {
    if (this.connectionState === 'disconnected') {
      this.eventQueue.push(event);
      return;
    }

    setTimeout(() => {
      this.processEvent(event);
    }, this.responseDelay);
  }

  processEvent(event) {
    const { roomId, type, data } = event;

    this.eventHistory.push({
      ...event,
      timestamp: Date.now(),
      processed: true,
    });

    // Check for failure simulation
    if (this.failureMode && this.failureMode.roomId === roomId) {
      if (this.failureMode.type === 'listener_timeout') {
        return; // Don't deliver event
      }
      if (this.failureMode.type === 'duplicate_event') {
        this.duplicateEventCount++;
        // Deliver event twice
        this.deliverEventToListeners(roomId, type, data);
      }
    }

    this.deliverEventToListeners(roomId, type, data);
  }

  deliverEventToListeners(roomId, type, data) {
    const listeners = this.listeners.get(roomId);
    if (listeners) {
      listeners.forEach((listener) => {
        if (listener.eventType === type || listener.eventType === 'value') {
          try {
            listener.callback(this.createSnapshot(data));
          } catch (error) {
            console.error('Listener callback error:', error);
          }
        }
      });
    }
  }

  replayQueuedEvents() {
    const events = [...this.eventQueue];
    this.eventQueue = [];
    events.forEach((event) => this.processEvent(event));
  }

  createSnapshot(data) {
    return {
      val: () => data,
      key: data?.key || null,
      exists: () => data !== null && data !== undefined,
    };
  }

  /**
   * Diagnostic methods
   */
  getConnectionState() {
    return this.connectionState;
  }

  getListenerCount(roomId) {
    const listeners = this.listeners.get(roomId);
    return listeners ? listeners.size : 0;
  }

  getEventHistory() {
    return [...this.eventHistory];
  }

  getDuplicateEventCount() {
    return this.duplicateEventCount;
  }

  reset() {
    this.listeners.clear();
    this.connectionState = 'connected';
    this.eventQueue = [];
    this.responseDelay = 0;
    this.failureMode = null;
    this.eventHistory = [];
    this.duplicateEventCount = 0;
  }
}

class MockDatabaseRef {
  constructor(path, mockInstance) {
    this.path = path;
    this.mock = mockInstance;
  }

  child(childPath) {
    return new MockDatabaseRef(`${this.path}/${childPath}`, this.mock);
  }

  on(eventType, callback) {
    const roomId = this.extractRoomId();
    if (!roomId) return;

    if (!this.mock.listeners.has(roomId)) {
      this.mock.listeners.set(roomId, new Set());
    }

    const listener = {
      eventType,
      callback,
      path: this.path,
      attachedAt: Date.now(),
    };

    this.mock.listeners.get(roomId).add(listener);

    this.mock.eventHistory.push({
      type: 'listener_attached',
      roomId,
      eventType,
      path: this.path,
      timestamp: Date.now(),
    });

    return listener;
  }

  off(eventType, callback) {
    const roomId = this.extractRoomId();
    if (!roomId) return;

    const listeners = this.mock.listeners.get(roomId);
    if (listeners) {
      const toRemove = Array.from(listeners).find(
        (l) => l.eventType === eventType && l.callback === callback
      );
      if (toRemove) {
        listeners.delete(toRemove);
        this.mock.eventHistory.push({
          type: 'listener_removed',
          roomId,
          eventType,
          path: this.path,
          timestamp: Date.now(),
        });
      }
    }
  }

  set(data) {
    return new Promise((resolve, reject) => {
      if (this.mock.connectionState === 'disconnected') {
        reject(new Error('Firebase connection lost'));
        return;
      }

      setTimeout(() => {
        const roomId = this.extractRoomId();
        this.mock.triggerEvent({
          roomId,
          type: 'value',
          data,
          path: this.path,
        });
        resolve();
      }, this.mock.responseDelay);
    });
  }

  update(updates) {
    return new Promise((resolve, reject) => {
      if (this.mock.connectionState === 'disconnected') {
        reject(new Error('Firebase connection lost'));
        return;
      }

      setTimeout(() => {
        const roomId = this.extractRoomId();
        this.mock.triggerEvent({
          roomId,
          type: 'child_changed',
          data: updates,
          path: this.path,
        });
        resolve();
      }, this.mock.responseDelay);
    });
  }

  once(eventType) {
    return new Promise((resolve, reject) => {
      if (this.mock.connectionState === 'disconnected') {
        reject(new Error('Firebase connection lost'));
        return;
      }

      setTimeout(() => {
        // Simulate data retrieval
        resolve(this.mock.createSnapshot(null));
      }, this.mock.responseDelay);
    });
  }

  extractRoomId() {
    // Extract room ID from path like "rooms/roomId/members"
    const pathParts = this.path.split('/');
    const roomsIndex = pathParts.indexOf('rooms');
    if (roomsIndex !== -1 && pathParts[roomsIndex + 1]) {
      return pathParts[roomsIndex + 1];
    }
    return null;
  }
}

// Factory function for creating mock instances
export function createFirebaseMock() {
  return new EnhancedFirebaseMock();
}

// Helper for testing specific scenarios
export class FirebaseTestScenarios {
  static async simulateIncomingCall(mock, roomId, callerData) {
    // Simulate member joining room
    mock.triggerEvent({
      roomId,
      type: 'child_added',
      data: {
        key: callerData.uid,
        ...callerData,
        joinedAt: Date.now(),
      },
    });
  }

  static async simulateStaleCall(mock, roomId, callerData, ageMs) {
    // Simulate old member join event
    mock.triggerEvent({
      roomId,
      type: 'child_added',
      data: {
        key: callerData.uid,
        ...callerData,
        joinedAt: Date.now() - ageMs,
      },
    });
  }

  static async simulateNetworkIssue(mock, durationMs) {
    mock.simulateConnectionLoss();
    setTimeout(() => {
      mock.simulateReconnection();
    }, durationMs);
  }

  static async simulateListenerRaceCondition(
    mock,
    roomId,
    userData1,
    userData2
  ) {
    // Simulate two users joining simultaneously
    mock.simulateRaceCondition(
      {
        roomId,
        type: 'child_added',
        data: { key: userData1.uid, ...userData1, joinedAt: Date.now() },
      },
      {
        roomId,
        type: 'child_added',
        data: { key: userData2.uid, ...userData2, joinedAt: Date.now() },
      },
      50 // 50ms delay
    );
  }
}
