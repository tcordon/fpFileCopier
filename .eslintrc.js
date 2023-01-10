module.exports = {
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    es6: true,
    node: true,
    mocha: false
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
