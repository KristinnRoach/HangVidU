/**
 * Shared Testing Utilities
 * Common helper functions for incoming call reliability tests
 */

import { createFirebaseMock } from './firebase-mock.js';
import { createCallFlowSimulator } from './call-simulator.js';
import { getDiagnosticLogger } from '../../src/utils/diagnostic-logger.js';
import {
  TEST_USERS,
  TEST_ROOMS,
  createTestUser,
  createTestRoom,
} from '../fixtures/user-scenarios.js';

/**
 * Test Setup Helpers
 */
export function setupTestEnvironment() {
  const firebaseMock = createFirebaseMock();
  const callSimulator = createCallFlowSimulator(firebaseMock);
  const logger = getDiagnosticLogger();

  // Clear any existing logs
  logger.clearLogs();

  return {
    firebaseMock,
    callSimulator,
    logger,
  };
}

export function teardownTestEnvironment(testEnv) {
  testEnv.firebaseMock.reset();
  testEnv.callSimulator.reset();
  testEnv.logger.clearLogs();
}

/**
 * User and Room Setup
 */
export function setupTestUsers(testEnv, userCount = 2) {
  const users = [];
  const userKeys = Object.keys(TEST_USERS);

  for (let i = 0; i < Math.min(userCount, userKeys.length); i++) {
    const userData = TEST_USERS[userKeys[i]];
    const user = testEnv.callSimulator.createUser(userData.uid, userData);
    users.push(user);
  }

  return users;
}

export function setupTestRoom(testEnv, roomData = null) {
  const room = roomData || createTestRoom();
  return room;
}

/**
 * Call Flow Test Helpers
 */
export async function executeInitialCallFlow(testEnv, userA, userB, roomId) {
  const result = await testEnv.callSimulator.simulateInitialCall(
    userA.uid,
    userB.uid,
    roomId
  );

  // Simulate successful call completion
  await testEnv.callSimulator.simulateHangup(roomId, userA.uid);

  return result;
}

export async function executeContactSaveFlow(testEnv, userA, userB, roomId) {
  // Both users save each other as contacts
  const contactA = await testEnv.callSimulator.simulateContactSave(
    userA.uid,
    userB.uid,
    roomId
  );

  const contactB = await testEnv.callSimulator.simulateContactSave(
    userB.uid,
    userA.uid,
    roomId
  );

  return { contactA, contactB };
}

export async function executeContactCallFlow(testEnv, caller, callee, roomId) {
  const callResult = await testEnv.callSimulator.simulateContactCall(
    caller.uid,
    callee.uid,
    roomId
  );

  return callResult;
}
/**
 * Assertion Helpers
 */
export function assertCallFlowSuccess(callResult, expectedParticipants) {
  if (!callResult || !callResult.roomId) {
    throw new Error('Call result is missing or invalid');
  }

  if (expectedParticipants && callResult.participants) {
    const hasAllParticipants = expectedParticipants.every((uid) =>
      callResult.participants.includes(uid)
    );

    if (!hasAllParticipants) {
      throw new Error(
        `Expected participants ${expectedParticipants.join(
          ', '
        )} but got ${callResult.participants.join(', ')}`
      );
    }
  }

  return true;
}

export function assertListenerState(testEnv, roomId, expectedCount) {
  const actualCount = testEnv.firebaseMock.getListenerCount(roomId);

  if (actualCount !== expectedCount) {
    throw new Error(
      `Expected ${expectedCount} listeners for room ${roomId}, but found ${actualCount}`
    );
  }

  return true;
}

export function assertIncomingCallDetected(testEnv, roomId, callerId) {
  const logs = testEnv.logger.getLogs({
    category: 'INCOMING_CALL',
    event: 'DETECTED',
  });

  const callDetected = logs.some(
    (log) => log.data.roomId === roomId && log.data.callerId === callerId
  );

  if (!callDetected) {
    throw new Error(
      `Incoming call from ${callerId} in room ${roomId} was not detected`
    );
  }

  return true;
}

export function assertCallRejected(testEnv, roomId, expectedReason) {
  const logs = testEnv.logger.getLogs({
    category: 'INCOMING_CALL',
    event: 'NOTIFICATION_DECISION',
  });

  const rejection = logs.find(
    (log) => log.data.roomId === roomId && log.data.decision === 'REJECT'
  );

  if (!rejection) {
    throw new Error(
      `Expected call rejection for room ${roomId} but none found`
    );
  }

  if (expectedReason && rejection.data.reason !== expectedReason) {
    throw new Error(
      `Expected rejection reason '${expectedReason}' but got '${rejection.data.reason}'`
    );
  }

  return true;
}

/**
 * Timing and Performance Helpers
 */
