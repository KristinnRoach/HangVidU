// Local lint rules, loaded by the `lint.jsPlugins` block in vite.config.js.
// Enforces docs/architecture event/command naming on the event-bus API.

import {
  EVENT_NAME_REGEX,
  isCanonicalEventName,
} from './src/shared/events/naming.js';

const EVENT_API_CALLS = new Set([
  'dispatchCommand',
  'dispatchCommandAndAwait',
  'handleCommand',
  'publish',
  'publishAndAwait',
  'subscribe',
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
};
