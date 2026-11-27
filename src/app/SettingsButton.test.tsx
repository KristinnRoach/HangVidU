import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test';
import { getLocale, setLocale } from '@shared/i18n';
import SettingsButton from './SettingsButton';

describe('SettingsButton', () => {
  beforeEach(() => {
    setLocale('en');
    localStorage.clear();
  });
  afterEach(cleanup);

  it('changes and persists the language from the settings dialog', async () => {
    render(() => <SettingsButton />);
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    const dialog = await screen.findByRole('dialog', { name: 'Settings' });
    const group = screen.getByRole('group', { name: 'Language' });
    expect(dialog.contains(group)).toBe(true);
    expect(screen.getByRole('radio', { name: 'English' })).toHaveProperty(
      'checked',
      true,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Íslenska' }));

    expect(getLocale()).toBe('is');
    expect(localStorage.getItem('locale')).toBe('is');
    await screen.findByRole('dialog', { name: 'Stillingar' });
    expect(screen.getByRole('radio', { name: 'Íslenska' })).toHaveProperty(
      'checked',
      true,
    );

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole('button', { name: 'Stillingar' }),
      ),
    );
  });
});
