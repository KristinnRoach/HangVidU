import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { initI18n, setLocale, useI18n } from '../index.js';

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

  it('initializes before first render so keys are not shown', async () => {
    await initI18n();

    const { getByText, queryByText } = render(() => <TestLabel />);

    getByText('Save');
    expect(queryByText('shared.save')).toBeNull();
  });
});
