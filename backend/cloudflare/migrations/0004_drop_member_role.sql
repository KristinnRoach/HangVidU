-- Drop the vestigial `role` column from conversation_members.
--
-- Same rationale as 0003 (status): `role` was only ever written 'member' and is
-- never read. Group permissions (owner/admin/member) don't exist yet, and adding
-- a column back is a cheap non-destructive migration when they do. 0001 created
-- this column and is applied to remote D1, so this is a forward drop.
ALTER TABLE conversation_members DROP COLUMN role;
