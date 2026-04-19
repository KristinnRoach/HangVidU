import ContactsList from './components/contacts/ContactsList.jsx';
import AppDialogHost from './components/AppDialogHost.jsx';

/**
 * Minimal SolidJS root. Start with contacts so the existing PoC keeps working,
 * then add additional migrated surfaces here over time.
 */
export default function App() {
  return (
    <>
      <ContactsList />
      <AppDialogHost />
    </>
  );
}
