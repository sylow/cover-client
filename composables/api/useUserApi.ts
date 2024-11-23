export function useUserApi() {
  const { $api }  = useNuxtApp()

  const sendVerificationEmail = async () => {
    const { error } = await useAsyncData( 'users.confirmation-email',
      () => $api('/api/v1/me/send_verification_email', {
        method: 'POST',
      })
    )

    if (error.value) {
      throw error.value
    }

    return 'Sent you a link to confirm your email'

  }

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

  const updatePassword = async (password: string, token: string) => {
    if (!password) {
      throw new Error('Password is required')
    }
    if (!token) {
      throw new Error('Token is required')
    }
    if (password.length < 8) {
      throw new Error('Password is too short')
    }
    const { error } = await useAsyncData( 'users.update-password',
      () => $api(`/api/v1/password_resets/${token}`, {
        method: 'PATCH',
        body: { password, token },
      })
    )

    if (error.value) {
      throw error.value
    }

    return 'Your have updated your password successfully'
  }

  const verifyEmail = async (token: string | null) => {
    if (!token) {
      throw new Error('Token is required')
    }
    const { data, error } = await useAsyncData('users.verify-email',
      () => $api(`/api/v1/users/verify_email`, {
        method: 'POST',
        body: { token },
      }),{server: true, lazy: false}
    )
    if (error.value) {
      throw new Error(error.value?.data?.message || "Unexpected error when verifying youremail")
    }

    return 'Your have verified your email successfully'
  }

  return { forgot, updatePassword, sendVerificationEmail, verifyEmail }
}