import { afterEach, describe, expect, it } from 'vitest';
import {
  clearLocalDraft,
  loadLocalDraft,
  saveLocalDraft,
} from '../local-drafts.js';

describe('messaging-next local drafts', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('scopes drafts by user and conversation', () => {
    saveLocalDraft('user-a', 'user-a_user-b', 'private draft');

    expect(loadLocalDraft('user-a', 'user-a_user-b')).toBe('private draft');
    expect(loadLocalDraft('user-b', 'user-a_user-b')).toBe('');
    expect(loadLocalDraft('user-a', 'user-a_user-c')).toBe('');
  });

  it('clears drafts by removing the local storage entry', () => {
    saveLocalDraft('user-a', 'user-a_user-b', 'private draft');

    clearLocalDraft('user-a', 'user-a_user-b');

    expect(loadLocalDraft('user-a', 'user-a_user-b')).toBe('');
    expect(localStorage.length).toBe(0);
  });
});
