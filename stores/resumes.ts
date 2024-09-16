import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Resume } from '~/types/all'

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref<Resume[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async () => {
    if (resumes.value.length > 0) return

    isLoading.value = true
    error.value = null

    try {
      const { data } = await useResumeApi().fetch()
      resumes.value = data.value || []
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
      isLoading.value = false
    }
  }

  const empty = computed(() => resumes.value.length === 0)

  return { resumes, isLoading, error, fetch, empty }
})