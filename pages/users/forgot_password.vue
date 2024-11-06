<script setup lang="ts">
  import type { Login, ApiError } from '~/types/all'
  definePageMeta({ layout: 'naked' })

  const email = ref('')
  const toast = useToast()
  const disableButton = ref(false)
  const isSent = ref(false)

  const submit = async (email: string) => {
    disableButton.value = true
    try {
      const result = await useUserApi().forgot(email)
      toast.add({ title: 'Sent!!', description: result, color: 'green' })
      isSent.value = true
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

    <div class="column is-half left">
      <div style="width: 50%;">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Forgot Password?</p>
            <p class="subtitle">We will send a link to you.</p>
          </div>
        </section>
        <div class="notification is-primary is-light" v-if="isSent">
          Sent you a link to reset your password if the email ({{ email }}) is in our system. <br/>
          <NuxtLink to="/">Back to Home</NuxtLink>
        </div>

        <form @submit.prevent="submit(email)" v-if="!isSent">
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
              <button class="button is-primary" :class="{'is-loading': disableButton}" :disabled="disableButton">Send me a link</button>
          </div>
        </form>

      </div>
    </div>
    <div class="column is-half signin">
      <img src="/images/sign_in.webp" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .left {
    padding: 9% 0;
  }
  .left > * {
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

