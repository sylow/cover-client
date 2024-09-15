import type { CoverForm, CoverApi } from '~/types/all'

export function useCoverApi() {
  const { $api }  = useNuxtApp()

  const create = async(form:CoverForm) => {
    return useAsyncData( 'covers.create',
                  () => $api('/api/v1/covers', {
                    method: 'POST',
                    body: { cover: form }
                  })
                )
  }

  const fetch = () => {
    return useAsyncData<CoverApi[]>('covers', () => $api('/api/v1/covers'))
  }

  const pay = (id: number) => {
    return useAsyncData( 'covers.runtIt',
                  () => $api(`/api/v1/covers/${id}/pay`, {
                    method: 'POST',
                    dedupe: 'cancel'
                  })
                )
  }

  return { create, fetch, pay }
}
