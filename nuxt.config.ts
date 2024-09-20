// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-05',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', '@pinia/nuxt', '@nuxt/scripts'],
  runtimeConfig: {
    public: {
      environment: process.env.NUXT_PUBLIC_ENVIRONMENT,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      baseWs: process.env.NUXT_PUBLIC_BASE_WS,
      privateKeyUrl: process.env.NUXT_PUBLIC_PRIVATE_KEY_URL
    }
  },
  plugins: ['~/plugins/api.ts'],
  css: [
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  app: {
    head: {
      script: [
        { src: 'https://js.stripe.com/v3/buy-button.js' },
        { src: '/scripts/menu.js', tagPosition: 'bodyClose' },
      ]
    }
  },
  imports: {
    // Auto import only from specific directories or turn off autoimport for certain folders
    dirs: [
      'composables/**'
    ]
  },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         api: 'modern-compiler',
  //         silenceDeprecations: ['mixed-decls'],
  //       }
  //     }
  //   }
  // }
})