import { applyD1Migrations, env } from 'cloudflare:test';

// Runs once per test file (before tests). Isolated storage forks from this
// seeded state, so each test starts on the migrated schema with no rows.
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
