/**
 * Call Flow Simulator
 * Simulates complete user call flows including initial calls,
 * contact saving, and subsequent contact calls for testing reliability.
 */

import { getDiagnosticLogger } from '../../src/utils/diagnostic-logger.js';

export class CallFlowSimulator {
  constructor(firebaseMock) {
    this.firebase = firebaseMock;
    this.logger = getDiagnosticLogger();
    this.callEvents = [];
    this.users = new Map();
    this.contacts = new Map();
    this.activeRooms = new Map();
  }

  /**
   * User Management
   */
  createUser(userId, userData = {}) {
    const user = {
      uid: userId,
      displayName: userData.displayName || `User ${userId}`,
      isAuthenticated: userData.isAuthenticated !== false,
      listeningRoomIds: new Set(),
      contacts: new Map(),
      ...userData
    };
    
    this.users.set(userId, user);
    this.recordEvent('USER_CREATED', { userId, userData: user });
    return user;
  }

  getUser(userId) {
    return this.users.get(userId);
  }

  /**
   * Initial Call Simulation
   */
  async simulateInitialCall(userAId, userBId, roomId) {
    const userA = this.getUser(userAId);
    const userB = this.getUser(userBId);
    
    if (!userA || !userB) {
      throw new Error('Users must be created before simulating calls');
    }

    this.recordEvent('INITIAL_CALL_START', { 
      caller: userAId, 
      callee: userBId, 
      roomId 
    });

    // Step 1: User A creates room and becomes initiator
    await this.createRoom(roomId, userAId, true);
    
    // Step 2: User B joins room via text input
    await this.joinRoom(roomId, userBId, false);
    
    // Step 3: Establish connection
    await this.establishConnection(roomId, userAId, userBId);
    
    this.recordEvent('INITIAL_CALL_ESTABLISHED', { 
      roomId, 
      participants: [userAId, userBId] 
    });

    return {
      roomId,
      participants: [userAId, userBId],
      callType: 'initial'
    };
  }  /**
   
* Contact Save Simulation
   */
  async simulateContactSave(userId, contactUserId, roomId, contactData = {}) {
    const user = this.getUser(userId);
    const contactUser = this.getUser(contactUserId);
    
    if (!user || !contactUser) {
      throw new Error('Both users must exist to save contact');
    }

    const contact = {
      uid: contactUserId,
      displayName: contactData.displayName || contactUser.displayName,
      roomId: roomId,
      savedAt: Date.now(),
      ...contactData
    };

    // Save to user's contacts
    user.contacts.set(contactUserId, contact);
    
    // Simulate saving to storage (Firebase RTDB or localStorage)
    await this.saveContactToStorage(userId, contact);
    
    // Set up persistent listener for this contact's room
    await this.attachContactListener(userId, roomId);

    this.recordEvent('CONTACT_SAVED', { 
      userId, 
      contactUserId, 
      roomId,
      contact 
    });

    this.logger.logContactSave(contactUserId, roomId, { 
      savedBy: userId,
      storageType: user.isAuthenticated ? 'firebase' : 'localStorage'
    });

    return contact;
  }

  /**
   * Contact Call Simulation
   */
  async simulateContactCall(callerUserId, contactUserId, originalRoomId) {
    const caller = this.getUser(callerUserId);
    const contact = caller.contacts.get(contactUserId);
    
    if (!contact) {
      throw new Error(`Contact ${contactUserId} not found for user ${callerUserId}`);
    }

    this.recordEvent('CONTACT_CALL_START', { 
      caller: callerUserId, 
      contact: contactUserId, 
      roomId: originalRoomId 
    });

    // Step 1: Create fresh room offer with forceInitiator
    const roomCreationTime = Date.now();
    await this.createFreshRoomOffer(originalRoomId, callerUserId);
    
    // Step 2: Trigger incoming call detection for contact
    const listenerAttachTime = Date.now();
    await this.triggerIncomingCallDetection(originalRoomId, callerUserId, contactUserId);
    
    // Log timing for race condition analysis
    this.logger.logRoomCreation(originalRoomId, true, {
      creationTime: roomCreationTime,
      listenerAttachTime: listenerAttachTime
    });

    this.recordEvent('CONTACT_CALL_TRIGGERED', { 
      roomId: originalRoomId, 
      caller: callerUserId,
      contact: contactUserId,
      timingDiff: listenerAttachTime - roomCreationTime
    });

    return {
      roomId: originalRoomId,
      caller: callerUserId,
      contact: contactUserId,
      callType: 'contact'
    };
  }  /
**
   * Call Acceptance and Hangup
   */
  async simulateCallAcceptance(roomId, userId) {
    this.recordEvent('CALL_ACCEPTED', { roomId, userId });
    
    // Simulate calling UI cleanup
    this.logger.logCallingUILifecycle('ACCEPTED', roomId, { userId });
    
    return { roomId, acceptedBy: userId };
  }

