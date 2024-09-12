<script setup lang="ts">
  import type { Resume } from '~/types/all'

  definePageMeta({
    middleware: 'auth'
  })
  const route = useRoute()
  const resumeStore = useResumeStore()
  const toast = useToast()
  const api = useCoverApi()

  const form = reactive({resume_id: Number(useRoute().query.resume_id) || 0, resume: '', project: '', options: {formality: 'formal'}})
  const isValid = computed(() => form.project.length >= 100 && form.resume_id > 0)
  const isProjectValid = computed(() => form.project.length >= 100)

  const selectedResume = computed(() => resumeStore.resumes.find((resume: Resume) => resume.id === form.resume_id))

  const submit = () => {
    api.create(form)
  }
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Cover Letter Generator</p>
        <p class="subtitle">Generate a personalized cover letter based on your project and resume details.</p>
      </div>
    </section>
    <div class="container">
      <form @submit.prevent="submit">
        <div class="field">
          <label class="label">Project/Job Posting</label>
          <div class="control">
            <textarea class="textarea" v-model="form.project"></textarea>
          </div>
          <div class='help' :class="{'is-danger': !isProjectValid, 'is-success': isProjectValid}">The job/project should be a minimum of 100 characters.</div>
        </div>

        <div class="field" style="display: flex">
          <aside class="menu" style="flex: 0 0 230px;">
            <strong>Select Resume</strong>
            <ul class="menu-list">
              <li v-for="{ id, title } in resumeStore.resumes" :key="id" :value="id">
                <a :class="{'is-active': form.resume_id == id}" @click="form.resume_id = id">{{ title }}</a>
              </li>
            </ul>
            <p class="menu-label">New Resume</p>
            <ul class="menu-list">
              <li>
                <router-link to="/resumes/new">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  New Resume
                </router-link>
              </li>
            </ul>
          </aside>
          <div>
            <div class="notification is-primary">
                {{ selectedResume ? selectedResume.resume : ''}}
            </div>
            <div class='help' :class="{'is-danger': form.resume_id === 0, 'is-success': form.resume_id > 0}">Select one of your resumes.</div>
          </div>
        </div>

        <div class="field">
          <label class="label">Formal?</label>
          <div class="control">
            <label class="radio">
              <input type="radio" v-model="form.options.formality" value="formal"/> Formal
            </label>

            <label class="radio">
              <input type="radio" v-model="form.options.formality" value="informal"/> Informal
            </label>
          </div>
        </div>


        <div class="field">
          <label class="label"> </label>
          <div class="control">
            <button class="button is-link" :disabled="!isValid">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 2em;
}
.field {
  margin-bottom: 1em;
}

.notification {
  white-space: pre-wrap; /* Preserve whitespace and wrap long lines */
  overflow-y: auto;      /* Add vertical scrollbars when content overflows */
  height: 250px;
  width: 100%;
}
</style>