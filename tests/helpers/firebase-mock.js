// tests/helpers/firebase-mock.js - Firebase mocking utilities for tests

/**
 * Mock Firebase Realtime Database for testing
 */
export function createFirebaseMock() {
  const data = new Map();
  const listeners = new Map();
  
  function getRef(path) {
    return {
      set: async (value) => {
        data.set(path, value);
        notifyListeners(path, value);
      },
      
      update: async (updates) => {
        const current = data.get(path) || {};
        const updated = { ...current, ...updates };
        data.set(path, updated);
        notifyListeners(path, updated);
      },
      
      once: async (eventType) => {
        const value = data.get(path);
        return {
          exists: () => value !== undefined,
          val: () => value
        };
      },
      
      on: (eventType, callback) => {
        const key = `${path}:${eventType}`;
        if (!listeners.has(key)) {
          listeners.set(key, new Set());
        }
        listeners.get(key).add(callback);
        
        // Return the callback for off() method
        return callback;
      },
      
      off: (eventType, callback) => {
        const key = `${path}:${eventType}`;
        if (listeners.has(key)) {
          listeners.get(key).delete(callback);
        }
      },
      
      child: (childPath) => {
        return getRef(`${path}/${childPath}`);
      },
      
      push: async (value) => {
        const pushKey = `push_${Date.now()}_${Math.random()}`;
        const childPath = `${path}/${pushKey}`;
        data.set(childPath, value);
        
        // Notify child_added listeners
        const parentKey = `${path}:child_added`;
        if (listeners.has(parentKey)) {
          listeners.get(parentKey).forEach(callback => {
            callback({
              key: pushKey,
              val: () => value
            });
          });
        }
        
        return { key: pushKey };
      },
      
      remove: async () => {
        data.delete(path);
        notifyListeners(path, null);
      },
      
      onDisconnect: () => ({
        set: async () => {}, // Mock disconnect handler
        remove: async () => {}
      })
    };
  }
  
  function notifyListeners(path, value) {
    // Notify value listeners
    const valueKey = `${path}:value`;
    if (listeners.has(valueKey)) {
      listeners.get(valueKey).forEach(callback => {
        callback({
          exists: () => value !== null && value !== undefined,
          val: () => value
        });
      });
    }
  }
  
  return {
    ref: getRef,
    data, // Expose for test inspection
    listeners, // Expose for test inspection
    
    // Test utilities
    simulateData: (path, value) => {
      data.set(path, value);
      notifyListeners(path, value);
    },
    
    simulateChildAdded: (path, key, value) => {
      const childPath = `${path}/${key}`;
      data.set(childPath, value);
      
      const parentKey = `${path}:child_added`;
      if (listeners.has(parentKey)) {
        listeners.get(parentKey).forEach(callback => {
          callback({
            key,
            val: () => value
          });
        });
      }
    },
    
    clear: () => {
      data.clear();
      listeners.clear();
    }
  };
}

/**
 * Inject Firebase mock into page context
 */
export async function injectFirebaseMock(page) {
  await page.addInitScript(() => {
    // Create mock Firebase
    const mockDb = window.createFirebaseMock();
    
    // Override Firebase imports
    window.firebase = {
      database: () => mockDb
    };
    
    // Also mock ES6 imports if needed
    window.db = mockDb;
  });
  
  // Inject the mock creation function
  await page.addInitScript(createFirebaseMock.toString().replace('export function createFirebaseMock', 'window.createFirebaseMock = function'));
}

/**
 * Create a realistic room simulation for testing
 */
export async function simulateRoomCreation(page, roomId) {
  await page.evaluate((roomId) => {
    if (window.db && window.db.simulateData) {
      // Simulate room creation
      window.db.simulateData(`rooms/${roomId}`, {
        offer: {
          type: 'offer',
          sdp: 'v=0\r\no=- 123456789 2 IN IP4 127.0.0.1\r\n...'
        },
        created: Date.now(),
        status: {
          initiator: 'waiting'
        }
      });
    }
  }, roomId);
}

/**
 * Simulate peer joining room
 */
export async function simulatePeerJoin(page, roomId) {
  await page.evaluate((roomId) => {
    if (window.db && window.db.simulateData) {
      // Simulate answer
      window.db.simulateData(`rooms/${roomId}/answer`, {
        type: 'answer',
        sdp: 'v=0\r\no=- 987654321 2 IN IP4 127.0.0.1\r\n...'
      });
      
      // Simulate status update
      window.db.simulateData(`rooms/${roomId}/status`, {
        initiator: 'connected',
        joiner: 'connected'
      });
    }
  }, roomId);
}

/**
 * Simulate ICE candidates
 */
export async function simulateIceCandidates(page, roomId, isInitiator = true) {
  const candidatesPath = isInitiator ? 'callerCandidates' : 'calleeCandidates';
  
  await page.evaluate(({ roomId, candidatesPath }) => {
    if (window.db && window.db.simulateChildAdded) {
      // Simulate multiple ICE candidates
      const candidates = [
        {
          candidate: 'candidate:1 1 UDP 2130706431 192.168.1.100 54400 typ host',
          sdpMLineIndex: 0,
          sdpMid: '0'
        },
        {
          candidate: 'candidate:2 1 UDP 1694498815 203.0.113.100 54401 typ srflx',
          sdpMLineIndex: 0,
          sdpMid: '0'
        }
      ];
      
      candidates.forEach((candidate, index) => {
        setTimeout(() => {
          window.db.simulateChildAdded(`rooms/${roomId}/${candidatesPath}`, `candidate_${index}`, candidate);
        }, index * 100);
      });
    }
  }, { roomId, candidatesPath });
}