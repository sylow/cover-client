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
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <NuxtLink class="navbar-item" to="/">
        Home
      </NuxtLink>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start" v-if="isAuthenticated">
        <NuxtLink class="navbar-item" to="/resumes">Resumes</NuxtLink>
        <NuxtLink class="navbar-item" to="/covers">Covers</NuxtLink>
      </div>

      <div class="navbar-end">
        <div class="buttons">
            <div v-if="isAuthenticated">Welcome {{ email }}</div>
            <NuxtLink class='button' @click="signOutAndNavigate" v-if="isAuthenticated">Sign out</NuxtLink>
            <NuxtLink class='button' @click="navigateTo('/sessions/sign_in')" v-if="!isAuthenticated">Sign in</NuxtLink>
            <NuxtLink class='button'  @click="navigateTo('/users/sign_up')" v-if="!isAuthenticated">Sign up</NuxtLink>
          </div>
      </div>
    </div>
  </nav>
</template>
<style scoped lang="scss">
.buttons {
  margin-top: 0;
  margin-right: 1em;
}
</style>