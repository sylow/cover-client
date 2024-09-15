<script setup type="ts">
  const form = reactive({email: '', password: ''})
  const emits = defineEmits(['submit'])
</script>
<template>
  <form @submit.prevent="emits('submit', form)">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input class="input" type="email" placeholder="hello@" v-model="form.email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <br/>
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input class="input" type="password" v-model="form.password">
        <span class="icon is-small is-left">
          <i class="fa fa-key"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label"></label>
      <div class="control is-pulled-right">
        <a @click="navigateTo('/users/forgot_password')">Forgot your password?</a>
      </div>
    </div>
    <br/>

    <div class="field buttons">
        <button class="button is-primary"><slot name="button"></slot></button>
        <slot name="sign_up"></slot>
    </div>
  </form>
</template>

<style lang="css" scoped>
  .button{
    width: 100%;
  }
</style>