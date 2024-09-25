export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,  // Specify ECMAScript version
      globals: {
        require: 'readonly',   // Define Node.js globals as read-only
        module: 'readonly',
        process: 'readonly',
        console: 'readonly',   // Define console as read-only global
      },
    },
    rules: {
      'no-undef': 'error',     // Keep undefined variable checks
      'no-unused-vars': 'warn', // Warn about unused variables
    },
  },
];
