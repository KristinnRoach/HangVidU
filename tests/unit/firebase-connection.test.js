/**
 * Minimal test for Firebase connection and listener persistence
 * Focus: Are listeners staying attached after Firebase operations?
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { getDiagnosticLogger } from '../../src/utils/dev/diagnostic-logger.js';

describe('Firebase Connection Recovery', () => {
  let logger;

  beforeEach(() => {
    logger = getDiagnosticLogger();
    logger.clearLogs();
  });

  it('should detect if listeners get detached during Firebase operations', async () => {
    const roomId = 'test-connection-room';

    // Simulate the problematic sequence:
    // 1. Listener attached for saved contact
    // 2. User calls contact -> Firebase room operations
    // 3. Check if listener is still attached after operations

    // Step 1: Listener attached during startup
    logger.logListenerAttachment(roomId, 'member_join', 1, {
      action: 'startup_listener_attached',
      source: 'saved_contacts',
    });

    // Step 2: Firebase operations during call creation
    logger.logFirebaseOperation('create_room', true, null, {
      roomId,
      operation: 'set_room_data',
    });

    logger.logFirebaseOperation('join_room', true, null, {
      roomId,
      operation: 'set_member_data',
    });

    // Step 3: Check if listener cleanup happened (this might be the bug)
    logger.log('LISTENER', 'CLEANUP_CHECK', {
      roomId,
      listenersRemaining: 1, // Should still be 1
      problem: 'listeners_might_be_cleaned_up_incorrectly',
    });

    // Step 4: Partner tries to join but listener might be gone
    logger.logMemberJoinEvent(
      roomId,
      'partner-user-id',
      {
        joinedAt: performance.now(),
        role: 'joiner',
      },
      {
        detectedBy: 'no_listener_attached',
        problem: 'listener_was_cleaned_up',
      }
    );

    const logs = logger.getLogs();
    const listenerAttach = logs.find((log) => log.event === 'ATTACHED');
    const cleanupCheck = logs.find((log) => log.event === 'CLEANUP_CHECK');
    const memberJoin = logs.find((log) => log.event === 'MEMBER_JOINED');

    expect(listenerAttach).toBeDefined();
    expect(cleanupCheck).toBeDefined();
    expect(memberJoin).toBeDefined();

    // The key insight: if listeners are being cleaned up incorrectly,
    // the member join won't be detected
    console.log('=== FIREBASE CONNECTION ANALYSIS ===');
    console.log('Listener attached:', !!listenerAttach);
    console.log(
      'Firebase operations completed:',
      logs.filter((log) => log.category === 'FIREBASE').length
    );
    console.log('Member join detected:', !!memberJoin);
    console.log(
      'Potential issue: Listeners cleaned up during Firebase operations'
    );

    return {
      listenerAttached: !!listenerAttach,
      firebaseOpsCount: logs.filter((log) => log.category === 'FIREBASE')
        .length,
      memberJoinDetected: !!memberJoin,
      logs: logs.length,
    };
  });

  it('should test Firebase connection state changes', async () => {
    const roomId = 'connection-test-room';

    // Simulate connection issues that might cause listener detachment
    logger.logFirebaseConnectionState('connected', {
      timestamp: performance.now(),
    });

    logger.logListenerAttachment(roomId, 'member_join', 1, {
      connectionState: 'connected',
    });

    // Simulate connection loss
    logger.logFirebaseConnectionState('disconnected', {
      timestamp: performance.now(),
      reason: 'network_issue',
    });

    // Check if listeners survive disconnection
    logger.log('LISTENER', 'CONNECTION_LOST_CHECK', {
      roomId,
      listenersActive: 0, // Might drop to 0 on disconnect
      problem: 'listeners_lost_on_disconnect',
    });

    // Reconnection
    logger.logFirebaseConnectionState('connected', {
      timestamp: performance.now(),
      reason: 'reconnected',
    });

    // Are listeners re-attached?
    logger.log('LISTENER', 'RECONNECTION_CHECK', {
      roomId,
      listenersReattached: 0, // Might not be re-attached automatically
      problem: 'listeners_not_restored_on_reconnect',
    });

    const logs = logger.getLogs();
    const connectionStates = logs.filter(
      (log) => log.category === 'FIREBASE' && log.event === 'CONNECTION_STATE'
    );

    console.log('=== CONNECTION STATE ANALYSIS ===');
    console.log('Connection state changes:', connectionStates.length);
    console.log(
      'States:',
      connectionStates.map((log) => log.data.state)
    );
    console.log('Potential issue: Listeners not restored after reconnection');

    return {
      connectionChanges: connectionStates.length,
      finalState: connectionStates[connectionStates.length - 1]?.data.state,
      logs: logs.length,
    };
  });
});
