import { type  Resume } from '~/types/all'

export function useResumes() {
  const { $api } = useNuxtApp()

  const { data, error } = useAsyncData<{ value: Resume[] }>('resumes', () => $api('/api/v1/resumes') )

  return { data, error }
}
