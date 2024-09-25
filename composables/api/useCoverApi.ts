import type { CoverForm, CoverApi } from '~/types/all'

export function useCoverApi() {
  const { $api }  = useNuxtApp()

  const create = async (form: CoverForm): Promise<CoverApi> => {
    const { data, error } = await useAsyncData(
      'covers.create',
      () => $api('/api/v1/covers', {
        method: 'POST',
        body: { cover: form },
        dedupe: 'cancel'
      })
    )

    if (error.value) {
      throw error.value
    }

    return data.value as CoverApi
  }

  const fetch = async (): Promise<CoverApi[]> => {
    const { data, error } = await useAsyncData<CoverApi[]>(
      'covers.fetch',
      () => $api('/api/v1/covers')
    )

    if (error.value) {
      throw error.value
    }

    return data.value as CoverApi[]
  }

  const run = async (id: number): Promise<void> => {
    const { error } = await useAsyncData(
      'covers.run',
      () => $api(`/api/v1/covers/${id}/run`, {
        method: 'POST',
      })
    )

    if (error.value) {
      throw error.value
    }
  }

  return { create, fetch, run }
}
