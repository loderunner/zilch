module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['import'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'no-debugger': 'off',
    curly: ['error', 'all'],
    'prefer-const': 'error',
    eqeqeq: 'error',
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'import/first': 'warn',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/newline-after-import': 'warn',
  },
  overrides: [
    {
      files: '**/*.test.js',
      env: {
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
    },
  ],
};
