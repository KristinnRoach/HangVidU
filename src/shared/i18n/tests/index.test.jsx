import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { setLocale, useI18n } from '../index.js';

function TestLabel() {
  const { t } = useI18n();
  return <p>{t('shared.save')}</p>;
}

describe('shared i18n', () => {
  beforeEach(() => {
    localStorage.clear();
    setLocale('en');
  });

  afterEach(() => {
    cleanup();
  });

  it('renders translated strings synchronously on first render', () => {
    const { getByText, queryByText } = render(() => <TestLabel />);
    getByText('Save');
    expect(queryByText('shared.save')).toBeNull();
  });

  it('rerenders Solid components when locale changes', async () => {
    const { getByText } = render(() => <TestLabel />);

    getByText('Save');

    setLocale('is');

    await waitFor(() => {
      expect(getByText('Vista')).toBeTruthy();
    });
  });
});
