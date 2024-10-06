import type { ResumeApi } from '~/types/all'

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref<ResumeApi[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async (force=false) => {
    if (!force && resumes.value.length > 0) return

    isLoading.value = true
    error.value = null

    try {
      resumes.value = await useResumeApi().fetch()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
      isLoading.value = false
    }
  }

  const get= computed(() => (id: number) => resumes.value.find(resume => resume.id === id))

  const empty = computed(() => resumes.value.length === 0)

  return { resumes, isLoading, error, fetch, get, empty }
})
