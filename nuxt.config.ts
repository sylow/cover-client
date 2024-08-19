// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      environment: process.env.NUXT_PUBLIC_ENVIRONMENT,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      baseWs: process.env.NUXT_PUBLIC_BASE_WS,
      privateKeyUrl: process.env.NUXT_PUBLIC_PRIVATE_KEY_URL
    }
  },
  plugins: [],
  css: [
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
})