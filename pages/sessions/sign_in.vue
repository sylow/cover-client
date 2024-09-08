<script setup type="ts">
  const session = useSession()
  const toast = useToast()

  const submit = async(form) => {
    const { data, status, error } = await session.signIn(form)
    if (data.value)
      navigateTo('/')
    else if (error.value){
      toast.add({title: 'Opppsss', description: error.value.data.error, color: 'red'})
    }
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