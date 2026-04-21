import ContactsList from './components/contacts/ContactsList.jsx';
import DialogProvider from './components/DialogProvider.jsx';
import PublicHomepage from './components/home/PublicHomepage.jsx';

/**
 * SolidJS root.
 * Incrementally add migrated surfaces here.
 */
export default function App() {
  return (
    <DialogProvider>
      <PublicHomepage />
      <ContactsList />
    </DialogProvider>
  );
}
