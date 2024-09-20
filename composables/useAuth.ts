import { useStorage } from '@vueuse/core'
import { type AuthData } from '~/types/all'

export function useAuth() {
  const defaultAuthData: AuthData = {
    token: '',
    exp: '',
    email: '',
    id: 0
  }

  const authData = useCookie<AuthData>('authData',
    {
      default: () => (defaultAuthData)
    }
  )

  const signIn = (userData: AuthData) => {
    authData.value = { token: userData.token, exp: userData.exp, email: userData.email, id: userData.id }
  }

  const signOut = async() => {
    authData.value = defaultAuthData
    const cookieToken = useCookie('token')
    cookieToken.value = ''
    navigateTo('/')

  }

  const token = computed(() => authData.value?.token)
  const email = computed(() => authData.value?.email)
  const exp = computed(() => authData.value?.exp)
  const id = computed(() => authData.value?.id)

  const isAuthenticated = computed(() => {
    return (authData.value?.token !== '' && authData.value?.exp !== '' && Date.parse(authData.value?.exp) > new Date().getTime())
  })

  return { token, email, exp, id, isAuthenticated, signIn, signOut }
}
