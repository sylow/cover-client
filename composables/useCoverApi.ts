import type { Cover } from '~/types/all'
interface FinalizeMessages {
  success: string;
  error: string;
}

export function useCoverApi() {
  const { $api }  = useNuxtApp()
  const toast = useToast()

  const create = async(form:Cover) => {
    const { data, error, status } = await useAsyncData('covers.create',
                () => $api('/api/v1/covers', {method: 'POST', body: { cover: form }  }) )

    return { data, status, error }
  }

  return { create }
}