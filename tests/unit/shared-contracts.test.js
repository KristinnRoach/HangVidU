import { describe, expect, it } from 'vite-plus/test';
import { isMailboxEnvelope } from '../../shared/user-mailbox/protocol';
import { convertToEnglishLetters } from '../../shared/utils/transliteration';

describe('shared contracts', () => {
  it('folds decomposed accents like precomposed accents', () => {
    expect(convertToEnglishLetters('a\u0301o\u0308')).toBe('ao');
    expect(convertToEnglishLetters('áö')).toBe('ao');
  });

  it('rejects contact request envelopes with malformed fromName', () => {
    expect(
      isMailboxEnvelope({
        t: 'contact_request',
        fromId: 'alice',
        fromName: 42,
        createdAt: 1,
      }),
    ).toBe(false);
  });
});
