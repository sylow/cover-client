import pluginVue from 'eslint-plugin-vue'
export default [
  ...pluginVue.configs['flat/recommended', 'flat/vue3-recommented'],
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'vue/no-multiple-template-root': 0
    }
  }
]