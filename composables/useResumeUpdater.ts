import type { Resume } from '~/types/all'
interface FinalizeMessages {
  success: string;
  error: string;
}

export function useResumeUpdater() {
  const toast = useToast()

  const create = async(form:Resume) => {

    const { data, status, error } = await useCustomFetch('/api/v1/resumes', { method: 'POST', body: form, dedupe: 'defer' })

    finalize(status, {success: 'You have successfully created a new resume', error: 'Oppssss we have a problem' })

    return { data, status, error }
  }

  const finalize = (status: Ref<string>, messages: FinalizeMessages) => {
    if (status.value == 'success'){
      toast.add({title: 'Success', description: messages.success, color: 'green'})
      navigateTo('/resumes')
    }else{
      toast.add({title: 'Fail!!!', description: messages.error, color: 'red'})
    }
  }

  return { create }
}