<script setup>
  useStream(useAuth())
</script>

<template>
  <div>
    <SiteHeader />
    <NuxtPage />
    <UNotifications />
  </div>
</template>
