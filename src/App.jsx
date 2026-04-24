import LegalFooter from './components/app/LegalFooter.jsx';
import AppTitle from './components/auth/AppTitle.jsx';
import AuthControls from './components/auth/AuthControls.jsx';
import ContactsList from './components/contacts/ContactsList.jsx';
import DialogProvider from './components/DialogProvider.jsx';
import PublicHomepage from './components/home/PublicHomepage.jsx';

/**
 * SolidJS app shell.
 *
 * Preserve legacy ids/classes while the remaining imperative UI modules migrate
 * behind this root one surface at a time.
 */
export default function App() {
  return (
    <DialogProvider>
      <div id='app' class='main-wrapper'>
        <header id='top-bar' class='top-bar'>
          <div id='top-bar-left' class='top-bar-left animated-flex'>
            <AppTitle />
            <AuthControls />
          </div>

          <div class='top-bar-right'>
            <button
              type='button'
              title='Add contact'
              aria-label='Add contact'
              id='add-contact-btn'
            >
              <i data-lucide='user-plus' />
            </button>

            <div class='search-section'>
              <div class='search-controls'>
                <input
                  class='hidden'
                  type='search'
                  id='searchQuery'
                  placeholder='Search YouTube videos...'
                  autocomplete='off'
                  spellcheck={false}
                />
                <button
                  type='button'
                  id='searchBtn'
                  title='Search YouTube videos'
                  aria-label='Search YouTube videos'
                >
                  <i data-lucide='search' />
                </button>
              </div>
              <div
                id='searchResults'
                class='search-results hidden'
                aria-live='polite'
              />
            </div>
          </div>
        </header>

        <div id='onetap-container' />

        <main class='relative-wrapper'>
          <div id='videos'>
            <div
              id='local-video-box'
              class='hidden box video-box local-video-box'
            >
              <video id='local-video-el' autoplay playsinline muted />
            </div>

            <div
              id='remote-video-box'
              class='hidden box video-box remote-video-box'
            >
              <video id='remote-video-el' autoplay playsinline />
            </div>

            <div
              id='shared-video-box'
              class='box video-box shared-video-box hidden'
            >
              <video id='shared-video-el' controls playsinline />
            </div>

            <div id='yt-video-box' class='box video-box yt-video-box hidden' />
          </div>

          <div id='lobby' class='lobby'>
            <PublicHomepage />
            <ContactsList />
          </div>
        </main>

        <div id='chat-controls' class='hidden chat-controls bottom'>
          <button
            type='button'
            class='chat-btn hidden'
            id='exit-watch-mode-btn'
            title='Exit watch mode'
            aria-label='Exit watch mode'
          >
            <i data-lucide='x' />
          </button>
          <button
            type='button'
            class='chat-btn'
            id='call-btn'
            title='Start call'
            aria-label='Start call'
          >
            <i data-lucide='phone' />
          </button>
          <button
            type='button'
            class='chat-btn'
            id='camera-btn'
            title='Toggle camera'
            aria-label='Toggle camera'
          >
            <i data-lucide='video' />
          </button>
          <button
            type='button'
            class='chat-btn'
            id='switch-camera-btn'
            title='Switch camera'
            aria-label='Switch camera'
          >
            <i data-lucide='refresh-cw' />
          </button>

          <button
            type='button'
            class='chat-btn'
            id='mic-btn'
            title='Toggle microphone'
            aria-label='Toggle microphone'
          >
            <i data-lucide='mic' />
          </button>
          <button
            type='button'
            class='chat-btn'
            id='mute-btn'
            title='Toggle remote audio'
            aria-label='Toggle remote audio'
            disabled
          >
            <i data-lucide='volume-2' />
          </button>

          <button
            type='button'
            style='display: none'
            class='chat-btn'
            id='fullscreen-partner-btn'
            title='Fullscreen partner video'
            aria-label='Fullscreen partner video'
          >
            <i data-lucide='maximize' />
          </button>

          <button
            type='button'
            class='chat-btn hidden'
            id='remote-pip-btn'
            title='Open partner video in picture-in-picture'
            aria-label='Open partner video in picture-in-picture'
            disabled
          >
            <i data-lucide='copy' />
          </button>

          <button
            type='button'
            class='chat-btn'
            id='hang-up-btn'
            title='Hang up'
            aria-label='Hang up'
            disabled
          >
            <i data-lucide='phone-off' />
          </button>
        </div>

        <button
          type='button'
          id='app-pip-btn'
          style='display: none'
          title='Open app in floating window'
          aria-label='Open app in floating window'
        >
          <i data-lucide='monitor' />
        </button>

        <LegalFooter />
      </div>
    </DialogProvider>
  );
}
