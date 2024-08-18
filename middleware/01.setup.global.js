export default defineNuxtRouteMiddleware(async to => {
  // skip middleware on client side entirely
  if (import.meta.client) return

  // Call the composable to handle
  // fetch auth data based on cookie token
  await useAuthFetch()
})