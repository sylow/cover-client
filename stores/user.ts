import type { User } from '~/types/all'

export const useUserStore = defineStore('user', () => {
  const { $api }  = useNuxtApp()

  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Methods
  const fetch = async () => {
    console.log('fetching user')
    isLoading.value = true
    error.value = null

    try {
    console.log('fetching user try')
      const { data } = useAsyncData<User>('user.fetch', () => $api('/api/v1/me'))
      console.log(data)
      user.value = data.value || null
    } catch (err) {
          console.log('fetching user catch')
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
          console.log('fetching finally')

      isLoading.value = false
    }
  }

  // Computed properties
  const empty = computed(() => user.value == null)
  const email = computed(() => user.value?.email)
  const credits = computed(() => user.value?.credits)
  
  // Return
  return { user, isLoading, error, fetch, empty, email, credits }
})