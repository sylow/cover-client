import type { Login, AuthData } from '~/types/all'
import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'

interface ApiError extends Error {
  data?: {
    error?: string;
  };
}

type CallResult = {
  data?: Ref<AuthData | null>;
  error?: Ref<ApiError | null>;
};

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

    return { error: ref(new Error('No data received')) }
  }

  const finalize = ( data: AuthData ) => {
    cookieToken.value = data.token
    auth.signIn(data)
  }

  return { signUp, signIn }
}