module.exports = {
  parserOptions: {
    ecmaVersion: 12
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  rules: {
    'no-console': 'warn',
    'no-use-before-define': 'warn',
    'spaced-comment': 'warn'
  },
  extends: [
    'standard'
  ]
}
