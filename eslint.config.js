import pluginVue from 'eslint-plugin-vue'

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    rules: {
      'vue/multi-word-component-names': 0,
      'vue/attributes-order': 2
    }
  }
]
