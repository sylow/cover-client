import type { Login } from '~/types/all'
import { useAuth } from '~/composables/useAuth'
import { useCookie } from '#app'
import { useResumeStore } from '~/stores/resumes'

export function useSession() {
  const auth = useAuth()
  const toast = useToast()
  const cookieToken = useCookie('token')
  const { fetch: fetchResumes} = useResumeStore()

  const signIn = async(form: Login ) => {
    const { data, status, error } = await call('/api/v1/sessions', form)
    finalize(status, data, {success: 'You have successfully signed in', error: 'Check your email/password' })
  }

  const signUp = async(form: Login) => {
    const { data, status, error } = await call('/api/v1/users', form)
    finalize(status, data, {success: 'You have successfully signed up', error: error?.value?.data.error.join(". ")})
  }

  const call = async(url: string, form: Login) => {
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
      toast.add({title: 'Success', description: messages.success, color: 'green'})
      fetchResumes()
      const redirectTo = useState('redirectTo')
      if (redirectTo.value){
        useState('redirectTo', () => '')
        navigateTo(redirectTo.value)
      }
      else
        navigateTo('/')
    }else{
      toast.add({title: 'Fail!!!', description: messages.error, color: 'red'})
    }
  }

  return { signUp, signIn }
}