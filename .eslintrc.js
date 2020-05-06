module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    `react-app`,
    'airbnb-typescript',
    'airbnb/hooks',
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 0,
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': ['function', 'return']
      },
      {
        'blankLine': 'always',
        'prev': ['const', 'let', 'var'],
        'next': '*'
      },
      {
        'blankLine': 'any',
        'prev': ['const', 'let', 'var'],
        'next': ['const', 'let', 'var']
      }
    ]
  }
  globals: {
    __PATH_PREFIX__: true,
  },
};
