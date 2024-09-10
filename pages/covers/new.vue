<script setup lang="ts">
  import type { Resume } from '~/types/all'

  definePageMeta({
    middleware: 'auth'
  })
  const { resumes, all } = useResumeStore()


  const toast = useToast()
  const api = useCoverApi()
  const form = reactive({resume_id: null, project: ''})
  const isValid = computed(() => form.project.length >= 0)
  const isProjectValid = computed(() => form.project.length >= 0)

  const submit = () => {
    api.create(form)
  }
</script>

<template>
  <div class="container">
    <SiteError v-model="error" />
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Resume</label>
        <div class="control">
          <div class="select">
            <select v-model="form.resume_id">
              <option v-for="resume in resumes" :key="resume.id" :value="resume.id">{{ resume.title }} ({{  resume.created_at }})</option>
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