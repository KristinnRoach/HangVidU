# Add Next Feature

When enforcing boundaries for the next feature, add one new ESLint block to
`eslint.boundaries.config.js`.

Rule intent:

- the feature may import from `shared`
- the feature may import from itself
- the feature may import from `auth` when that reflects the intended dependency direction
- the feature may not import from `app`
- the feature may not import from sibling features

Template:

```js
{
  files: ['src/features/FEATURE_NAME/*.js', 'src/features/FEATURE_NAME/**/*.js'],
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: { type: 'feature', captured: { featureName: 'FEATURE_NAME' } },
            allow: {
              to: [
                { type: 'auth' },
                { type: 'shared' },
                { type: 'feature', captured: { featureName: 'FEATURE_NAME' } },
              ],
            },
            message:
              'FEATURE_NAME may only import from auth, shared code, or from within the FEATURE_NAME feature.',
          },
        ],
      },
    ],
  },
},
```

Example for `messaging`:

```js
{
  files: ['src/features/messaging/*.js', 'src/features/messaging/**/*.js'],
  rules: {
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: { type: 'feature', captured: { featureName: 'messaging' } },
            allow: {
              to: [
                { type: 'auth' },
                { type: 'shared' },
                { type: 'feature', captured: { featureName: 'messaging' } },
              ],
            },
            message:
              'Messaging may only import from auth, shared code, or from within the messaging feature.',
          },
        ],
      },
    ],
  },
},
```

Current reminder:

- feature typing is already generic in `eslint.boundaries.config.js`
- adding a block like the above turns enforcement on for one feature
- no other feature needs to change at the same time
- when boundary lint fails, prefer first moving code to the right layer/folder before weakening the rule
