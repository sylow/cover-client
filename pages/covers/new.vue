<script setup lang="ts">
  import type { Resume } from '~/types/all'

  definePageMeta({
    middleware: 'auth'
  })

  const api = useCoverApi()
  const form = reactive({resume_id: null, project: ''})
  const isValid = computed(() => form.project.length >= 0)
  const isProjectValid = computed(() => form.project.length >= 0)
  const { data: resumes } = useAsyncData<{ value: Resume[] }>('resumes', () => useResumes() )

  const submit = () => {
    const { data, error, status } = api.create(form)
  }
</script>

<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="field">
        <label class="label">Resume</label>
        <div class="control">
          <div class="select">
            <select v-model="form.resume_id">
              <option v-for="{ id, title, created_at } in resumes" :key="id" :value="id">{{ title }} ({{  created_at }})</option>
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