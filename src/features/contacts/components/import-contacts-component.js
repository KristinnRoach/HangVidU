import { escapeHtml } from '../../../shared/components/ui/component-system/dom-utils.js';
import { t } from '../../../shared/i18n/index.js';

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
        <button type="button" class="platform-btn" data-platform="google">
          <i data-lucide="mail"></i>
        </button>

        <!-- Future platform buttons
        <button type="button" class="platform-btn" data-platform="facebook" title="${t('contact.import.facebook')}" disabled>
          <i data-lucide="monitor"></i>
        </button>
        -->
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

      <p class="disclosure-note">
        ${escapeHtml(importDisclosure)}
      </p>

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
      const { name, email, user, isAlreadySaved, isInvited } = contact;

      const li = document.createElement('li');
      li.className = 'contact-item';

      let statusBadge = '';
      let actionButton = '';

      if (isAlreadySaved || isInvited) {
        statusBadge = `<span class="status-badge saved">✓ ${t('contact.status.saved')}</span>`;
      } else if (user) {
        statusBadge = `<span class="status-badge on-app">${t('contact.status.on_app')}</span>`;
        actionButton = `
          <button type="button" class="invite-btn" data-uid="${escapeHtml(user.uid)}" data-name="${escapeHtml(user.userName)}">
            ${t('contact.invite')}
          </button>
        `;
      } else {
        statusBadge = `<span class="status-badge not-on-app">${t('contact.status.not_on_app')}</span>`;
      }

      li.innerHTML = `
        <label class="contact-item-label">
          <input type="checkbox" class="contact-checkbox" data-email="${escapeHtml(email)}" ${isAlreadySaved || isInvited ? 'disabled' : ''} />
          <span class="contact-info">
            <strong class="contact-name">${escapeHtml(name)}</strong>
            <small class="contact-email">${escapeHtml(email)}</small>
          </span>
          ${statusBadge}
        </label>
        ${actionButton}
      `;

      const inviteBtn = li.querySelector('.invite-btn');
      const checkbox = li.querySelector('.contact-checkbox');

      if (user && !isAlreadySaved && !isInvited) {
        inviteBtn.addEventListener('click', async () => {
          inviteBtn.disabled = true;
          inviteBtn.textContent = t('shared.sending');

          try {
            await onInviteContact(contact);
            contact.isInvited = true;
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

      if (checkbox && !isAlreadySaved && !isInvited) {
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
      <p class="disclosure-note bulk-action-disclosure">
        ${escapeHtml(gmailDisclosure)}
      </p>
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

      if (result.status === 'partial') {
        inviteSelectedBtn.textContent = t('contact.invite.sent', {
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
