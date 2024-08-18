<script setup>
  const auth = useAuth()
  onMounted( () => {
    if (!auth.isAuthenticated.value) return

    const conversation = useConversation()
    useStream(conversation)
  })
</script>

<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <UNotifications />
  </div>
</template>
