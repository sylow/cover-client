<script setup type="ts">
  const toast = useToast()
  const auth = useAuth()

  const form = reactive({email: '', password: ''})
  const submit = async() => {
    const { data, status} = await useCustomFetch('/api/v1/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    if (status.value == 'success'){
      auth.signIn(data.value)
      toast.add({title: 'Success', description: 'You have successfully signed in', type: 'is-success'})
      navigateTo('/secure')
    }else{
      toast.add({title: 'Fail!!!', description: 'Check your email/password', type: 'is-error'})
    }

  }
</script>
<template>
  <div class="container is-small" style="margin-top:2em">
    <div class="notification">
      <h1 class="title is-1">Sign In</h1>
      <form @submit.prevent="submit">
        <UserForm :form="form">
          Sign In
        </UserForm>
      </form>
    </div>
  </div>
</template>