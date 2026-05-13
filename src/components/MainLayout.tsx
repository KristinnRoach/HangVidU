import AppTitle from './app/AppTitle.jsx';
import AuthControls from './auth/AuthControls.jsx';
import AddContactButton from './contacts/AddContactButton.jsx';
import NotificationsToggle from './app/NotificationsToggle.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './app/LocaleToggle.jsx';
import MainContent from './MainContent.jsx';

/**
 * MainLayout - Common SolidJS layout
 */
export default function MainLayout() {
  return (
    <div id='app' class='main-wrapper'>
      <TopBar />
      <div id='onetap-container' />

      <MainContent />

      <LegalFooter />
      <LocaleToggle />
    </div>
  );
}

function TopBar() {
  return (
    <header id='top-bar' class='top-bar'>
      <div id='top-bar-left' class='top-bar-left animated-flex'>
        <AppTitle />
        <AuthControls />
      </div>

      <div class='top-bar-right'>
        <AddContactButton />
        <NotificationsToggle />
        {/* <YouTubeSearchControls /> */}
      </div>
    </header>
  );
}
