/**
 * Diagnostic Logger for Incoming Call Reliability Testing
 * Provides comprehensive logging for all call events, listener management,
 * and Firebase operations to help diagnose incoming call issues.
 */

class DiagnosticLogger {
  constructor() {
    this.logs = [];
    this.isEnabled = true;
    this.maxLogs = 1000;
    this.sessionId = this.generateSessionId();
  }

  /**
   * Core logging method
   */
  log(category, event, data = {}) {
    if (!this.isEnabled) return;

    const logEntry = {
      timestamp: performance.now(),
      sessionId: this.sessionId,
      category,
      event,
      data: { ...data },
      id: this.generateLogId(),
    };

    this.logs.push(logEntry);

    // Maintain log size limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output for development
    if (
      typeof window !== 'undefined' &&
      window.location?.hostname === 'localhost'
    ) {
      console.log(`[DIAG] ${category}:${event}`, data);
    }
  }

  /**
   * Listener Management Logging
   */
  logListenerAttachment(roomId, listenerType, count, metadata = {}) {
    this.log('LISTENER', 'ATTACHED', {
      roomId,
      listenerType,
      currentCount: count,
      ...metadata,
    });
  }

  logListenerCleanup(removed, preserved, metadata = {}) {
    this.log('LISTENER', 'CLEANUP', {
      removedCount: removed.length,
      preservedCount: preserved.length,
      removedRoomIds: removed,
      preservedRoomIds: preserved,
      ...metadata,
    });
  }

  logDuplicateListener(roomId, listenerType, metadata = {}) {
    this.log('LISTENER', 'DUPLICATE_PREVENTED', {
      roomId,
      listenerType,
      ...metadata,
    });
  }

  /**
   * Incoming Call Event Logging
   */
  logIncomingCallEvent(callerId, roomId, freshnessResult, metadata = {}) {
    this.log('INCOMING_CALL', 'DETECTED', {
      callerId,
      roomId,
      isFresh: freshnessResult.isFresh,
      validationMethod: freshnessResult.method,
      age: freshnessResult.age,
      reason: freshnessResult.reason,
      ...metadata,
    });
  }

  logNotificationDecision(decision, reason, roomId, metadata = {}) {
    this.log('INCOMING_CALL', 'NOTIFICATION_DECISION', {
      decision, // 'SHOW' | 'REJECT'
      reason,
      roomId,
      ...metadata,
    });
  }

  logCallingUILifecycle(action, roomId, metadata = {}) {
    this.log('CALLING_UI', action, {
      roomId,
      ...metadata,
    });
  }

  /**
   * Firebase Operations Logging
   */
  logFirebaseOperation(operation, success, error = null, context = {}) {
    this.log('FIREBASE', 'OPERATION', {
      operation,
      success,
      error: error
        ? {
            message: error.message,
            code: error.code,
            stack: error.stack,
          }
        : null,
      ...context,
    });
  }

  logFirebaseConnectionState(state, metadata = {}) {
    this.log('FIREBASE', 'CONNECTION_STATE', {
      state,
      ...metadata,
    });
  }
  /**
   * Room and Call Flow Logging
   */
  logRoomCreation(roomId, isInitiator, timing, metadata = {}) {
    this.log('ROOM', 'CREATED', {
      roomId,
      isInitiator,
      creationTime: timing.creationTime,
      listenerAttachTime: timing.listenerAttachTime,
      timeDiff: timing.listenerAttachTime - timing.creationTime,
      ...metadata,
    });
  }

  logMemberJoinEvent(roomId, memberId, joinData, metadata = {}) {
    this.log('ROOM', 'MEMBER_JOINED', {
      roomId,
      memberId,
      joinedAt: joinData.joinedAt,
      role: joinData.role,
      ...metadata,
    });
  }

  logContactSave(contactId, roomId, metadata = {}) {
    this.log('CONTACT', 'SAVED', {
      contactId,
      roomId,
      ...metadata,
    });
  }

  logContactCall(contactId, roomId, forceInitiator, metadata = {}) {
    this.log('CONTACT', 'CALL_INITIATED', {
      contactId,
      roomId,
      forceInitiator,
      ...metadata,
    });
  }

