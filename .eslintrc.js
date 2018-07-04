module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'import/no-unresolved':  [ 'error', 'never' ],
    'import/extensions': [ 'error', 'never' ],
    'no-underscore-dangle': ['off'],
    'comma-dangle': ['error',  {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
