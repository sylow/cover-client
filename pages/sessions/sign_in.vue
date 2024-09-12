<script setup lang="ts">
  import type { Login, ApiError } from '~/types/all'
  definePageMeta({ layout: 'naked' })

  const session = useSession()
  const toast = useToast()

  const submit = async(form: Login) => {
    try {
      const { data, error } = await session.signIn(form)

      if (error?.value) {
        const errorMessage = (error.value as ApiError)?.data?.error || error.value.message || 'An unexpected error occurred';
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
  <div class="columns">

    <div class="column is-half notification">
      <div style="width: 50%;">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Welcome Back</p>
            <p class="subtitle">Please enter your login details below.</p>
          </div>
        </section>
        <UserForm @submit="(form) => submit(form)">
          <template v-slot:button>
            Sign In
          </template>
          <template v-slot:sign_up>
            <div class="help">Don't have an account? <a @click="navigateTo('/users/sign_up')">Sign up for free</a></div>
          </template>
        </UserForm>
      </div>
    </div>
    <div class="column is-half signin">
      <img src="/images/sign_in.webp" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .notification {
    padding: 9% 0;
  }
  .notification > * {
    margin: 0 auto;
    min-width: 365px;
    height: 450px;
  }

  .hero .hero-body{
    padding: 0;
    margin: 0 0 2em 0;
  }

  .signin{
    padding: 0;
  }

  .column {
    display: flex;
  }
</style>
