import type { Cover } from '~/types/all'

export function useCoverApi() {
  const { $api }  = useNuxtApp()

  const create = async(form:Cover) => {
    const { data, error, status } = await useAsyncData(
      'covers.create',
      () => $api('/api/v1/covers', {
        method: 'POST',
        body: { cover: form }
      }),
      {
        immediate: false
      }
    )
    return { data, status, error }
  }

  return { create }
}