import type { Resume } from '~/types/all'
interface FinalizeMessages {
  success: string;
  error: string[] | null;
}

export function useResumeApi() {
  const { $api }  = useNuxtApp()

  const toast = useToast()

  const create = async(form:Resume) => {
    const { data, error, status } = await useAsyncData('resumes.create',
                                () => $api('/api/v1/resumes', {method: 'POST', body: { resume: form }  }) )
    return { data, error, status }
  }

  return { create }
}