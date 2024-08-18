<script setup>
  const chatCallback = (message) => {
    if (message?.message == undefined) return
    console.log(message.message)
  }
  onMounted( () => {
    useStream(chatCallback)
  })
</script>

<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <UNotifications />
  </div>
</template>
