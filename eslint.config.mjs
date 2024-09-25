export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,  // Specify ECMAScript version
      globals: {
        require: 'readonly',   // Define Node.js globals as read-only
        module: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',     // Keep undefined variable checks
      'no-unused-vars': 'warn', // Warn about unused variables
    },
  },
];
