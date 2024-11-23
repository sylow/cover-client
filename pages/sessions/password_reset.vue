<script setup lang="ts">
import type { Login, ApiError } from '~/types/all'
definePageMeta({ layout: 'naked' })

const toast = useToast()
const route = useRoute()
const token = route.query.token

const password = ref('')
const password_confirmation = ref('')

const loading = ref(false)
const isSent = ref(false)

const validated = computed(() => {
  return (
    password.value.length >= 8 &&
    password_confirmation.value.length >= 8 &&
    password.value === password_confirmation.value
  )
})

const submit = async () => {
  loading.value = true
  try {
    const result = await useUserApi().updatePassword(password.value, token)
    toast.add({ title: 'Updated!!', description: result, color: 'green' })
    isSent.value = true
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An unknown error occurred'
    toast.add({ title: 'Error', description: error, color: 'red' })
  } finally {
    loading.value = false
  }
}

// Validations
// Check if password length is sufficient
const isPasswordLengthValid = computed(() => password.value.length >= 8)

// Check if passwords match
const doPasswordsMatch = computed(() => password.value === password_confirmation.value)

// Combined validation (for form submission or overall validation status)
const isFormValid = computed(() => isPasswordLengthValid.value && doPasswordsMatch.value)
</script>

<template>
  <div class="columns">

    <div class="column is-half left">
      <div style="width: 50%;">
        <section class="hero">
          <div class="hero-body">
            <p class="title">Update Password</p>
            <p class="subtitle">You can update your password below.</p>
          </div>
        </section>
        <div class="notification is-primary is-light" v-if="isSent">
          You have just reset your password, now you can login again.<br/>
          <NuxtLink :to="{name: 'sessions-sign_in'}">Sign in</NuxtLink>
        </div>


        <form @submit.prevent="submit()" v-if="!isSent">
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="hello@" v-model="password">
            </div>
            <p class="help">Password must be 8 characters or longer</p>
          </div>
          <br/>
          <div class="field">
            <label class="label">Password Confirmation</label>
            <div class="control">
              <input class="input" type="password" placeholder="hello@" v-model="password_confirmation">
            </div>

          </div>
            <p v-if="password && !isPasswordLengthValid" class="help is-danger">
              Password must be 8 characters or longer
            </p>
            <p v-if="password && isPasswordLengthValid && !doPasswordsMatch" class="help is-danger">
              Passwords do not match
            </p>
            <p v-if="!password || isFormValid" class="help">&nbsp;
            </p>

          <div class="field buttons">
            <button class="button is-primary" :class="{'is-loading': loading}" :disabled="!isFormValid || loading">Update Password</button>
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

