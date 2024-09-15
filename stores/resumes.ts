import type { Resume } from '~/types/all'

export const useResumeStore = defineStore('resume', () => {
  const resumes = ref<Resume[]>([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetch = async () => {
    if (resumes.value.length === 0) {
      isLoading.value = true
      try {
        const { data } = await useResumeApi().fetch()
        resumes.value = data.value || []
      } catch (err) {
        error.value = err
      } finally {
        isLoading.value = false
      }
    }
  }

  const empty = computed(() => resumes.value.length === 0)

  return { resumes, isLoading, error, fetch, empty }
})