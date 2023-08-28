/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: '2021',
  },
  plugins: ['import', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'vite.config.js'],
  settings: {
    react: { version: '18.2.21' },
    'import/parser': 'babel-eslint',
  },
  rules: {
    'no-debugger': 'off',
    curly: ['error', 'all'],
    'prefer-const': 'error',
    eqeqeq: 'error',
    'object-shorthand': ['warn', 'always'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
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
