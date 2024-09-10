import { useStorage } from '@vueuse/core'
import { type AuthData } from '~/types/all'

export function useAuth() {
  const defaultAuthData: AuthData = {
    token: '',
    exp: '',
    email: ''
  }

  const authData = useCookie<AuthData>('authData',
    {
      default: () => (defaultAuthData)
    }
  )

  const signIn = (userData: AuthData) => {
    authData.value = { token: userData.token, exp: userData.exp, email: userData.email }
  }

  const signOut = () => {
    authData.value = defaultAuthData
  }

  const token = computed(() => authData.value?.token)
  const email = computed(() => authData.value?.email)
  const exp= computed(() => authData.value?.exp)

  const isAuthenticated = computed(() => authData.value?.token !== '')

  return { token, email, exp, isAuthenticated, signIn, signOut }
}
