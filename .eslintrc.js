module.exports = {
  env: {
    jest: true,
    browser: true,
  },
  extends: 'airbnb-typescript-prettier',
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['Label'],
        labelAttributes: ['label'],
        controlComponents: ['Input', 'InputEmail'],
        depth: 3,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'export'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
  },
};
