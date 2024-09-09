<script setup lang="ts">
  import type { Login } from '~/types/all'
  const session = useSession()
  const toast = useToast()

  const submit = async(form: Login) => {
    try {
      const { data, error } = await session.signIn(form)

      if (error?.value) {
        const errorMessage = error.value?.data?.error || 'An unexpected error occurred'
        toast.add({ title: 'Sign In Failed', description: errorMessage, color: 'red' })
        return
      }

      if (data?.value) {
        toast.add({ title: 'Success', description: 'Signed in successfully', color: 'green' })
        navigateTo('/')
      } else {
        toast.add({ title: 'Error', description: 'No data received from server', color: 'red' })
      }
    } catch (e) {
      console.error('Unexpected error during sign in:', e)
      toast.add({ title: 'Error', description: 'An unexpected error occurred', color: 'red' })
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