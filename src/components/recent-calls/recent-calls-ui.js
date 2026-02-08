import { getRecentRooms } from '../storage/recent-rooms.js';
import { t, onLocaleChange } from '../i18n/index.js';

let recentCallsContainer = null;
let localeUnsubscribe = null;

export function initRecentCalls() {
  if (!recentCallsContainer) {
    recentCallsContainer = document.createElement('div');
    recentCallsContainer.id = 'recent-calls';
    recentCallsContainer.className = 'recent-calls';

    const lobby = document.getElementById('lobby');
    lobby.parentNode.insertBefore(recentCallsContainer, lobby.nextSibling);

    // Register click handler once (event delegation handles dynamic buttons)
    recentCallsContainer.addEventListener('click', handleRecentClick);

    // Subscribe to locale changes to re-render
    localeUnsubscribe = onLocaleChange(() => renderRecentCalls());
  }

  renderRecentCalls();
}

export function renderRecentCalls() {
  if (!recentCallsContainer) return;

  const rooms = getRecentRooms();

  if (rooms.length === 0) {
    recentCallsContainer.innerHTML = '';
    return;
  }

  recentCallsContainer.innerHTML = `
    <div class="recent-section">
      <h3>${t('call.recent')}</h3>
      ${rooms
        .map(
          (room) => `
        <button class="recent-call-btn" data-room-id="${room.id}">
          📞 ${t('call.rejoin', { id: room.id.slice(-6) })}
        </button>
      `,
        )
        .join('')}
    </div>
  `;
}

function handleRecentClick(event) {
  const btn = event.target.closest('.recent-call-btn');
  if (btn && window.rejoinRoom) {
    window.rejoinRoom(btn.dataset.roomId);
  }
}

export function hideRecentCalls() {
  if (recentCallsContainer) {
    recentCallsContainer.style.display = 'none';
  }
}

export function showRecentCalls() {
  if (recentCallsContainer) {
    recentCallsContainer.style.display = 'block';
  }
}
