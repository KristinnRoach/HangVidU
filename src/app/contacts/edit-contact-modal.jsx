import { openSolidDialog } from '../../shared/components/base/solid-dialog.js';
import EditContactDialog from './EditContactDialog.jsx';

/**
 * Opens a modal to edit a contact. Returns { action, name } or null if cancelled.
 */
export default function editContactModal(currentName) {
  return openSolidDialog((controls) => (
    <EditContactDialog currentName={currentName} onClose={controls.close} />
  ));
}
