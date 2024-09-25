import type { CoverApi } from '~/types/all'

export const useCoverStore = defineStore('cover', () => {
  const covers = ref<CoverApi[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async (force=false) => {
    if (!force && covers.value.length > 0) return

    isLoading.value = true
    error.value = null

    try {
      covers.value = await useCoverApi().fetch()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
      isLoading.value = false
    }
  }

  const get = computed(() => (id: number) => covers.value.find(cover => cover.id === id))


  const empty = computed(() => covers.value.length === 0)

  return { covers, isLoading, error, fetch, empty, get }
})