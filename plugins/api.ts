export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { token, isAuthenticated } = useAuth();

  const api = $fetch.create({
    baseURL: config.public.baseUrl,
    onRequest({ request, options, error }) {
      console.log(token.value)
      if (isAuthenticated) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${token.value}`])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${token.value}`)
        } else {
          headers.Authorization = `Bearer ${token.value}`
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/sessions/signin'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})