export function measureCallLatency(testEnv, roomId) {
  const events = testEnv.callSimulator.getCallEvents({ roomId });

  const callStart = events.find((e) => e.type === 'CONTACT_CALL_START');
  const callDetected = events.find((e) => e.type === 'INCOMING_CALL_DETECTED');

  if (!callStart || !callDetected) {
    return null;
  }

  return callDetected.timestamp - callStart.timestamp;
}

export function analyzeRaceConditions(testEnv, roomId) {
  const logs = testEnv.logger.getLogs({ roomId });

  const roomCreation = logs.find(
    (log) => log.category === 'ROOM' && log.event === 'CREATED'
  );

  const listenerAttach = logs.find(
    (log) => log.category === 'LISTENER' && log.event === 'ATTACHED'
  );

  if (!roomCreation || !listenerAttach) {
    return null;
  }

  return {
    roomCreatedAt: roomCreation.timestamp,
    listenerAttachedAt: listenerAttach.timestamp,
    timeDiff: listenerAttach.timestamp - roomCreation.timestamp,
    hasRaceCondition: listenerAttach.timestamp > roomCreation.timestamp,
  };
}
/**
 * Failure Scenario Helpers
 */
export async function simulateCallingUIBug(testEnv, caller, callee, roomId) {
  // Simulate the specific bug scenario
  const result = await testEnv.callSimulator.simulateCallingUIDisappearance(
    roomId,
    caller.uid,
    callee.uid
  );

  return result;
}

export async function simulateNetworkIssues(testEnv, durationMs = 2000) {
  testEnv.firebaseMock.simulateConnectionLoss();

  await new Promise((resolve) => setTimeout(resolve, durationMs));

  testEnv.firebaseMock.simulateReconnection();

  return {
    disconnectionDuration: durationMs,
    connectionState: testEnv.firebaseMock.getConnectionState(),
  };
}

export async function simulatePageReload(testEnv, userId) {
  const result = await testEnv.callSimulator.simulatePageReload(userId);
  return result;
}

/**
 * Diagnostic and Analysis Helpers
 */
export function generateTestReport(testEnv, testName) {
  const diagnostics = testEnv.logger.exportDiagnostics();
  const firebaseHistory = testEnv.firebaseMock.getEventHistory();
  const callEvents = testEnv.callSimulator.getCallEvents();

  return {
    testName,
    timestamp: Date.now(),
    diagnostics,
    firebaseHistory,
    callEvents,
    summary: {
      totalLogs: diagnostics.logCount,
      totalFirebaseEvents: firebaseHistory.length,
      totalCallEvents: callEvents.length,
      failures: diagnostics.summary.totalFailures,
    },
  };
}

export function analyzeListenerBehavior(testEnv, roomId) {
  const listenerLogs = testEnv.logger.getListenerDiagnostics(roomId);

  const attachments = listenerLogs.filter((log) => log.event === 'ATTACHED');
  const cleanups = listenerLogs.filter((log) => log.event === 'CLEANUP');
  const duplicates = listenerLogs.filter(
    (log) => log.event === 'DUPLICATE_PREVENTED'
  );

  return {
    roomId,
    totalAttachments: attachments.length,
    totalCleanups: cleanups.length,
    duplicateAttempts: duplicates.length,
    attachmentHistory: attachments,
    cleanupHistory: cleanups,
    duplicateHistory: duplicates,
  };
}

export function validateFreshnessLogic(testEnv, roomId, expectedFreshness) {
  const freshnessLogs = testEnv.logger.getLogs({
    category: 'FRESHNESS',
    event: 'VALIDATION',
  });

  const roomFreshnessLogs = freshnessLogs.filter(
    (log) => log.data.roomId === roomId
  );

  return roomFreshnessLogs.map((log) => ({
    method: log.data.method,
    isFresh: log.data.result.isFresh,
    age: log.data.result.age,
    reason: log.data.result.reason,
    matchesExpected: log.data.result.isFresh === expectedFreshness,
  }));
}

/**
 * Wait and Timing Utilities
 */
export function waitForEvent(testEnv, eventType, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkForEvent = () => {
      const events = testEnv.callSimulator.getCallEvents({ eventType });

      if (events.length > 0) {
        resolve(events[events.length - 1]);
        return;
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for event: ${eventType}`));
        return;
      }

      setTimeout(checkForEvent, 100);
    };

    checkForEvent();
  });
}

export function waitForLog(testEnv, category, event, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkForLog = () => {
      const logs = testEnv.logger.getLogs({ category, event });

      if (logs.length > 0) {
        resolve(logs[logs.length - 1]);
        return;
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for log: ${category}:${event}`));
        return;
      }

      setTimeout(checkForLog, 100);
    };

    checkForLog();
  });
}
