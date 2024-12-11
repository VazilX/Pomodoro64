module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
  },
};
