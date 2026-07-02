// Local lint rules, loaded by the `lint.jsPlugins` block in vite.config.js.
// Enforces docs/architecture event/command naming on the event-bus API.

import {
  EVENT_NAME_REGEX,
  isCanonicalEventName,
} from './src/shared/events/naming.js';

// Expected name prefix per event-bus API call, mirroring the runtime
// assertCanonicalEventName(name, kind) contract in src/shared/events/index.js.
const EVENT_API_PREFIXES = new Map([
  ['dispatchCommand', 'cmd:'],
  ['dispatchCommandAndAwait', 'cmd:'],
  ['handleCommand', 'cmd:'],
  ['publish', 'evt:'],
  ['publishAndAwait', 'evt:'],
  ['subscribe', 'evt:'],
]);

export default {
  meta: {
    name: 'local',
  },
  rules: {
    'event-name-format': {
      meta: {
        type: 'problem',
        schema: [],
      },
      create(context) {
        function getStaticString(node) {
          if (!node) return null;
          if (node.type === 'Literal' && typeof node.value === 'string') {
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
            const expectedPrefix = EVENT_API_PREFIXES.get(node.callee.name);
            if (!expectedPrefix) {
              return;
            }

            const firstArg = node.arguments?.[0];
            const name = getStaticString(firstArg);
            if (!name) {
              return;
            }

            if (name.startsWith(expectedPrefix) && isCanonicalEventName(name)) {
              return;
            }

            context.report({
              node: firstArg,
              message: `${node.callee.name}() name "${name}" must start with "${expectedPrefix}" and match canonical regex ${EVENT_NAME_REGEX}.`,
            });
          },
        };
      },
    },
  },
};
