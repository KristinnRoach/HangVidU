import ContactsList from './components/contacts/ContactsList.jsx';
import AppDialogHost from './components/AppDialogHost.jsx';

/**
 * SolidJS root.
 * Incrementally add migrated surfaces here.
 */
export default function App() {
  return (
    <>
      <ContactsList />
      <AppDialogHost />
    </>
  );
}
