<script setup type="ts">
  const toast = useToast()
  const auth = useAuth()

  const form = reactive({email: '', password: ''})
  const submit = async() => {
    const { data, status, error} = await useCustomFetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (status.value == 'success'){
      auth.signIn(data.value)
      toast.add({title: 'Success', description: 'You have successfully signed up', color: 'blue'})
      navigateTo('/secure')
    }else{
      toast.add({title: 'Ooppsss', description: error.value.data.error.join(". "), color: 'red'})
    }

  }
</script>
<template>
  <div class="container is-small">
    <div class="notification">
      <h1 class="title is-1">Sign Up</h1>
      <form @submit.prevent="submit">
        <UserForm :form="form">
          Sign Up
        </UserForm>
      </form>
    </div>
  </div>
</template>