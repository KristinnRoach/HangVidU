import ContactsList from './components/contacts/ContactsList.jsx';
import DialogProvider from './components/DialogProvider.jsx';

/**
 * SolidJS root.
 * Incrementally add migrated surfaces here.
 */
export default function App() {
  return (
    <DialogProvider>
      <ContactsList />
    </DialogProvider>
  );
}
