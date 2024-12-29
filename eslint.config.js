import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier/recommended';
import vueConfigTypescript from '@vue/eslint-config-typescript';
import vueConfigPrettier from '@vue/eslint-config-prettier';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      ...vueConfigTypescript.rules,
      ...vueConfigPrettier.rules,
      'vue/attributes-order': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/order-in-components': 'error',
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
        },
      ],
    },
  },
  prettier,
  {
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
    },
  },
];
