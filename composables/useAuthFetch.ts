import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'

export async function useAuthFetch() {
  const auth = useAuth()
  const cookieToken = useCookie('token')

  if (!cookieToken.value) return

  const { data, status } = await useCustomFetch(`/api/v1/sessions/refresh?token=${cookieToken.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (status.value === 'success') {
    auth.signIn(data.value)
  } else {
    cookieToken.value = ''
  }
}