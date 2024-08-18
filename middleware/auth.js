export default defineNuxtRouteMiddleware(() => {
  // Retrieve the user's authentication status using the useAuth composable
  const userAuth = useAuth()

  // Check if the user is authenticated
  if (userAuth.isAuthenticated.value)
    return
  else
    return navigateTo('/sessions/sign_in')
})