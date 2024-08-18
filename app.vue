<script setup>
  const auth = useAuth()
  // const cookieToken = useCookie('token')

  // onMounted( () => {
  //   if (!auth.isAuthenticated.value) return

  //   const conversation = useConversation()
  //   useStream(conversation)
  // })

  useStream(auth)
</script>

<template>
  <div>
    {{  auth }}
    <SiteHeader />
    <NuxtPage />
    <UNotifications />
  </div>
</template>
