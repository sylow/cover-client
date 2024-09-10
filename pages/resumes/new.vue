<script setup>
  definePageMeta({
    middleware: 'auth',
  })

  const minimumLenghts = {
    title: 10,
    resume: 500,
  }

  const api = useResumeApi()
  const form = reactive({title: '', resume: ''})

  const isTitleValid = computed(() => form.title.length >= minimumLenghts.title)
  const isResumeValid = computed(() => form.resume.length >= minimumLenghts.resume)

  const submit = async() => {
    const { error, status } = await api.create(form)
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
        <div class='help' :class="{'is-danger': !isTitleValid, 'is-success': isTitleValid}">Your title should be a minimum of {{ minimumLenghts.title }} characters.</div>
      </div>
      <div class="field">
        <label class="label">Your Resume</label>
        <div class="control">
          <textarea class="textarea" v-model="form.resume"></textarea>
        </div>
        <div class='help' :class="{'is-danger': !isResumeValid, 'is-success': isResumeValid}">Your resume should be a minimum of {{ minimumLenghts.resume }} characters.</div>
      </div>
      <div class="field">
        <label class="label"> </label>
        <div class="control">
          <button class="button is-link" :disabled="!isTitleValid || !isResumeValid">Save Resume</button>
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