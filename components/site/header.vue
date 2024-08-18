<script setup>
  const { isAuthenticated, email, signOut } = useAuth()
  const cookieToken = useCookie('token')
  const signOutAndNavigate = async() => {
    await signOut()
    cookieToken.value = ''
    navigateTo('/')
  }
</script>
<template>
  <div class="has-text-right" style="padding-right: 1em">
    <div v-if="isAuthenticated">
      Welcome {{ email }} <br/>
      <NuxtLink @click="navigateTo('/')">Home</NuxtLink>
      |
      <NuxtLink @click="navigateTo('/secure')">Secure Page</NuxtLink>
      |
      <NuxtLink @click="signOutAndNavigate">Sign out</NuxtLink>
    </div>
    <div v-else>
      <NuxtLink @click="navigateTo('/sessions/sign_in')">Sign in</NuxtLink>
      |
      <NuxtLink @click="navigateTo('/users/sign_up')">Sign up</NuxtLink>
    </div>
  </div>
</template>