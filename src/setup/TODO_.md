# Setup layer migration checklist

- Keep bootstrap orchestration in `src/setup/` only.
- Keep runtime helpers/adapters in active module folders.
- Enforce boundaries incrementally by enabling one ESLint rule block at a time in `eslint.boundaries.config.js`.
