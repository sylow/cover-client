<script setup lang="ts">
  import type { Resume, CoverForm } from '~/types/all'

  definePageMeta({
    middleware: 'auth'
  })

  const route = useRoute()
  const resumeStore = useResumeStore()
  const toast = useToast()
  const api = useCoverApi()

  const form = reactive<CoverForm>({ resume_id: Number(route.query.resume_id) || 0, job_description: '',
                                 options: {formality: 'formal', words: 250, perspective: '1st person'}})
  const isValid = computed(() => form.job_description.length >= 100 && (form.resume_id ?? 0) > 0)
  const isProjectValid = computed(() => form.job_description.length >= 100)
  const selectedResume = computed(() => resumeStore.resumes.find((resume: Resume) => resume.id === form.resume_id))


  onMounted(() => {
    if (form.resume_id  === 0) {
      form.resume_id = resumeStore.resumes[0]?.id ?? 0
    }
  })
  if (resumeStore.empty) {
    toast.add({description: 'You need to create a resume first.', color: 'red'})
    navigateTo('/resumes/new')
  }

  const submit = async () => {
    try {
      const cover = await api.create(form)
      toast.add({ description: 'Cover Letter created successfully.', color: 'green' })
      navigateTo({ name: 'covers-id', params: { id: cover.id } })
    } catch (error) {
      toast.add({ description: (error as Error).message, color: 'red' })
    }
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
    <main>
      <form @submit.prevent="submit">
        <div class="field">
          <label class="label">Project/Job Posting</label>
          <div class="control">
            <textarea class="textarea" v-model="form.job_description"></textarea>
          </div>
          <div class='help' :class="{'is-danger': !isProjectValid, 'is-success': isProjectValid}">The job/project should be a minimum of 100 characters.</div>
        </div>

        <div class="field" style="display: flex;">
          <div style="width:100%">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click.prevent="">
                  <span>Your Resume List</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" :class="{ 'is-active': form.resume_id == id }" @click="form.resume_id = id" v-for="{ id, title } in resumeStore.resumes" :key="id" :value="id">{{ title }}</a>
                </div>
              </div>
            </div>
            <div class="notification is-light">
                {{ selectedResume ? selectedResume.resume : ''}}
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Tone of the Letter:</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="form.options.formality" value="formal"/> Formal
                </label>
                &nbsp;
                <label class="radio">
                  <input type="radio" v-model="form.options.formality" value="informal"/> Informal
                </label>
              </div>
              <p class="help">Formal: professional tone, suitable for business settings. Informal: conversational tone, casual.</p>
            </div>
          </div>
        </div>


        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Desired Length of Letter</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="form.options.words">
                    <option v-for="item in [250, 400, 600, 800, 1000]" :value="item" :key="item">Around {{ item }} words</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Perspective:</label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <label class="radio">
                  <input type="radio" v-model="form.options.perspective" value="1st person"/> 1st Person
                </label>
                &nbsp;
                <label class="radio">
                  <input type="radio" v-model="form.options.perspective" value="3rd person"/> 3rd Person
                </label>
              </div>
              <p class="help">Formal: professional tone, suitable for business settings. Informal: conversational tone, casual.</p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label"></label>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control">
                <button class="button is-info" :disabled="!isValid">Save & Go to Step 2</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
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
  width: 100%;
  white-space: pre-wrap; /* Preserve whitespace and wrap long lines */
  overflow-y: auto;      /* Add vertical scrollbars when content overflows */
  height: 250px;
  width: 100%;
  margin-top: 2px;
}
</style>