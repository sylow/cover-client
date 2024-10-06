import type { ResumeForm, ResumeApi } from '~/types/all'

export function useResumeApi() {
  const { $api }  = useNuxtApp()

  const create = async (form: ResumeForm): Promise<ResumeApi> => {
    const { data, error } = await useAsyncData( 'covers.create',
      () => $api('/api/v1/resumes', {
        method: 'POST',
        body: { resume: form },
      })
    )

    if (error.value) {
      throw error.value
    }

    return data.value as ResumeApi
  }

  const fetch = async(): Promise<ResumeApi[]> => {
    const { data, error } = await useAsyncData<ResumeApi[]>('resumes', async () => $api('/api/v1/resumes'))
        if (error.value) {
      throw error.value
    }

    return data.value as ResumeApi[]

  }

  const enhance = async (id: number): Promise<void> => {
    const { error } = await useAsyncData(
      'covers.run',
      () => $api(`/api/v1/resumes/${id}/enhance`, {
        method: 'POST',
      })
    )

    if (error.value) {
      throw error.value
    }
  }
  return { fetch, create, enhance }
}