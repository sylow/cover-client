import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'

export function useSession() {
  const auth = useAuth()
  const toast = useToast()
  const cookieToken = useCookie('token')

  const signIn = async(form) => {
    const { data, status, error } = await call('/api/v1/sessions', form)
    finalize(status, data, {success: 'You have successfully signed in', error: 'Check your email/password' })
  }

  const signUp = async(form) => {
    const { data, status, error } = await call('/api/v1/users', form)
    finalize(status, data, {success: 'You have successfully signed up', error: error.value.data.error.join(". ")})
  }

  const call = async(url, form) => {
    const { data, status, error} = await useCustomFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    return { data, status, error }
  }

  const finalize = (status, data, messages) => {
    if (status.value == 'success'){
      cookieToken.value = data.value.token
      auth.signIn(data.value)
      toast.add({title: 'Success', description: messages.success, type: 'is-success'})

      const redirectTo = useState('redirectTo')
      if (redirectTo.value){
        useState('redirectTo', () => '')
        navigateTo(redirectTo.value)
      }
      else
        navigateTo('/')
    }else{
      toast.add({title: 'Fail!!!', description: messages.error, type: 'is-error'})
    }
  }

  return { signUp, signIn }
}