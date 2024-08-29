export default defineNuxtRouteMiddleware((to, _) => {
  // Retrieve the user's authentication status using the useAuth composable
  const userAuth = useAuth()

  // Check if the user is authenticated
  if (userAuth.isAuthenticated.value)
    return
  else{
    useState('redirectTo', to.path || '/' )
    return navigateTo('/sessions/sign_in')
  }
})