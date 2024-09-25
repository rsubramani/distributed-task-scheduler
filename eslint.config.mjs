export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021, // Specify ECMAScript version
    },
    env: {
      node: true,        // This enables Node.js globals like require, module, process
    },
    rules: {
      'no-undef': 'error',      // Keep undefined variable checks
      'no-unused-vars': 'warn', // Warn about unused variables
    },
  },
];