  async simulateHangup(roomId, userId) {
    const room = this.activeRooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }

    this.recordEvent('HANGUP', { roomId, userId });
    
    // Remove user from room
    room.participants = room.participants.filter(p => p !== userId);
    
    // If room is empty, clean up
    if (room.participants.length === 0) {
      this.activeRooms.delete(roomId);
      this.recordEvent('ROOM_CLOSED', { roomId });
    }

    return { roomId, hungUpBy: userId };
  }

  /**
   * Internal Helper Methods
   */
  async createRoom(roomId, initiatorId, isInitiator) {
    const room = {
      id: roomId,
      createdAt: Date.now(),
      createdBy: initiatorId,
      participants: [initiatorId],
      isActive: true
    };

    this.activeRooms.set(roomId, room);
    
    // Simulate Firebase room creation
    await this.firebase.ref(`rooms/${roomId}`).set({
      createdAt: room.createdAt,
      createdBy: initiatorId
    });

    this.recordEvent('ROOM_CREATED', { 
      roomId, 
      initiatorId, 
      isInitiator,
      createdAt: room.createdAt 
    });

    return room;
  }

  async joinRoom(roomId, userId, isInitiator) {
    const room = this.activeRooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} does not exist`);
    }

    room.participants.push(userId);
    
    const joinData = {
      uid: userId,
      joinedAt: Date.now(),
      role: isInitiator ? 'initiator' : 'joiner'
    };

    // Simulate Firebase member join
    await this.firebase.ref(`rooms/${roomId}/members/${userId}`).set(joinData);

    this.recordEvent('ROOM_JOINED', { roomId, userId, joinData });
    this.logger.logMemberJoinEvent(roomId, userId, joinData);

    return joinData;
  }  
async establishConnection(roomId, userAId, userBId) {
    // Simulate WebRTC connection establishment
    this.recordEvent('CONNECTION_ESTABLISHING', { roomId, userAId, userBId });
    
    // Simulate some delay for connection
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.recordEvent('CONNECTION_ESTABLISHED', { roomId, userAId, userBId });
    
    return { roomId, connected: true };
  }

  async saveContactToStorage(userId, contact) {
    const user = this.getUser(userId);
    
    if (user.isAuthenticated) {
      // Simulate Firebase RTDB save
      await this.firebase.ref(`users/${userId}/contacts/${contact.uid}`).set(contact);
    } else {
      // Simulate localStorage save
      // In real implementation, this would use localStorage
    }
  }

  async attachContactListener(userId, roomId) {
    const user = this.getUser(userId);
    
    // Add to listening rooms
    user.listeningRoomIds.add(roomId);
    
    // Simulate Firebase listener attachment
    const listener = this.firebase.ref(`rooms/${roomId}/members`).on('child_added', (snapshot) => {
      const memberData = snapshot.val();
      if (memberData && memberData.uid !== userId) {
        this.handleIncomingCallDetection(roomId, memberData.uid, userId, memberData);
      }
    });

    this.logger.logListenerAttachment(roomId, 'member_join', user.listeningRoomIds.size, {
      userId,
      listenerType: 'contact_persistent'
    });

    return listener;
  }

  async createFreshRoomOffer(roomId, initiatorId) {
    // Simulate forceInitiator room creation
    const roomData = {
      createdAt: Date.now(),
      createdBy: initiatorId,
      forceInitiator: true
    };

    await this.firebase.ref(`rooms/${roomId}`).update(roomData);
    
    this.logger.logContactCall(initiatorId, roomId, true, {
      roomCreatedAt: roomData.createdAt
    });

    return roomData;
  }

  async triggerIncomingCallDetection(roomId, callerId, calleeId) {
    const callerData = {
      uid: callerId,
      joinedAt: Date.now(),
      role: 'initiator'
    };

    // Simulate member join event that should trigger incoming call
    this.firebase.triggerEvent({
      roomId,
      type: 'child_added',
      data: callerData
    });

    this.recordEvent('INCOMING_CALL_TRIGGERED', { 
      roomId, 
      callerId, 
      calleeId,
      callerData 
    });

    return callerData;
  } 
 handleIncomingCallDetection(roomId, callerId, calleeId, memberData) {
    // This simulates the actual incoming call detection logic
    this.recordEvent('INCOMING_CALL_DETECTED', { 
      roomId, 
      callerId, 
      calleeId,
      memberData 
    });

    this.logger.logIncomingCallEvent(callerId, roomId, {
      isFresh: true,
      method: 'joinedAt',
      age: Date.now() - memberData.joinedAt,
      reason: 'Fresh call detected'
    });
  }

  /**
   * Bidirectional Call Testing
   */
  async simulateBidirectionalCalls(userAId, userBId, roomId) {
    // First call: A -> B
    await this.simulateInitialCall(userAId, userBId, roomId);
    await this.simulateContactSave(userAId, userBId, roomId);
    await this.simulateContactSave(userBId, userAId, roomId);
    await this.simulateHangup(roomId, userAId);

    // Second call: A -> B (using saved contact)
    const callAtoB = await this.simulateContactCall(userAId, userBId, roomId);
    await this.simulateCallAcceptance(roomId, userBId);
    await this.simulateHangup(roomId, userAId);

    // Third call: B -> A (reverse direction)
    const callBtoA = await this.simulateContactCall(userBId, userAId, roomId);
    await this.simulateCallAcceptance(roomId, userAId);
    await this.simulateHangup(roomId, userBId);

    return {
      initialCall: { roomId, participants: [userAId, userBId] },
      callAtoB,
      callBtoA
    };
  }

  /**
   * Event Management and Analysis
   */
  recordEvent(eventType, data) {
    const event = {
      timestamp: Date.now(),
      type: eventType,
      data
    };
    
    this.callEvents.push(event);
    return event;
  }

  getCallEvents(filters = {}) {
    let events = [...this.callEvents];
    
    if (filters.roomId) {
      events = events.filter(e => e.data.roomId === filters.roomId);
    }
    
    if (filters.userId) {
      events = events.filter(e => 
        e.data.userId === filters.userId ||
        e.data.caller === filters.userId ||
        e.data.callee === filters.userId
      );
    }
    
    if (filters.eventType) {
      events = events.filter(e => e.type === filters.eventType);
    }
    
    return events.sort((a, b) => a.timestamp - b.timestamp);
  }

  getCallFlowSummary(roomId) {
    const events = this.getCallEvents({ roomId });
    
    return {
      roomId,
      totalEvents: events.length,
      callType: events.find(e => e.type === 'INITIAL_CALL_START') ? 'initial' : 'contact',
      participants: [...new Set(events.flatMap(e => [e.data.caller, e.data.callee, e.data.userId]).filter(Boolean))],
      timeline: events,
      duration: events.length > 0 ? events[events.length - 1].timestamp - events[0].timestamp : 0
    };
  }  /*
*
   * Failure Scenario Simulation
   */
  async simulateCallingUIDisappearance(roomId, callerId, calleeId) {
    // Simulate the specific failure: calling UI appears then disappears quickly
    this.recordEvent('CALLING_UI_SHOWN', { roomId, callerId, calleeId });
    
    // Simulate premature dismissal (before 30-second timeout)
    setTimeout(() => {
      this.recordEvent('CALLING_UI_DISMISSED_EARLY', { 
        roomId, 
        callerId, 
        calleeId,
        reason: 'premature_dismissal'
      });
      
      this.logger.logCallingUILifecycle('DISMISSED_EARLY', roomId, {
        callerId,
        calleeId,
        reason: 'Race condition or listener issue'
      });
    }, 100); // Dismiss after 100ms instead of 30 seconds

    return { roomId, callerId, calleeId };
  }

  async simulatePageReload(userId) {
    const user = this.getUser(userId);
    
    this.recordEvent('PAGE_RELOAD', { userId });
    
    // Simulate listener cleanup and re-attachment
    const roomIds = [...user.listeningRoomIds];
    user.listeningRoomIds.clear();
    
    // Re-attach listeners after reload
    for (const roomId of roomIds) {
      await this.attachContactListener(userId, roomId);
    }
    
    this.recordEvent('LISTENERS_REATTACHED', { userId, roomIds });
    
    return { userId, reattachedRooms: roomIds };
  }

  /**
   * Utility Methods
   */
  reset() {
    this.callEvents = [];
    this.users.clear();
    this.contacts.clear();
    this.activeRooms.clear();
    this.firebase.reset();
  }

  getState() {
    return {
      users: Array.from(this.users.entries()),
      activeRooms: Array.from(this.activeRooms.entries()),
      totalEvents: this.callEvents.length,
      firebaseState: {
        connectionState: this.firebase.getConnectionState(),
        eventHistory: this.firebase.getEventHistory()
      }
    };
  }
}

// Factory function
export function createCallFlowSimulator(firebaseMock) {
  return new CallFlowSimulator(firebaseMock);
}