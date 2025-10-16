// tests/e2e/session-restoration-states.spec.js - Test restoration for different connection states

import { test, expect } from '@playwright/test';
import {
  mockFirebaseForTesting,
  mockMediaDevices,
  waitForAppReady,
} from '../helpers/test-utils.js';

test.describe('Session Restoration States', () => {
  test('should restore session when connectionState is "connecting"', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    // Inject session data with "connecting" state
    await page.addInitScript(() => {
      const connectingSession = {
        roomId: 'test-room-connecting',
        isInitiator: false,
        connectionState: 'connecting', // Key test: connecting state
        wasConnected: false, // This would fail with old logic
        timestamp: Date.now(),
        lastActivity: Date.now() - 1000, // Recent activity
      };
      localStorage.setItem(
        'hangvidu_session',
        JSON.stringify(connectingSession)
      );
    });

    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('restoration') ||
        msg.text().includes('Session')
      ) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await waitForAppReady(page);

    // Wait for restoration process
    await page.waitForTimeout(3000);

    console.log('Restoration logs:', logs);

    // Should attempt restoration (not show "Session was idle")
    const hasIdleLog = logs.some((log) => log.includes('Session was idle'));
    expect(hasIdleLog).toBe(false);

    // Should show reconnecting status
    await expect(page.locator('#status')).toContainText(/reconnect|connect/i, {
      timeout: 5000,
    });
  });

  test('should restore session when connectionState is "reconnecting"', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.addInitScript(() => {
      const reconnectingSession = {
        roomId: 'test-room-reconnecting',
        isInitiator: true,
        connectionState: 'reconnecting', // Key test: reconnecting state
        wasConnected: true,
        timestamp: Date.now(),
        lastActivity: Date.now() - 500,
      };
      localStorage.setItem(
        'hangvidu_session',
        JSON.stringify(reconnectingSession)
      );
    });

    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('restoration') ||
        msg.text().includes('Session')
      ) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await waitForAppReady(page);
    await page.waitForTimeout(3000);

    console.log('Reconnecting restoration logs:', logs);

    // Should attempt restoration
    const hasIdleLog = logs.some((log) => log.includes('Session was idle'));
    expect(hasIdleLog).toBe(false);
  });

  test('should restore session when connectionState is "disconnected"', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.addInitScript(() => {
      const disconnectedSession = {
        roomId: 'test-room-disconnected',
        isInitiator: false,
        connectionState: 'disconnected', // Key test: disconnected state
        wasConnected: true,
        timestamp: Date.now(),
        lastActivity: Date.now() - 2000,
      };
      localStorage.setItem(
        'hangvidu_session',
        JSON.stringify(disconnectedSession)
      );
    });

    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('restoration') ||
        msg.text().includes('Session')
      ) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await waitForAppReady(page);
    await page.waitForTimeout(3000);

    console.log('Disconnected restoration logs:', logs);

    // Should attempt restoration
    const hasIdleLog = logs.some((log) => log.includes('Session was idle'));
    expect(hasIdleLog).toBe(false);
  });

  test('should NOT restore session when connectionState is "idle"', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.addInitScript(() => {
      const idleSession = {
        roomId: 'test-room-idle',
        isInitiator: false,
        connectionState: 'idle', // Key test: idle state should not restore
        wasConnected: false,
        timestamp: Date.now(),
        lastActivity: Date.now() - 1000,
      };
      localStorage.setItem('hangvidu_session', JSON.stringify(idleSession));
    });

    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('restoration') ||
        msg.text().includes('Session') ||
        msg.text().includes('idle')
      ) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await waitForAppReady(page);
    await page.waitForTimeout(3000);

    console.log('Idle restoration logs:', logs);

    // Should NOT attempt restoration - should log "Session was idle"
    const hasIdleLog = logs.some((log) => log.includes('Session was idle'));
    expect(hasIdleLog).toBe(true);

    // Should be in normal ready state
    await expect(page.locator('#status')).toContainText(
      /ready.*click|start.*chat/i,
      { timeout: 5000 }
    );
    await expect(page.locator('#startChat')).toBeEnabled();
  });

  test('should restore session when connectionState is "connected" (backward compatibility)', async ({
    page,
  }) => {
    await mockFirebaseForTesting(page);
    await mockMediaDevices(page);

    await page.addInitScript(() => {
      const connectedSession = {
        roomId: 'test-room-connected',
        isInitiator: true,
        connectionState: 'connected', // Should still work
        wasConnected: true,
        timestamp: Date.now(),
        lastActivity: Date.now() - 500,
      };
      localStorage.setItem(
        'hangvidu_session',
        JSON.stringify(connectedSession)
      );
    });

    const logs = [];
    page.on('console', (msg) => {
      if (
        msg.text().includes('restoration') ||
        msg.text().includes('Session')
      ) {
        logs.push(msg.text());
      }
    });

    await page.goto('/');
    await waitForAppReady(page);
    await page.waitForTimeout(3000);

    console.log('Connected restoration logs:', logs);

    // Should attempt restoration (backward compatibility)
    const hasIdleLog = logs.some((log) => log.includes('Session was idle'));
    expect(hasIdleLog).toBe(false);
  });
});
