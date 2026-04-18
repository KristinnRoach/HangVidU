import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { setLocale, useI18n } from './index.js';

function TestLabel() {
  const { t } = useI18n();
  return <p>{t('shared.save')}</p>;
}

describe('shared i18n', () => {
  beforeEach(async () => {
    localStorage.clear();
    await setLocale('en');
  });

  afterEach(() => {
    cleanup();
  });

  it('rerenders Solid components when locale changes', async () => {
    const { getByText } = render(() => <TestLabel />);

    getByText('Save');

    await setLocale('is');

    await waitFor(() => {
      expect(getByText('Vista')).toBeTruthy();
    });
  });
});
