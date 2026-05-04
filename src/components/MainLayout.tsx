import TopBar from './top-bar/TopBar.jsx';
import LegalFooter from './app/LegalFooter.jsx';
import LocaleToggle from './top-bar/LocaleToggle.jsx';
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
