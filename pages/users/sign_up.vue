<script setup lang="ts">
  import type { Login, ApiError } from '~/types/all'

  const session = useSession()
  const toast = useToast()

  const submit = async(form: Login) => {
    try {
      const { data, error } = await session.signUp(form)

      if (error?.value) {
        const errorMessage = (error.value as ApiError)?.data?.error || error.value.message || 'An unexpected error occurred';
        toast.add({ title: 'Sign Up Failed', description: errorMessage, color: 'red' })
        return
      }

      if (data?.value) {
        toast.add({ title: 'Success', description: 'Signed up successfully', color: 'green' })
        navigateTo('/')
      } else {
        toast.add({ title: 'Error', description: 'No data received from server', color: 'red' })
      }
    } catch (e) {
      console.error('Unexpected error during sign up:', e)
      toast.add({ title: 'Error', description: 'An unexpected error occurred', color: 'red' })
    }
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