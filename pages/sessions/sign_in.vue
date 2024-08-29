<script setup type="ts">
  const session = useSession()
  const submit = async(form) => {
    session.signIn(form)
  }
</script>

<template>
  <div class="container is-small">
    <div class="notification">
      <h1 class="title is-1">Sign In</h1>
      <UserForm @submit="(form) => submit(form)">
        Sign In
      </UserForm>
    </div>
  </div>
</template>