  /**
   * Freshness Validation Logging
   */
  logFreshnessValidation(roomId, method, result, metadata = {}) {
    this.log('FRESHNESS', 'VALIDATION', {
      roomId,
      method, // 'joinedAt' | 'outgoingState' | 'roomCreatedAt'
      result: {
        isFresh: result.isFresh,
        age: result.age,
        threshold: result.threshold,
        reason: result.reason,
      },
      ...metadata,
    });
  }

  /**
   * Race Condition Detection
   */
  logRaceCondition(type, roomId, events, metadata = {}) {
    this.log('RACE_CONDITION', type, {
      roomId,
      events,
      ...metadata,
    });
  } /**

   * Query and Analysis Methods
   */
  getLogs(filters = {}) {
    let filteredLogs = [...this.logs];

    if (filters.category) {
      filteredLogs = filteredLogs.filter(
        (log) => log.category === filters.category
      );
    }

    if (filters.event) {
      filteredLogs = filteredLogs.filter((log) => log.event === filters.event);
    }

    if (filters.roomId) {
      filteredLogs = filteredLogs.filter(
        (log) => log.data.roomId === filters.roomId
      );
    }

    if (filters.since) {
      filteredLogs = filteredLogs.filter(
        (log) => log.timestamp >= filters.since
      );
    }

    if (filters.until) {
      filteredLogs = filteredLogs.filter(
        (log) => log.timestamp <= filters.until
      );
    }

    return filteredLogs;
  }

  getCallFlowTrace(roomId) {
    return this.getLogs({ roomId }).sort((a, b) => a.timestamp - b.timestamp);
  }

  getListenerDiagnostics(roomId = null) {
    const listenerLogs = this.getLogs({ category: 'LISTENER' });

    if (roomId) {
      return listenerLogs.filter((log) => log.data.roomId === roomId);
    }

    return listenerLogs;
  }

  getFailureAnalysis() {
    const failures = this.logs.filter(
      (log) =>
        (log.category === 'FIREBASE' && log.data.success === false) ||
        (log.category === 'INCOMING_CALL' && log.data.decision === 'REJECT') ||
        (log.category === 'LISTENER' && log.event === 'DUPLICATE_PREVENTED')
    );

    return {
      totalFailures: failures.length,
      firebaseFailures: failures.filter((log) => log.category === 'FIREBASE')
        .length,
      rejectedCalls: failures.filter(
        (log) =>
          log.category === 'INCOMING_CALL' && log.data.decision === 'REJECT'
      ).length,
      duplicateListeners: failures.filter(
        (log) => log.event === 'DUPLICATE_PREVENTED'
      ).length,
      failures,
    };
  }

  /**
   * Export and Utility Methods
   */
  exportDiagnostics() {
    return {
      sessionId: this.sessionId,
      exportTime: Date.now(),
      logCount: this.logs.length,
      logs: [...this.logs],
      summary: this.getFailureAnalysis(),
    };
  }

  /**
   * Export logs as JSON string for E2E testing
   */
  exportLogsAsJSON() {
    return JSON.stringify(this.exportDiagnostics(), null, 2);
  }

  /**
   * Export logs as downloadable file
   */
  downloadLogs(filename = null) {
    if (!filename) {
      filename = `diagnostic-logs-${this.sessionId}-${Date.now()}.json`;
    }

    const dataStr = this.exportLogsAsJSON();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  }

  /**
   * Get logs for specific time range (for E2E testing)
   */
  getLogsInTimeRange(startTime, endTime) {
    return this.logs.filter(
      (log) => log.timestamp >= startTime && log.timestamp <= endTime
    );
  }

  /**
   * Get logs since a specific timestamp
   */
  getLogsSince(timestamp) {
    return this.logs.filter((log) => log.timestamp >= timestamp);
  }

  /**
   * Clear logs older than specified time
   */
  clearOldLogs(olderThanMs = 24 * 60 * 60 * 1000) {
    // 24 hours default
    const cutoff = Date.now() - olderThanMs;
    this.logs = this.logs.filter((log) => log.timestamp >= cutoff);
  }

  clearLogs() {
    this.logs = [];
  }

