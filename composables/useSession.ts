import type { NuxtError } from '#app'
import type { Login, AuthData, CallResult } from '~/types/all'
import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'


export function useSession() {
  const auth = useAuth()
  const { $api } = useNuxtApp()
  const cookieToken = useCookie('token')

  const signIn = async(form: Login ): Promise<CallResult> => {
    return call('/api/v1/sessions', form)
  }

  const signUp = async(form: Login) => {
    return call('/api/v1/users', form)
  }

  // ------PRIVATE METHODS------
  const call = async(url: string, form: Login): Promise<CallResult> => {
    const { data, error } = await useAsyncData<AuthData>('covers.create',
      () => $api(url, {method: 'POST', body: form }) )

    if ( data.value ){
      finalize(data.value)
      return { data }
    }
    if (error.value) {
      return { error }
    }

    return { error: ref(createError({ statusCode: 404, statusMessage: 'Resource not found' })) };
  }

  const finalize = ( data: AuthData ) => {
    cookieToken.value = data.token
    auth.signIn(data)
  }

  return { signUp, signIn }
}