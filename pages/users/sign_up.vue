<script setup type="ts">
  const session = useSession()
  const submit = async(form) => {
    session.signUp(form)
  }
</script>
<template>
  <div class="container is-small">
    <div class="notification">
      <h1 class="title is-1">Sign Up</h1>
      <UserForm @submit="(form) => submit(form)">
        Sign Up
      </UserForm>
  </div>
  </div>
</template>