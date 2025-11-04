/**
 * Test User Scenarios and Fixtures
 * Provides predefined user data and room states for testing
 * incoming call reliability scenarios.
 */

export const TEST_USERS = {
  ALICE: {
    uid: 'user_alice_123',
    displayName: 'Alice Johnson',
    email: 'alice@example.com',
    isAuthenticated: true,
    timezone: 'America/New_York'
  },

  BOB: {
    uid: 'user_bob_456',
    displayName: 'Bob Smith',
    email: 'bob@example.com',
    isAuthenticated: true,
    timezone: 'America/Los_Angeles'
  },

  CHARLIE: {
    uid: 'user_charlie_789',
    displayName: 'Charlie Brown',
    email: 'charlie@example.com',
    isAuthenticated: false, // Guest user
    timezone: 'Europe/London'
  },

  DIANA: {
    uid: 'user_diana_101',
    displayName: 'Diana Prince',
    email: 'diana@example.com',
    isAuthenticated: true,
    timezone: 'Asia/Tokyo'
  }
};

export const TEST_ROOMS = {
  ROOM_1: {
    id: 'room_test_001',
    createdAt: Date.now() - 60000, // 1 minute ago
    createdBy: TEST_USERS.ALICE.uid,
    type: 'initial_call'
  },

  ROOM_2: {
    id: 'room_test_002',
    createdAt: Date.now() - 120000, // 2 minutes ago
    createdBy: TEST_USERS.BOB.uid,
    type: 'contact_call'
  },

  ROOM_STALE: {
    id: 'room_stale_003',
    createdAt: Date.now() - 300000, // 5 minutes ago (stale)
    createdBy: TEST_USERS.CHARLIE.uid,
    type: 'stale_call'
  }
};

export const CALL_SCENARIOS = {
  SUCCESSFUL_INITIAL_CALL: {
    name: 'Successful Initial Call',
    description: 'Alice creates room, Bob joins, both save contacts',
    participants: [TEST_USERS.ALICE, TEST_USERS.BOB],
    roomId: TEST_ROOMS.ROOM_1.id,
    expectedOutcome: 'success',
    steps: [
      'alice_creates_room',
      'bob_joins_room',
      'connection_established',
      'call_completed',
      'contacts_saved'
    ]
  },

  CONTACT_CALL_SUCCESS: {
    name: 'Contact Call Success',
    description: 'Alice calls saved contact Bob, incoming call works',
    participants: [TEST_USERS.ALICE, TEST_USERS.BOB],
    roomId: TEST_ROOMS.ROOM_2.id,
    expectedOutcome: 'success',
    prerequisites: ['contacts_already_saved'],
    steps: [
      'alice_clicks_call_button',
      'room_offer_created',
      'bob_receives_notification',
      'bob_accepts_call',
      'connection_established'
    ]
  },

  CALLING_UI_DISAPPEARS: {
    name: 'Calling UI Disappears Bug',
    description: 'The specific failure scenario being debugged',
    participants: [TEST_USERS.ALICE, TEST_USERS.BOB],
    roomId: TEST_ROOMS.ROOM_1.id,
    expectedOutcome: 'failure',
    failureType: 'calling_ui_disappears',
    steps: [
      'alice_clicks_call_button',
      'calling_ui_appears',
      'calling_ui_disappears_quickly',
      'no_incoming_alert_for_bob',
      'page_reload_shows_alert'
    ]
  }  
STALE_CALL_REJECTION: {
    name: 'Stale Call Rejection',
    description: 'Old call events should be rejected as stale',
    participants: [TEST_USERS.CHARLIE, TEST_USERS.DIANA],
    roomId: TEST_ROOMS.ROOM_STALE.id,
    expectedOutcome: 'rejected',
    rejectionReason: 'stale_call',
    steps: [
      'charlie_creates_old_room',
      'diana_receives_stale_event',
      'freshness_validation_fails',
      'call_rejected',
      'no_notification_shown'
    ]
  },

  BIDIRECTIONAL_CALLS: {
    name: 'Bidirectional Contact Calls',
    description: 'Both users can call each other after saving contacts',
    participants: [TEST_USERS.ALICE, TEST_USERS.BOB],
    roomId: TEST_ROOMS.ROOM_1.id,
    expectedOutcome: 'success',
    steps: [
      'initial_call_and_save',
      'alice_calls_bob',
      'bob_accepts',
      'call_ends',
      'bob_calls_alice',
      'alice_accepts',
      'call_ends'
    ]
  },

  NETWORK_INTERRUPTION: {
    name: 'Network Interruption Recovery',
    description: 'Firebase connection loss and recovery during call',
    participants: [TEST_USERS.ALICE, TEST_USERS.BOB],
    roomId: TEST_ROOMS.ROOM_1.id,
    expectedOutcome: 'recovery',
    steps: [
      'call_in_progress',
      'network_disconnection',
      'listeners_lost',
      'network_reconnection',
      'listeners_restored',
      'call_continues'
    ]
  },

  GUEST_USER_CALL: {
    name: 'Guest User Call Flow',
    description: 'Unauthenticated user making and receiving calls',
    participants: [TEST_USERS.CHARLIE, TEST_USERS.ALICE],
    roomId: TEST_ROOMS.ROOM_1.id,
    expectedOutcome: 'success',
    specialConditions: ['guest_user', 'localStorage_storage'],
    steps: [
      'charlie_creates_room_as_guest',
      'alice_joins',
      'connection_established',
      'contacts_saved_to_localStorage'
    ]
  }
};

