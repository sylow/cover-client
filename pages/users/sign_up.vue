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
  <div class="columns">
    <div class="column is-half signin">
      <img src="/images/sign_in.webp" />
    </div>

    <div class="column is-half notification">
      <div style="width: 50%;">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Join Us Today!</p>
            <p class="subtitle">Create an account to get started.</p>
          </div>
        </section>
        <UserForm @submit="(form) => submit(form)">
          <template v-slot:button>
            Sign Up
          </template>
          <template v-slot:sign_up>
            <div class="help">We will send you an email to confirm your email address</div>
          </template>
        </UserForm>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .notification > * {
    height: 450px;
    padding: 6em 2em;
    margin: 0 auto;
    min-width: 400px;
  }
  .hero .hero-body{
    padding: 0;
    margin: 0 0 2em 0;
  }
  .signin{
    padding: 0;
  }
</style>
