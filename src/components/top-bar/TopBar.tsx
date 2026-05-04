import AppTitle from '../auth/AppTitle.jsx';
import AuthControls from '../auth/AuthControls.jsx';
import AddContactButton from './AddContactButton.jsx';
import NotificationsToggle from './NotificationsToggle.jsx';
import YouTubeSearchControls from './YouTubeSearchControls.jsx';

export default function TopBar() {
  return (
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
  );
}
