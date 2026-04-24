import AppPipButton from './components/app/AppPipButton.jsx';
import ChatControls from './components/app/ChatControls.jsx';
import LegalFooter from './components/app/LegalFooter.jsx';
import VideoStage from './components/app/VideoStage.jsx';
import AppTitle from './components/auth/AppTitle.jsx';
import AuthControls from './components/auth/AuthControls.jsx';
import ContactsList from './components/contacts/ContactsList.jsx';
import DialogProvider from './components/DialogProvider.jsx';
import PublicHomepage from './components/home/PublicHomepage.jsx';
import AddContactButton from './components/top-bar/AddContactButton.jsx';
import LocaleToggle from './components/top-bar/LocaleToggle.jsx';
import NotificationsToggle from './components/top-bar/NotificationsToggle.jsx';
import YouTubeSearchControls from './components/top-bar/YouTubeSearchControls.jsx';

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
            <AddContactButton />
            <NotificationsToggle />
            <YouTubeSearchControls />
          </div>
        </header>

        <div id='onetap-container' />

        <main class='relative-wrapper'>
          <VideoStage />

          <div id='lobby' class='lobby'>
            <PublicHomepage />
            <ContactsList />
          </div>
        </main>

        <ChatControls />
        <AppPipButton />

        <LegalFooter />
        <LocaleToggle />
      </div>
    </DialogProvider>
  );
}
