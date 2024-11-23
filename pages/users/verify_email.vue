<script setup lang="ts">
import { useNuxt } from 'nuxt/kit';
import type { Login, ApiError } from '~/types/all'
definePageMeta({ layout: 'naked'})

const nuxtApp = useNuxtApp()
const isServer = computed(() => nuxtApp.ssrContext?.event ? true : false)

const toast = useToast()
const route = useRoute()
const token = route.query.token
if (process.server) {
  try {
    const result = await useUserApi().verifyEmail(token)
    console.log(result)
    toast.add({ title: 'Verified!!', description: "Now you can sign in to your account", color: 'green' })
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An unknown error occurred'
    toast.add({ title: 'Error', description: error, color: 'red' })
  }
}
</script>

<template>
  <div class="columns">

    <div class="column is-half left">
      <div style="width: 50%;">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Verifying Email</p>
            <p class="subtitle">We are verifying your email right now...</p>
          </div>
        </section>
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

