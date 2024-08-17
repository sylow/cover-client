import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()
  const { token, isAuthenticated } = useAuth()
  const toast = useToast()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseUrl ?? 'http://localhost:3001' as string,
    // cache request
    key: url,
    onRequest({ options }) {

      // Set the request headers
      options.headers = options.headers || {}
      if (isAuthenticated) {
        options.headers = {...options.headers, 'Authorization': `Bearer ${token.value}`}
      }
    },
    onResponse (_ctx) {
    },

    async onResponseError ({ response }) {
      if (response.status === 401) {
        toast.add({ title: 'Login Failed!',description: 'Check your email/password', color: 'red' })
      }
    }
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)
  return useFetch(url, params)
}