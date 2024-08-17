export default defineNuxtRouteMiddleware(() => {
  // Retrieve the user's authentication status using the useAuth composable
  const userAuth = useAuth()

  // Check if the user is authenticated
  if (userAuth.isAuthenticated) {
    // If the user is authenticated, navigate them to the sign-in page
    return navigateTo('/sessions/sign_in')
  }
  // If the user is not authenticated, allow the navigation to proceed as usual
})