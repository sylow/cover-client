import type { Resume } from '~/types/all'

export function useResumeApi() {
  const { $api }  = useNuxtApp()

  const create = async(form:Resume) => {
    const { data, error, status } = await useAsyncData('resumes.create',
                                () => $api('/api/v1/resumes', {method: 'POST', body: { resume: form }  }) )
    return { data, error, status }
  }

  const fetch = () => {
    return useAsyncData<Resume[]>('resumes', async () => $api('/api/v1/resumes') )
  }

  return { fetch, create }
}