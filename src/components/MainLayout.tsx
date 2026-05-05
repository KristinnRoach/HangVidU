import TopBar from './top-bar/TopBar.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './top-bar/LocaleToggle.jsx';
import MainContent from './MainContent.jsx';
import type { P2PRoom } from '@kidlib/p2p';

/**
 * MainLayout - Common SolidJS layout
 */
export default function MainLayout(props: { activeRoom: P2PRoom | null }) {
  return (
    <div id='app' class='main-wrapper'>
      <TopBar />
      <div id='onetap-container' />

      <MainContent activeRoom={props.activeRoom} />

      <LegalFooter />
      <LocaleToggle />
    </div>
  );
}
