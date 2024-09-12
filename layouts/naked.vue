<script setup>
  useHead({
    htmlAttrs: {
      'data-theme':"light",
    }
  })
</script>

<template>
  <div>
    <NuxtPage />
    <SiteFooter />
    <UNotifications />
  </div>
</template>

<style scoped lang="scss">
  .container {
    margin-top: 2em;
  }
</style>