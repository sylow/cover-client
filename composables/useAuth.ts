import { useStorage } from '@vueuse/core'
import { type  UserData, type AuthData } from '~/types/auth'

export function useAuth() {
  // const authData: Ref<AuthData | null> = useStorage<AuthData>('authData',  { token: '', exp: '', email: '' })

  const authData = useState<AuthData>('authData', () => ({
    token: '',
    exp: '',
    email: ''
  }))

  const signIn = (userData: UserData) => {
    authData.value = { token: userData.token, exp: userData.exp, email: userData.email }
  }

  const signOut = () => {
    authData.value = {
      token: '',
      exp: '',
      email: ''
    }
  }

  const token = computed(() => authData.value?.token)
  const email = computed(() => authData.value?.email)
  const exp= computed(() => authData.value?.exp)

  const isAuthenticated = computed(() => authData.value?.token !== '')

  return { token, email, exp, isAuthenticated, signIn, signOut }
}
