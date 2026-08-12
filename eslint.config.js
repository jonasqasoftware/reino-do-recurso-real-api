const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      '.npm-cache/**',
      '.playwright-browsers/**',
      'coverage/**',
      'node_modules/**',
      'public/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        setTimeout: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      },
    },
  },
  {
    files: ['performance/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { __ENV: 'readonly' },
    },
  },
];
