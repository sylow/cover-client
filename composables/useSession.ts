import type { Login } from '~/types/all'
import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'
import { useResumeStore } from '~/stores/resumes'

export function useSession() {
  const auth = useAuth()
  const { $api } = useNuxtApp()
  const toast = useToast()
  const cookieToken = useCookie('token')

  const signIn = async(form: Login ) => {
    const { data, status, error } = await call('/api/v1/sessions', form)
    return { data, status, error }
  }

  const signUp = async(form: Login) => {
    const { data, status, error } = await call('/api/v1/users', form)

    finalize(data)
    return { data, status, error }
  }

  const call = async(url: string, form: Login) => {
    const { data, error, status } = await useAsyncData('covers.create',
      () => $api(url, {method: 'POST', body: form }) )

    finalize(data)
    return { data, status, error }
  }

  // ------PRIVATE METHODS------
  const finalize = ( data ) => {
    if (!data.value)
      return

    cookieToken.value = data.value.token
    auth.signIn(data.value)
  }

  return { signUp, signIn }
}