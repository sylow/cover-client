<template>
 <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">Packages </a>
    <div class="navbar-dropdown is-boxed">
      ={{  packages }}=
      <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">1 credit for $1 </a>
      <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">10 credits for $7 </a>
      <a class="navbar-item" href="https://bulma.io/documentation/form/general/">30 credits for 15</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { $api } = useNuxtApp()
  onMounted(() => {
    const { data: packages } = useAsyncData('packages', () => $api('/api/v1/packages', { dedupe: 'defer' }))
  })
</script>
