<script setup>
  useHead({
    htmlAttrs: {
      class: 'has-navbar-fixed-top'
    }
  })
  useStream()
</script>

<template>
  <div>
    <SiteHeader />
    <SiteMessage/>
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