export const ROOM_STATES = {
  EMPTY_ROOM: {
    id: 'room_empty',
    members: {},
    createdAt: Date.now(),
    state: 'empty'
  },

  ROOM_WITH_INITIATOR: {
    id: 'room_with_initiator',
    members: {
      [TEST_USERS.ALICE.uid]: {
        uid: TEST_USERS.ALICE.uid,
        joinedAt: Date.now() - 5000,
        role: 'initiator'
      }
    },
    createdAt: Date.now() - 5000,
    createdBy: TEST_USERS.ALICE.uid,
    state: 'waiting_for_joiner'
  },

  ROOM_WITH_BOTH_USERS: {
    id: 'room_with_both',
    members: {
      [TEST_USERS.ALICE.uid]: {
        uid: TEST_USERS.ALICE.uid,
        joinedAt: Date.now() - 10000,
        role: 'initiator'
      },
      [TEST_USERS.BOB.uid]: {
        uid: TEST_USERS.BOB.uid,
        joinedAt: Date.now() - 5000,
        role: 'joiner'
      }
    },
    createdAt: Date.now() - 10000,
    createdBy: TEST_USERS.ALICE.uid,
    state: 'active_call'
  }};


export const CONTACT_DATA = {
  ALICE_CONTACTS: {
    [TEST_USERS.BOB.uid]: {
      uid: TEST_USERS.BOB.uid,
      displayName: TEST_USERS.BOB.displayName,
      roomId: TEST_ROOMS.ROOM_1.id,
      savedAt: Date.now() - 30000,
      callCount: 3
    }
  },

  BOB_CONTACTS: {
    [TEST_USERS.ALICE.uid]: {
      uid: TEST_USERS.ALICE.uid,
      displayName: TEST_USERS.ALICE.displayName,
      roomId: TEST_ROOMS.ROOM_1.id,
      savedAt: Date.now() - 30000,
      callCount: 2
    }
  }
};

export const FIREBASE_EVENTS = {
  MEMBER_JOIN_FRESH: {
    type: 'child_added',
    data: {
      uid: TEST_USERS.ALICE.uid,
      joinedAt: Date.now(),
      role: 'initiator'
    }
  },

  MEMBER_JOIN_STALE: {
    type: 'child_added',
    data: {
      uid: TEST_USERS.BOB.uid,
      joinedAt: Date.now() - 25000, // 25 seconds ago (stale)
      role: 'initiator'
    }
  },

  MEMBER_LEAVE: {
    type: 'child_removed',
    data: {
      uid: TEST_USERS.ALICE.uid,
      leftAt: Date.now()
    }
  },

  ROOM_UPDATE: {
    type: 'value',
    data: {
      createdAt: Date.now(),
      forceInitiator: true,
      createdBy: TEST_USERS.ALICE.uid
    }
  }
};

export const TIMING_SCENARIOS = {
  NORMAL_TIMING: {
    roomCreationDelay: 100,
    listenerAttachDelay: 50,
    memberJoinDelay: 200,
    description: 'Normal timing - listener attached before member joins'
  },

  RACE_CONDITION: {
    roomCreationDelay: 50,
    listenerAttachDelay: 200,
    memberJoinDelay: 100,
    description: 'Race condition - member joins before listener attached'
  },

  SLOW_FIREBASE: {
    roomCreationDelay: 500,
    listenerAttachDelay: 300,
    memberJoinDelay: 800,
    description: 'Slow Firebase responses'
  }
};

// Helper functions for creating test data
export function createTestUser(overrides = {}) {
  return {
    uid: `test_user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    displayName: `Test User ${Math.floor(Math.random() * 1000)}`,
    email: `test${Math.floor(Math.random() * 1000)}@example.com`,
    isAuthenticated: true,
    ...overrides
  };
}

export function createTestRoom(overrides = {}) {
  return {
    id: `test_room_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    createdAt: Date.now(),
    createdBy: null,
    members: {},
    ...overrides
  };
}

export function createMemberJoinEvent(userId, overrides = {}) {
  return {
    type: 'child_added',
    data: {
      uid: userId,
      joinedAt: Date.now(),
      role: 'joiner',
      ...overrides
    }
  };
}