<script setup lang="ts">
  import type { Login, ApiError } from '~/types/all'
  definePageMeta({ layout: 'naked' })

  const session = useSession()
  const toast = useToast()
  const error = ref<ApiError | null>(null)

  const submit = async(form: Login) => {
    try {
      const { data, error: apiError } = await session.signUp(form)

      if (apiError?.value) {
        const errorMessage = (apiError.value as ApiError)?.data || apiError.value.message || 'An unexpected error occurred';
        toast.add({ title: 'Sign Up Failed', description: errorMessage, color: 'red' })
        return
      }

      if (data?.value) {
        toast.add({ title: 'Success', description: 'Signed up successfully', color: 'green' })
        navigateTo('/')
      } else if (apiError?.value){
        toast.add({ title: 'Error', description: apiError?.value.data, color: 'red' })
        error.value = apiError?.value.data.join(', ')
      }
    } catch (e) {
      console.error('Unexpected error during sign up:', e)
      toast.add({ title: 'Error', description: 'An unexpected error occurred', color: 'red' })
    }
  }
</script>
<template>
  <div class="columns">
    <div class="column is-half notification">
      <div>
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
            <div class="help">Do you have an account? <a @click="navigateTo('/sessions/sign_in')">Sign in</a></div>
          </template>
        </UserForm>
      </div>
    </div>
    <div class="column is-half signin">
      <img src="/images/sign_in.webp" />
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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

  .columns{
    margin-bottom: 0;
  }
</style>
