<script setup>
  useStream(useAuth())
</script>

<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
    <UNotifications />
  </div>
</template>
