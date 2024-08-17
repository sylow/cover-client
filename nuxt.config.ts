// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    public: {
      environment: process.env.NUXT_PUBLIC_ENVIRONMENT,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      privateKeyUrl: process.env.NUXT_PUBLIC_PRIVATE_KEY_URL
    }
  },
  css: [
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
})