module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', 'unused-imports'],
  rules: {
    'no-undef': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'unused-imports/no-unused-imports': 'error',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 6, multiline: { max: 16 } }],
    'unused-imports/no-unused-vars': [
      'off',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue', '.ts'],
      },
    },
  },
};
