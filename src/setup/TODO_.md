Setup layer migration checklist

- Keep bootstrap orchestration in `src/setup/` only.
- Keep `src/app/` for runtime helpers/adapters (not startup sequencing).
- Enforce boundaries incrementally by enabling one ESLint rule block at a time in `eslint.config.js`.
