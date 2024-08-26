<script setup>
  const form = reactive({resume: '', project: '', account: {email: '', password: ''}})
  const isValid = computed(() => form.resume.length > 0 && form.project.length > 0)

  const submit = () => {
    console.log('Form submitted', form)
  }
</script>

<template>
  <div class="container">{{ isValid }} {{ form }}
    <div class="field">
      <label class="label">Your Resume</label>
      <div>
        Please paste your resume text here. It should be a minimum of 500 characters to ensure sufficient detail. Focus on including your key skills, experiences, and achievements that showcase your professional background.
      </div>
      <div class="control">
        <textarea class="textarea" v-model="form.resume"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Project/Job Posting</label>
      <div>
        Please enter the details of the job posting or project here. It should be a minimum of 300 characters to provide enough context. Highlight the job responsibilities, required skills, and any other relevant information to tailor your application effectively.
      </div>
      <div class="control">
        <textarea class="textarea" v-model="form.project"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label"> </label>
      <div class="control">
        <button class="button is-link" :disabled="!isValid">Submit</button>
      </div>
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
</style>