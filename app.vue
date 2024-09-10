<script setup>
  useHead({
    htmlAttrs: {
      'data-theme':"dark",
    }
  })
  useStream()
</script>

<template>
  <div>
    <SiteHeader />
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