export default defineNuxtRouteMiddleware(async (to, _) => {
  const userAuth = useAuth()
  const userStore = useUserStore()

  // Check if the user is authenticated
  // if (!userAuth.isAuthenticated.value)
  //   return

  // if (userStore.empty.value)
    await userStore.fetch()

})