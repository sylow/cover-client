import type { User } from '~/types/all'

export const useUserStore = defineStore('user', () => {
  const { $api }  = useNuxtApp()

  // State
  const user = ref<User>({ id: 0, email: '', credits: 0 })
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Methods
  const fetch = async (force = false) => {
    if (!force && user.value != null && user.value.email != '') return
    isLoading.value = true
    error.value = null
    try {
      const { data } = await useAsyncData<User>('user.fetch', () => $api('/api/v1/me'), { lazy: false })
      if (data.value)
        user.value = data.value
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const empty = computed(() => user.value.email == '')
  const email = computed(() => user.value?.email)
  const credits = computed(() => user.value?.credits)
  const id = computed(() => user.value?.id)
  
  // Return
  return { user, isLoading, error, fetch, empty, email, credits, id }
})