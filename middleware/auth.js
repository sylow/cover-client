export default defineNuxtRouteMiddleware(async (to, _) => {
  // Retrieve the user's authentication status using the useAuth composable
  const userAuth = useAuth()
  const resumeStore = useResumeStore()
  const userStore = useUserStore()

  // Check if the user is authenticated
  if (!userAuth.isAuthenticated.value)
    return navigateTo('/sessions/sign_in')

  if (resumeStore.empty)
    await resumeStore.fetch()
  if (userStore.empty)
    await userStore.fetch()
})