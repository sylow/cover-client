<script setup>
  definePageMeta({
    middleware: 'auth',
  })
  const api = useResumeUpdater()

  const form = reactive({title: '', content: ''})
  const isResumeValid = computed(() => form.content.length >= 500)
  const isTitleValid = computed(() => form.title.length >= 5)
  const submit = () => {
    const { data, error, status } = api.create(form) //useCustomFetch('/api/v1/resumes', { method: 'POST', body: form })
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
        <div class='help' :class="{'is-danger': !isTitleValid, 'is-success': isResumeValid}">Your title should be a minimum of 5 characters.</div>
      </div>
      <div class="field">
        <label class="label">Your Resume</label>
        <div class="control">
          <textarea class="textarea" v-model="form.content"></textarea>
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