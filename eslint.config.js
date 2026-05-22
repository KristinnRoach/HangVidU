import boundariesConfig from './eslint.boundaries.config.js';
import { EVENT_NAME_REGEX, isCanonicalEventName } from './src/shared/events/naming.js';

const EVENT_API_CALLS = new Set([
  'dispatchCommand',
  'dispatchCommandAndAwait',
  'handleCommand',
  'publish',
  'publishAndAwait',
  'subscribe',
]);

const appConfig = [
  // JSX parser support for *.jsx files. Solid JSX uses standard ECMA JSX
  // grammar — no plugin required for lint-level parsing.
  {
    files: ['src/**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ignores: [
      'src/**/*.test.js',
      'src/**/*.test.jsx',
      'src/**/__tests__/**',
      'src/**/tests/**',
      'src/**/wip-*/**',
    ],
    plugins: {
      local: {
        rules: {
          'event-name-format': {
            meta: {
              type: 'problem',
              schema: [],
            },
            create(context) {
              function getStaticString(node) {
                if (!node) return null;
                if (
                  node.type === 'Literal' &&
                  typeof node.value === 'string'
                ) {
                  return node.value;
                }
                if (
                  node.type === 'TemplateLiteral' &&
                  node.expressions.length === 0
                ) {
                  return node.quasis[0]?.value?.cooked ?? null;
                }
                return null;
              }

              return {
                CallExpression(node) {
                  if (node.callee?.type !== 'Identifier') {
                    return;
                  }
                  if (!EVENT_API_CALLS.has(node.callee.name)) {
                    return;
                  }

                  const firstArg = node.arguments?.[0];
                  const name = getStaticString(firstArg);
                  if (!name) {
                    return;
                  }

                  if (isCanonicalEventName(name)) {
                    return;
                  }

                  context.report({
                    node: firstArg,
                    message: `Event/command name "${name}" must match canonical regex ${EVENT_NAME_REGEX}.`,
                  });
                },
              };
            },
          },
        },
      },
    },
    rules: {
      'local/event-name-format': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'firebase/auth',
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
          ],
          patterns: [
            {
              group: ['firebase/auth/*'],
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/auth/adapters/firebase-auth-adapter.js'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // STATE_RULES.md: *-state.js modules are module-private.
  // External consumers must go through the module barrel and subscribe to
  // `evt:<module>:state:changed`. Listed per-module as we adopt the pattern.
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ignores: [
      'src/auth/**',
      'src/features/contacts/**',
      'src/**/*.test.js',
      'src/**/*.test.jsx',
      'src/**/__tests__/**',
      'src/**/tests/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'firebase/auth',
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
          ],
          patterns: [
            {
              group: ['firebase/auth/*'],
              message:
                'Import from src/auth/adapters/firebase-auth-adapter.js instead of firebase/auth directly.',
            },
            {
              group: ['**/auth-state', '**/auth-state.js'],
              message:
                'auth-state.js is private to src/auth/. Import read-only getters from src/auth/index.js and subscribe to evt:auth:state:changed. See docs/WIP_Architecture/STATE_RULES.md.',
            },
            {
              group: ['**/contacts-state', '**/contacts-state.js'],
              message:
                'contacts-state.js is private to src/features/contacts/. Import read-only getters from src/features/contacts/index.js and subscribe to evt:contacts:state:changed. See docs/WIP_Architecture/STATE_RULES.md.',
            },
          ],
        },
      ],
    },
  },
];

// Solid components must use `useI18n()` as the i18n seam so the impl stays swappable.
// See docs/WIP_Architecture/MIGRATE_COMPONENT_TO_SOLIDJS.md.
const solidComponentsI18nConfig = [
  {
    files: ['src/components/**/*.jsx', 'src/components/**/*.tsx'],
    ignores: ['src/**/*.test.js', 'src/**/*.test.jsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/shared/i18n', '**/shared/i18n/index.js'],
              importNames: ['t', 'getLocale', 'setLocale', 'onLocaleChange'],
              message:
                'In Solid components use `useI18n()` from src/shared/i18n/. Bare t/getLocale/setLocale/onLocaleChange imports couple components to the current impl.',
            },
          ],
        },
      ],
    },
  },
];

export default [...boundariesConfig, ...appConfig, ...solidComponentsI18nConfig];
