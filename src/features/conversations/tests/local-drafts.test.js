import { afterEach, describe, expect, it } from 'vitest';
import {
  clearLocalDraft,
  loadLocalDraft,
  saveLocalDraft,
} from '../local-drafts.js';

describe('conversations local drafts', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('scopes drafts by user and conversation', () => {
    saveLocalDraft('user-a', 'conversation-1', 'private draft');

    expect(loadLocalDraft('user-a', 'conversation-1')).toBe('private draft');
    expect(loadLocalDraft('user-b', 'conversation-1')).toBe('');
    expect(loadLocalDraft('user-a', 'conversation-2')).toBe('');
  });

  it('clears drafts by removing the local storage entry', () => {
    saveLocalDraft('user-a', 'conversation-1', 'private draft');

    clearLocalDraft('user-a', 'conversation-1');

    expect(loadLocalDraft('user-a', 'conversation-1')).toBe('');
    expect(localStorage.length).toBe(0);
  });
});
