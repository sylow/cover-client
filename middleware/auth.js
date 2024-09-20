export default defineNuxtRouteMiddleware(async (to, _) => {
  // Retrieve the user's authentication status using the useAuth composable
  const userAuth = useAuth()
  const resumeStore = useResumeStore()
  const userStore = useUserStore()
  const coverStore = useCoverStore()
  // Check if the user is authenticated
  if (!userAuth.isAuthenticated.value)
    return navigateTo('/sessions/sign_in')
  if (resumeStore.empty.value)
    await resumeStore.fetch()
  if (coverStore.empty.value)
    await coverStore.fetch()
  if (userStore.empty.value)
    await userStore.fetch()

})