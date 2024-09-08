<script setup>
  definePageMeta({
    middleware: 'auth',
  })
  const api = useResumeApi()

  const form = reactive({title: '', resume: ''})
  const isResumeValid = computed(() => form.resume.length >= 1)
  const isTitleValid = computed(() => form.title.length >= 1)
  const submit = async() => {
    const { data, error, status } = await api.create(form)
    useNotify().notifyWithStatus(status, {
      success: 'Saved successfully',
      error: error?.value?.data,
    })
    if (status.value == 'success') {
      navigateTo('/resumes')
    }
  }
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h1 class="title is-1">New Resume</h1>
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input class="input" v-model="form.title" />
        </div>
        <div class='help' :class="{'is-danger': !isTitleValid, 'is-success': isTitleValid}">Your title should be a minimum of 5 characters.</div>
      </div>
      <div class="field">
        <label class="label">Your Resume</label>
        <div class="control">
          <textarea class="textarea" v-model="form.resume"></textarea>
        </div>
        <div class='help' :class="{'is-danger': !isResumeValid, 'is-success': isResumeValid}">Your resume should be a minimum of 500 characters.</div>
      </div>
      <div class="field">
        <label class="label"> </label>
        <div class="control">
          <button class="button is-link" :disabled="false && (!isTitleValid || !isResumeValid)">Save Resume</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.field {
  margin-bottom: 1em;
}
</style>