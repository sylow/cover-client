<script setup>
  const { isAuthenticated, email, signOut } = useAuth()
  const signOutAndNavigate = async() => {
    await signOut()
    navigateTo('/')
  }
</script>
<template>
  <div class="has-text-right" style="padding-right: 1em">
    <NuxtLink @click="navigateTo('/secure')">Secure Page</NuxtLink>
      |
    <div v-if="isAuthenticated">
      Welcome {{ email }}
      <NuxtLink @click="signOutAndNavigate">Sign out</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink @click="navigateTo('/sessions/sign_in')">Sign in</NuxtLink>
      |
      <NuxtLink @click="navigateTo('/users/sign_up')">Sign up</NuxtLink>
    </div>
  </div>
</template>