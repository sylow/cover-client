<script setup>
  definePageMeta({
    middleware: 'auth',
  })

  const minimumLenghts = {
    title: 10,
    content: 500,
  }

  const api = useResumeApi()
  const form = reactive({title: '', resume: ''})

  const isTitleValid = computed(() => form.title.length >= minimumLenghts.title)
  const isResumeValid = computed(() => form.content.length >= minimumLenghts.content)

  const submit = async() => {
    const { error, status } = await api.create(form)
    useNotify().notifyWithStatus(status, {
      success: 'Saved successfully',
      error: error?.value?.data,
    })
    if (status.value == 'success') {
      await resumeStore.fetch(true)
      navigateTo('/resumes')
    }
  }
</script>

<template>
  <div>
  <section class="hero">
    <div class="hero-body">
      <p class="title">New Resume</p>
      <p class="subtitle">Craft your resume and take the next step in your career.</p>
    </div>
  </section>
  <main>
    <form @submit.prevent="submit">
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
          <textarea class="textarea" v-model="form.content"></textarea>
        </div>
        <div class='help' :class="{'is-danger': !isResumeValid, 'is-success': isResumeValid}">Your resume should be a minimum of {{ minimumLenghts.content }} characters.</div>
      </div>
      <div class="field">
        <label class="label"> </label>
        <div class="control">
          <button class="button is-primary" :disabled="!isTitleValid || !isResumeValid">Save Resume</button>
        </div>
      </div>
    </form>
  </main>
  </div>
</template>

<style scoped lang="scss">
.field {
  margin-bottom: 1em;
}
</style>