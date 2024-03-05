module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'no-console': 'warn',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'array-bracket-spacing': [
      'error', 'always'
    ],
    'eqeqeq': 'error',
    'quotes': [
      'warn', 'single',
    ],
    'semi': 'error',
  }
};
