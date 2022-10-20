module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'error',
    'react/jsx-key': 'error',
    'react/prop-types': 'error',
    'react/display-name': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
