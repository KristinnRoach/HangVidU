# Contacts RTDB Usage

Contacts are wired through the D1 repository path.

RTDB contact data may still exist in old exports or production cleanup windows.
Do not add app code that writes contacts to RTDB again.

Known RTDB leftovers:
- Old `users/*/contacts` nodes are cleanup/backfill input only.
