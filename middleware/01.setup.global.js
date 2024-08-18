export default defineNuxtRouteMiddleware(async to => {
  const auth = useAuth()
  const cookieToken = useCookie('token')

  // skip middleware on client side entirely
  if (import.meta.client) return
  // or only skip middleware on initial client load
  const nuxtApp = useNuxtApp()
  if (!cookieToken.value) return

  console.log('Checking token')
  const { data, status } = await useCustomFetch(`/api/v1/sessions/refresh?token=${cookieToken.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if(status.value == 'success') {
    auth.signIn(data.value)
  } else {
    cookieToken.value = ''
  }
  // if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})