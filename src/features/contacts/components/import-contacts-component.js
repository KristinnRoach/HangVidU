import { escapeHtml } from '@shared/utils/ui-utils/dom-utils.js';
import { t } from '@shared/i18n/index.js';

import './import-contacts-component.css';

export function createImportContactsComponent({
  onPlatformSelect,
  onSearchChange,
  onInviteContact,
  onInviteSelected,
  onEmailSelected,
}) {
  const googleImportLabel = t('contact.import.google');
  const searchLabel = t('contact.search');
  const importDisclosure = t('contact.disclosure.import');
  const gmailDisclosure = t('contact.disclosure.gmail_send');
  const element = document.createElement('div');
  element.innerHTML = `
    <div class="import-section">
      <div class="platform-selector">

        <button id="import-google-contacts-btn" type="button" class="platform-btn" data-platform="google">
        <!--  <span>${escapeHtml(googleImportLabel)}</span> -->
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>

        <!--
        <button disabled type="button" class="platform-btn" data-platform="facebook" title="${t('contact.import.facebook')}" disabled>
          <i data-lucide="monitor"></i>
        </button>
        -->
        <!-- Future platform buttons go here-->

      </div>
    </div>

    <div id="import-results-section" class="import-results-section" hidden>
      <div class="search-section">
        <input
          type="text"
          id="contact-search-input"
          class="contact-search-input"
        />
      </div>

      <!--
      <p class="disclosure-note">
        ${escapeHtml(importDisclosure)}
      </p>
      -->

      <div id="contacts-container" class="contacts-container-modal"></div>

      <div id="import-status" class="import-status" role="status" aria-live="polite"></div>

      <div id="bulk-actions-container" class="bulk-actions-container"></div>
    </div>
  `;

  const importResultsSection = element.querySelector('#import-results-section');
  const googlePlatformBtn = element.querySelector('[data-platform="google"]');
  const searchInput = element.querySelector('#contact-search-input');
  const importStatus = element.querySelector('#import-status');
  const contactsContainer = element.querySelector('#contacts-container');
  const bulkActionsContainer = element.querySelector('#bulk-actions-container');
  const platformBtns = element.querySelectorAll('.platform-btn');

  const selectedContacts = new Set();
  let visibleContacts = [];
  let isPlatformLoading = false;

  googlePlatformBtn?.setAttribute('title', googleImportLabel);
  googlePlatformBtn?.setAttribute('aria-label', googleImportLabel);
  searchInput?.setAttribute('placeholder', searchLabel);
  searchInput?.setAttribute('aria-label', searchLabel);

  platformBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (btn.disabled || isPlatformLoading) return;
      const platform = btn.getAttribute('data-platform');
      isPlatformLoading = true;
      platformBtns.forEach((platformBtn) => {
        platformBtn.disabled = true;
      });
      setActivePlatform(platform);
      try {
        await onPlatformSelect(platform);
      } catch (error) {
        console.error('[ImportContacts] Platform select error:', error);
        setActivePlatform(null);
        setStatus(t('contact.import.error', { error: error.message }), 'error');
      } finally {
        isPlatformLoading = false;
        platformBtns.forEach((platformBtn) => {
          platformBtn.disabled = false;
        });
      }
    });
  });

  searchInput.addEventListener('input', () => {
    onSearchChange(searchInput.value);
  });

  function setActivePlatform(platform) {
    platformBtns.forEach((btn) => {
      const isActive = btn.getAttribute('data-platform') === platform;
      btn.classList.toggle('active', isActive);
    });
  }

  function setStatus(message, statusClass = '') {
    importStatus.textContent = message;
    importStatus.className = ['import-status', statusClass]
      .filter(Boolean)
      .join(' ');
  }

  function reset() {
    importResultsSection.hidden = true;
    searchInput.value = '';
    contactsContainer.innerHTML = '';
    bulkActionsContainer.innerHTML = '';
    setStatus('');
    visibleContacts = [];
    selectedContacts.clear();
    platformBtns.forEach((btn) => btn.classList.remove('active'));
  }

  function prepareForImport() {
    importResultsSection.hidden = false;
    searchInput.value = '';
    contactsContainer.innerHTML = '';
    bulkActionsContainer.innerHTML = '';
    visibleContacts = [];
    selectedContacts.clear();
  }

  function renderContacts(contacts) {
    visibleContacts = contacts;
    renderImportResults();
  }

  function renderEmptyState(message = t('contact.import.none')) {
    contactsContainer.innerHTML = `<p class="empty-state">${escapeHtml(message)}</p>`;
    bulkActionsContainer.innerHTML = '';
  }

  function renderImportResults() {
    contactsContainer.innerHTML = '';

    if (visibleContacts.length === 0) {
      renderEmptyState();
      return;
    }

    const header = document.createElement('div');
    header.className = 'results-header';
    header.innerHTML = `
      <label class="select-all-label">
        <input type="checkbox" id="select-all-checkbox" />
        <span>${t('contact.select_all', { count: visibleContacts.length })}</span>
      </label>
    `;
    contactsContainer.appendChild(header);

    const listContainer = document.createElement('div');
    listContainer.className = 'contacts-scroll-list';

    const list = document.createElement('ul');
    list.className = 'contact-list';
    const visibleContactsByEmail = new Map(
      visibleContacts.map((contact) => [contact.email, contact]),
    );

    for (const contact of visibleContacts) {
      const { name, email, user, isAlreadySaved, inviteStatus } = contact;
      const isAlreadyInvited = inviteStatus === 'already_invited';
      const isSentInvite = inviteStatus === 'sent';

      const li = document.createElement('li');
      li.className = 'contact-item';

      let statusBadge = '';
      let actionButton = '';

      if (isAlreadySaved) {
        statusBadge = `<span class="status-badge saved">✓ ${t('contact.status.saved')}</span>`;
      } else if (user && (isAlreadyInvited || isSentInvite)) {
        const inviteLabel = isAlreadyInvited
          ? t('contact.add.already_invited')
          : `✓ ${t('contact.invite.sent_one')}`;
        actionButton = `
          <button type="button" class="invite-btn${isSentInvite ? ' sent' : ''}" disabled>
            ${escapeHtml(inviteLabel)}
          </button>
        `;
        statusBadge = `<span class="status-badge on-app">${t('contact.status.on_app')}</span>`;
      } else if (user) {
        statusBadge = `<span class="status-badge on-app">${t('contact.status.on_app')}</span>`;
        actionButton = `
          <button type="button" class="invite-btn" data-uid="${escapeHtml(user.uid)}" data-name="${escapeHtml(user.displayName)}">
            ${t('contact.invite')}
          </button>
        `;
      } else {
        statusBadge = `<span class="status-badge not-on-app">${t('contact.status.not_on_app')}</span>`;
      }

      li.innerHTML = `
          <span style="display: flex; align-items: center; gap: 0.75rem; width: 100%;">
            <input type="checkbox" class="contact-checkbox" data-email="${escapeHtml(email)}" ${isAlreadySaved || isAlreadyInvited || isSentInvite ? 'disabled' : ''} />
            <span class="contact-info">
              <strong class="contact-name">${escapeHtml(name)}</strong>
              <small class="contact-email">${escapeHtml(email)}</small>
            </span>
          </span>
          ${statusBadge}
          ${actionButton}
      `;

      const inviteBtn = li.querySelector('.invite-btn');
      const checkbox = li.querySelector('.contact-checkbox');

      if (user && !isAlreadySaved && !isAlreadyInvited && !isSentInvite) {
        inviteBtn.addEventListener('click', async () => {
          inviteBtn.disabled = true;
          inviteBtn.textContent = t('shared.sending');

          try {
            const result = await onInviteContact(contact);
            if (result.status === 'already_invited') {
              contact.inviteStatus = 'already_invited';
              if (checkbox) {
                checkbox.checked = false;
                checkbox.disabled = true;
              }
              selectedContacts.delete(contact);
              inviteBtn.textContent = t('contact.add.already_invited');
              syncSelectAllCheckbox(
                list,
                selectAllCheckbox,
                visibleContactsByEmail,
              );
              updateActionButtons();
              return;
            }

            if (result.status !== 'sent') {
              inviteBtn.textContent = t('shared.error');
              inviteBtn.disabled = false;
              return;
            }

            contact.inviteStatus = 'sent';
            if (checkbox) {
              checkbox.checked = false;
              checkbox.disabled = true;
            }
            selectedContacts.delete(contact);
            inviteBtn.textContent = `✓ ${t('contact.invite.sent_one')}`;
            inviteBtn.classList.add('sent');
            syncSelectAllCheckbox(
              list,
              selectAllCheckbox,
              visibleContactsByEmail,
            );
            updateActionButtons();
          } catch {
            inviteBtn.textContent = t('shared.error');
            inviteBtn.disabled = false;
          }
        });
      }

      if (checkbox && !isAlreadySaved && !isAlreadyInvited && !isSentInvite) {
        checkbox.checked = selectedContacts.has(contact);
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            selectedContacts.add(contact);
          } else {
            selectedContacts.delete(contact);
          }
          syncSelectAllCheckbox(
            list,
            selectAllCheckbox,
            visibleContactsByEmail,
          );
          updateActionButtons();
        });
      }

      list.appendChild(li);
    }

    listContainer.appendChild(list);
    contactsContainer.appendChild(listContainer);

    bulkActionsContainer.innerHTML = `
      <div class="bulk-actions">
        <button type="button" id="invite-selected-btn" class="action-btn" disabled>
          ${t('contact.invite.selected', { count: 0 })}
        </button>
        <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
          ${t('contact.invite.email', { count: 0 })}
        </button>
      </div>

      <!--
      <p class="disclosure-note bulk-action-disclosure">
        ${escapeHtml(gmailDisclosure)}
      </p>
      -->
    `;

    const selectAllCheckbox = header.querySelector('#select-all-checkbox');
    const inviteSelectedBtn = bulkActionsContainer.querySelector(
      '#invite-selected-btn',
    );
    const shareLinkBtn = bulkActionsContainer.querySelector('#share-link-btn');

    selectAllCheckbox.addEventListener('change', () => {
      if (selectAllCheckbox.disabled) {
        selectAllCheckbox.checked = false;
        return;
      }

      const checkboxes = list.querySelectorAll(
        '.contact-checkbox:not([disabled])',
      );
      checkboxes.forEach((cb) => {
        cb.checked = selectAllCheckbox.checked;
        const email = cb.getAttribute('data-email');
        const contact = visibleContactsByEmail.get(email);
        if (!contact) return;
        if (selectAllCheckbox.checked) {
          selectedContacts.add(contact);
        } else {
          selectedContacts.delete(contact);
        }
      });
      updateActionButtons();
    });

    inviteSelectedBtn.addEventListener('click', async () => {
      const toInvite = Array.from(selectedContacts).filter(
        (contact) => contact.user && !contact.isAlreadySaved,
      );

      if (toInvite.length === 0) return;

      inviteSelectedBtn.disabled = true;
      inviteSelectedBtn.textContent = t('contact.invite.sending');

      let result;
      try {
        result = await onInviteSelected(toInvite);
      } catch (error) {
        console.error('[ImportContacts] Invite error:', error);
        inviteSelectedBtn.textContent = t('shared.error');
        inviteSelectedBtn.disabled = false;
        return;
      }

      if (result.status === 'failed') {
        inviteSelectedBtn.textContent = t('shared.error');
        inviteSelectedBtn.disabled = false;
        window.setTimeout(() => {
          updateActionButtons();
        }, 1500);
        return;
      }

      if (result.status === 'already_invited') {
        inviteSelectedBtn.textContent = t('contact.add.already_invited');
        inviteSelectedBtn.disabled = false;
        window.setTimeout(() => {
          updateActionButtons();
        }, 1500);
        return;
      }

      if (result.status === 'partial') {
        inviteSelectedBtn.textContent =
          result.alreadyInvitedCount > 0
            ? t('contact.invite.partial_with_already_invited', {
                sent: result.count ?? 0,
                alreadyInvited: result.alreadyInvitedCount,
              })
            : t('contact.invite.sent', {
                count: result.count ?? 0,
              });
        inviteSelectedBtn.disabled = false;
        window.setTimeout(() => {
          updateActionButtons();
        }, 1500);
        return;
      }

      inviteSelectedBtn.textContent = `✓ ${t('contact.invite.sent', { count: result.count ?? 0 })}`;

      window.setTimeout(() => {
        clearSelection(list, selectAllCheckbox, visibleContactsByEmail);
        updateActionButtons();
      }, 2000);
    });

    shareLinkBtn.addEventListener('click', async () => {
      const notOnApp = Array.from(selectedContacts).filter(
        (contact) => !contact.user,
      );

      if (notOnApp.length === 0) return;

      shareLinkBtn.disabled = true;
      shareLinkBtn.textContent = t('contact.invite.requesting_permission');

      let result;
      try {
        result = await onEmailSelected(notOnApp);
      } catch (error) {
        console.error('[ImportContacts] Email send error:', error);
        shareLinkBtn.textContent = t('contact.invite.error_retry');
        shareLinkBtn.disabled = false;
        window.setTimeout(() => {
          updateActionButtons();
        }, 1500);
        return;
      }

      if (result.status === 'sent') {
        shareLinkBtn.textContent = `✓ ${t('contact.invite.sent_emails', { count: result.count ?? 0 })}`;
        shareLinkBtn.classList.add('success');

        window.setTimeout(() => {
          clearSelection(list, selectAllCheckbox, visibleContactsByEmail);
          updateActionButtons();
          shareLinkBtn.classList.remove('success');
        }, 3000);
        return;
      }

      if (result.status === 'permission_denied') {
        shareLinkBtn.textContent = t('contact.invite.permission_denied');
      } else if (result.status === 'failed') {
        shareLinkBtn.textContent = t('contact.invite.failed_emails');
      } else {
        shareLinkBtn.textContent = t('contact.invite.error_retry');
      }

      shareLinkBtn.disabled = false;
      window.setTimeout(() => {
        updateActionButtons();
      }, 1500);
    });

    updateActionButtons();
    syncSelectAllCheckbox(list, selectAllCheckbox, visibleContactsByEmail);
  }

  function clearSelection(list, selectAllCheckbox, visibleContactsByEmail) {
    selectedContacts.clear();
    list
      .querySelectorAll('.contact-checkbox')
      .forEach((cb) => (cb.checked = false));
    selectAllCheckbox.checked = false;
    syncSelectAllCheckbox(list, selectAllCheckbox, visibleContactsByEmail);
  }

  function syncSelectAllCheckbox(
    list,
    selectAllCheckbox,
    visibleContactsByEmail,
  ) {
    const selectableCheckboxes = Array.from(
      list.querySelectorAll('.contact-checkbox:not([disabled])'),
    );

    if (selectableCheckboxes.length === 0) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.disabled = true;
      selectAllCheckbox.indeterminate = false;
      return;
    }

    selectAllCheckbox.disabled = false;
    const selectedCount = selectableCheckboxes.filter((checkbox) => {
      const email = checkbox.getAttribute('data-email');
      const contact = visibleContactsByEmail.get(email);
      return contact ? selectedContacts.has(contact) : false;
    }).length;

    selectAllCheckbox.indeterminate =
      selectedCount > 0 && selectedCount < selectableCheckboxes.length;

    selectAllCheckbox.checked = selectableCheckboxes.every((checkbox) => {
      const email = checkbox.getAttribute('data-email');
      const contact = visibleContactsByEmail.get(email);
      return contact ? selectedContacts.has(contact) : false;
    });
  }

  function updateActionButtons() {
    const inviteSelectedBtn = bulkActionsContainer.querySelector(
      '#invite-selected-btn',
    );
    const shareLinkBtn = bulkActionsContainer.querySelector('#share-link-btn');

    if (!inviteSelectedBtn || !shareLinkBtn) return;

    const selectedArray = Array.from(selectedContacts);
    const onAppCount = selectedArray.filter(
      (contact) => contact.user && !contact.isAlreadySaved,
    ).length;
    const notOnAppCount = selectedArray.filter(
      (contact) => !contact.user,
    ).length;

    inviteSelectedBtn.disabled = onAppCount === 0;
    inviteSelectedBtn.textContent = t('contact.invite.selected', {
      count: onAppCount,
    });

    shareLinkBtn.disabled = notOnAppCount === 0;
    shareLinkBtn.textContent = t('contact.invite.email', {
      count: notOnAppCount,
    });
  }

  return {
    element,
    prepareForImport,
    renderContacts,
    renderEmptyState,
    reset,
    setActivePlatform,
    setStatus,
  };
}
