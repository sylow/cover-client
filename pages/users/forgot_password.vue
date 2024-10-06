<script setup lang="ts">
  import type { Login, ApiError } from '~/types/all'
  definePageMeta({ layout: 'naked' })

  const email = ref('')
  const toast = useToast()
  const disableButton = ref(false)

  const submit = async (email: string) => {
    disableButton.value = true
    try {
      const result = await useUserApi().forgot(email)
      toast.add({ title: 'Sent!!', description: result, color: 'green' })
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An unknown error occurred'
      toast.add({ title: 'Error', description: error, color: 'red' })
    } finally {
      disableButton.value = false
    }
  }
</script>

<template>
  <div class="columns">
    <div class="column is-half notification">
      <div>
        <section class="hero">
          <div class="hero-body">
            <p class="title">Forgot Password?</p>
            <p class="subtitle">We will send a link to you.</p>
          </div>
        </section>

        <form @submit.prevent="submit(email)">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" placeholder="hello@" v-model="email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field buttons">
              <button class="button is-primary" :class="{'is-loading': disabled}" :disabled="disabled">Send me a link</button>
          </div>
        </form>
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
