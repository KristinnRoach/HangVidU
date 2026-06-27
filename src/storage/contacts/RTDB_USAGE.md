# Contacts RTDB Usage

Contacts are now wired through the D1 repository path for this branch.

RTDB contact data is still kept in place for existing remote users until the
production D1 backfill and deploy are complete. Do not delete RTDB contact nodes
or rules as part of the users-to-D1 PR.

Known RTDB leftovers:
- Existing production users/contacts need one-shot backfill into remote D1.
- RTDB remains the rollback/source data until post-deploy verification passes.
