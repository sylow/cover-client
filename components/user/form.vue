<script setup type="ts">
  const props = defineProps(['form'])
</script>
<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input class="input" type="email" placeholder="hello@" v-model="props.form.email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input class="input" type="password" v-model="props.form.password">
        <span class="icon is-small is-left">
          <i class="fa fa-key"></i>
        </span>
      </div>
    </div>
    <div class="field buttons">
      <div class="control">
        <button class="button"><slot></slot></button>
      </div>
    </div>

  </div>
</template>