import type { Resume } from '~/types/all'

export const useResumeStore = defineStore('resumes', () => {
  const { $api } = useNuxtApp()

  const resumes = ref([])
  const error = ref(null)

  const fetch = () => {
    const { data: resumes, status, error } = useAsyncData<{ value: Resume[] }>('resumes', () => $api('/api/v1/resumes', {dedupe: 'defer'}) )
  }

  return { resumes, error, fetch }
})