  /**
   * Persist logs to localStorage for cross-reload debugging
   */
  persistLogs() {
    try {
      const persistKey = `diagnostic-logs-${this.sessionId}`;
      localStorage.setItem(persistKey, this.exportLogsAsJSON());
      return persistKey;
    } catch (e) {
      console.warn('Failed to persist logs to localStorage:', e);
      return null;
    }
  }

  /**
   * Load persisted logs from localStorage
   */
  loadPersistedLogs(persistKey) {
    try {
      const data = localStorage.getItem(persistKey);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.logs && Array.isArray(parsed.logs)) {
          // Merge with existing logs, avoiding duplicates
          const existingIds = new Set(this.logs.map((log) => log.id));
          const newLogs = parsed.logs.filter((log) => !existingIds.has(log.id));
          this.logs = [...this.logs, ...newLogs].sort(
            (a, b) => a.timestamp - b.timestamp
          );
          return newLogs.length;
        }
      }
      return 0;
    } catch (e) {
      console.warn('Failed to load persisted logs:', e);
      return 0;
    }
  }

  /**
   * Get all persisted log keys from localStorage
   */
  static getPersistedLogKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('diagnostic-logs-')) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Clean up old persisted logs
   */
  static cleanupPersistedLogs(olderThanMs = 24 * 60 * 60 * 1000) {
    const cutoff = Date.now() - olderThanMs;
    const keys = DiagnosticLogger.getPersistedLogKeys();

    keys.forEach((key) => {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed.exportTime && parsed.exportTime < cutoff) {
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        // Remove corrupted entries
        localStorage.removeItem(key);
      }
    });
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  /**
   * Utility Methods
   */
  generateSessionId() {
    return `session_${performance.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  generateLogId() {
    return `log_${performance.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  formatTimestamp(timestamp) {
    return new Date(timestamp).toISOString();
  }

  /**
   * Performance Timing Helpers
   */
  startTiming(operation) {
    const timingId = `timing_${operation}_${Date.now()}`;
    this.log('TIMING', 'START', { operation, timingId });
    return timingId;
  }

  endTiming(timingId, metadata = {}) {
    const startLog = this.logs.find(
      (log) =>
        log.category === 'TIMING' &&
        log.event === 'START' &&
        log.data.timingId === timingId
    );

    if (startLog) {
      const duration = Date.now() - startLog.timestamp;
      this.log('TIMING', 'END', {
        timingId,
        duration,
        operation: startLog.data.operation,
        ...metadata,
      });
      return duration;
    }
    return null;
  }
}

// Singleton instance
let diagnosticLogger = null;

export function getDiagnosticLogger() {
  if (!diagnosticLogger) {
    diagnosticLogger = new DiagnosticLogger();
  }
  return diagnosticLogger;
}

export function createDiagnosticLogger() {
  return new DiagnosticLogger();
}

// Convenience exports
export { DiagnosticLogger };

// Browser console commands for E2E testing and debugging
if (typeof window !== 'undefined') {
  // Make diagnostic logger available globally for console access
  window.diagnosticLogger = {
    // Get the current logger instance
    getInstance: () => getDiagnosticLogger(),

    // Export logs as JSON string
    exportLogs: () => {
      const logger = getDiagnosticLogger();
      const json = logger.exportLogsAsJSON();
      console.log('Diagnostic logs exported:');
      console.log(json);
      return json;
    },

    // Download logs as file
    downloadLogs: (filename) => {
      const logger = getDiagnosticLogger();
      logger.downloadLogs(filename);
      console.log('Diagnostic logs downloaded');
    },

    // Get logs for specific room
    getRoomLogs: (roomId) => {
      const logger = getDiagnosticLogger();
      const logs = logger.getCallFlowTrace(roomId);
      console.log(`Logs for room ${roomId}:`, logs);
      return logs;
    },

    // Get failure analysis
    getFailures: () => {
      const logger = getDiagnosticLogger();
      const analysis = logger.getFailureAnalysis();
      console.log('Failure analysis:', analysis);
      return analysis;
    },

    // Get listener diagnostics
    getListenerDiagnostics: (roomId) => {
      const logger = getDiagnosticLogger();
      const diagnostics = logger.getListenerDiagnostics(roomId);
      console.log('Listener diagnostics:', diagnostics);
      return diagnostics;
    },

    // Get logs since timestamp
    getLogsSince: (timestamp) => {
      const logger = getDiagnosticLogger();
      const logs = logger.getLogsSince(timestamp);
      console.log(`Logs since ${new Date(timestamp).toISOString()}:`, logs);
      return logs;
    },

    // Get logs in time range
    getLogsInRange: (startTime, endTime) => {
      const logger = getDiagnosticLogger();
      const logs = logger.getLogsInTimeRange(startTime, endTime);
      console.log(
        `Logs from ${new Date(startTime).toISOString()} to ${new Date(
          endTime
        ).toISOString()}:`,
        logs
      );
      return logs;
    },

    // Persist logs to localStorage
    persistLogs: () => {
      const logger = getDiagnosticLogger();
      const key = logger.persistLogs();
      console.log(`Logs persisted with key: ${key}`);
      return key;
    },

    // Load persisted logs
    loadPersistedLogs: (key) => {
      const logger = getDiagnosticLogger();
      const count = logger.loadPersistedLogs(key);
      console.log(`Loaded ${count} persisted logs`);
      return count;
    },

    // Get all persisted log keys
    getPersistedKeys: () => {
      const keys = DiagnosticLogger.getPersistedLogKeys();
      console.log('Persisted log keys:', keys);
      return keys;
    },

    // Clear current logs
    clearLogs: () => {
      const logger = getDiagnosticLogger();
      logger.clearLogs();
      console.log('Diagnostic logs cleared');
    },

    // Enable/disable logging
    enable: () => {
      const logger = getDiagnosticLogger();
      logger.enable();
      console.log('Diagnostic logging enabled');
    },

    disable: () => {
      const logger = getDiagnosticLogger();
      logger.disable();
      console.log('Diagnostic logging disabled');
    },

    // Get current session info
    getSessionInfo: () => {
      const logger = getDiagnosticLogger();
      const info = {
        sessionId: logger.sessionId,
        logCount: logger.logs.length,
        isEnabled: logger.isEnabled,
        maxLogs: logger.maxLogs,
      };
      console.log('Session info:', info);
      return info;
    },

    // Help command
    help: () => {
      console.log(`
Diagnostic Logger Console Commands:
==================================

Basic Commands:
- diagnosticLogger.exportLogs()           - Export all logs as JSON
- diagnosticLogger.downloadLogs()         - Download logs as file
- diagnosticLogger.clearLogs()            - Clear current logs
- diagnosticLogger.getSessionInfo()       - Get session information

Filtering Commands:
- diagnosticLogger.getRoomLogs(roomId)    - Get logs for specific room
- diagnosticLogger.getLogsSince(timestamp) - Get logs since timestamp
- diagnosticLogger.getLogsInRange(start, end) - Get logs in time range

Analysis Commands:
- diagnosticLogger.getFailures()          - Get failure analysis
- diagnosticLogger.getListenerDiagnostics() - Get listener diagnostics

Persistence Commands:
- diagnosticLogger.persistLogs()          - Save logs to localStorage
- diagnosticLogger.loadPersistedLogs(key) - Load persisted logs
- diagnosticLogger.getPersistedKeys()     - List persisted log keys

Control Commands:
- diagnosticLogger.enable()               - Enable logging
- diagnosticLogger.disable()              - Disable logging
- diagnosticLogger.help()                 - Show this help

Example Usage:
- diagnosticLogger.exportLogs()
- diagnosticLogger.getRoomLogs('abc123')
- diagnosticLogger.getLogsSince(Date.now() - 60000) // Last minute
      `);
    },
  };

  // Auto-persist logs on page unload for debugging
  window.addEventListener('beforeunload', () => {
    try {
      const logger = getDiagnosticLogger();
      if (logger.logs.length > 0) {
        logger.persistLogs();
      }
      // Clean up old persisted logs
      DiagnosticLogger.cleanupPersistedLogs();
    } catch (e) {
      // Ignore errors during unload
    }
  });

  // Auto-load persisted logs on page load if in development
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    setTimeout(() => {
      try {
        const keys = DiagnosticLogger.getPersistedLogKeys();
        if (keys.length > 0) {
          console.log(
            `Found ${keys.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`
          );
          console.log('Available keys:', keys);
        }
      } catch (e) {
        // Ignore errors
      }
    }, 1000);
  }
}
