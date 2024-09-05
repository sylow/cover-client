<script setup>
  definePageMeta({
    middleware: 'auth',
  })

  const form = reactive({resume: '', project: '', account: {email: '', password: ''}})
  const isValid = computed(() => form.project.length >= 200)
  const isProjectValid = computed(() => form.project.length >= 200)
  const submit = () => {
    console.log('Form submitted', form)
  }
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Resume</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Project/Job Posting</label>
        <div class="control">
          <textarea class="textarea" v-model="form.project"></textarea>
        </div>
        <div class='help' :class="{'is-danger': !isProjectValid, 'is-success': isProjectValid}">The job/project should be a minimum of 200 characters.</div>
      </div>
      <div class="field">
        <label class="label"> </label>
        <div class="control">
          <button class="button is-link" :disabled="!isValid">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 2em;
}
.field {
  margin-bottom: 1em;
}
</style>