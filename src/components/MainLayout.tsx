import TopBar from './top-bar/TopBar.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './top-bar/LocaleToggle.jsx';
import MainContent from './MainContent.jsx';
import type { SolidP2PRoom } from '@kidlib/p2p/solid';

/**
 * MainLayout - Common SolidJS layout
 */
export default function MainLayout(props: { p2p: SolidP2PRoom }) {
  return (
    <div id='app' class='main-wrapper'>
      <TopBar />
      <div id='onetap-container' />

      <MainContent p2p={props.p2p} />

      <LegalFooter />
      <LocaleToggle />
    </div>
  );
}
