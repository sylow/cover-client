export function useUserApi() {
  const { $api }  = useNuxtApp()

  const forgot = async (email: string) => {
    if (!email) {
      throw new Error('Email is required')
    }
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) === false) {
      throw new Error('Email is invalid')
    }
    const { error } = await useAsyncData( 'users.forgot',
      () => $api('/api/v1/password_resets', {
        method: 'POST',
        body: { email },
      })
    )

    if (error.value) {
      throw error.value
    }

    return 'Sent you a link to reset your password if email is a valid'
  }

  return { forgot }
}