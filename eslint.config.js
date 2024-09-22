// eslint.config.js
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // Use vue-eslint-parser for .vue files
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules, // For Vue 3 projects
      // You can add or override custom rules here
    },
  },
]
