<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const route = useRoute()
  const coverStore = useCoverStore()
  const cover = computed(() => coverStore.get(Number(route.params.id)))

  const api = useCoverApi()
  const run = async (id: number) => {
    if (cover.value?.aasm_state != 'created')
      return
    await api.run(id)
  }

</script>

<template>
  <div>
    <section class="hero" v-if="cover?.aasm_state == 'completed'">
      <div class="hero-body">
        <p class="title">Cover Letter Details</p>
        <p class="subtitle">View and manage your cover letter.</p>
      </div>
    </section>
    <section class="hero is-warning is-light" v-else>
      <div class="hero-body">
        <p class="title">Cover Letter</p>
        <p class="subtitle"><br>
           <span v-if="cover?.aasm_state == 'running'">Generate a cover letter for the job description below.</span>
           <button class="button" @click="run(cover.id)" v-if="cover?.aasm_state == 'created'">
            <span class="icon">
              <i class="fa-solid fa-play"></i>
            </span>
            <span>Click here to generate cover letter (1 credit)</span>
          </button>
          <br/>.
        </p>
      </div>
    </section>

    <div class="container">
      <div  v-if="cover">
        <Transition name="fade" mode="out-in">
          <div v-if="cover.cover" key="cover-content" class="cover-content">
            <div style="white-space: pre-line" class="box">
              {{ cover.cover }}
            </div>
          </div>
        </Transition>
        <hr/>
        <h3 class="title is-3">Job Description</h3>
        <div style="white-space: pre-line" class="notification box">
          {{ cover.job_description }}
        </div>
        <hr/>
        <h3 class="title is-3">Resume</h3>
        <div style="white-space: pre-line" class="notification box">
          {{ cover.resume_content }}
        </div>
      </div>
      <div class="notification is-danger" v-else>
        <h2 class="title is-2">Oppsss</h2>
        <p>You dont have such a cover letter</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-placeholder,
.cover-content,
.not-found {
  min-height: 200px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>