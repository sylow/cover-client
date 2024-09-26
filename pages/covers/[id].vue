<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const route = useRoute()
  const coverStore = useCoverStore()
  const cover = computed(() => coverStore.get(Number(route.params.id)))

  const tabToShow = ref('cover')
  const api = useCoverApi()
  const run = async (id: number) => {
    if (cover.value?.aasm_state != 'created')
      return
    await api.run(id)
  }

</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Cover Letter Details</p>
        <p class="subtitle">View and manage your cover letter.</p>
      </div>
    </section>
    <main>
      <div class="tabs ">
        <ul>
          <li :class="{'is-active': tabToShow == 'cover'}" @click="tabToShow ='cover'">
            <a>
              <span class="icon is-small"><i class="fa-solid fa-envelope-open-text"></i></span>
              <span>Cover</span>
            </a>
          </li>
          <li :class="{'is-active': tabToShow == 'job'}" @click="tabToShow ='job'">
            <a>
              <span class="icon is-small"><i class="fa-solid fa-user-doctor"></i></span>
              <span>Job Description</span>
            </a>
          </li>
          <li :class="{'is-active': tabToShow == 'resume'}" @click="tabToShow ='resume'">
            <a>
              <span class="icon is-small"><i class="fa-solid fa-file"></i></span>
              <span>Your Resume</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="tabToShow=='cover'">
        <Transition name="fade" mode="out-in">
          <div v-if="cover?.cover">
            <div v-if="cover.cover" key="cover-content" class="cover-content">
              <div style="white-space: pre-line" class="box">
                {{ cover.cover }}
              </div>
            </div>
          </div>
          <div v-else>
            <br/>
            <span v-if="cover?.aasm_state == 'running'">Writing the cover letter now. It will show here when completed.</span>
            <button class="button" @click="run(cover.id)" v-if="cover?.aasm_state == 'created'">
              <span class="icon">
                <i class="fa-solid fa-play"></i>
              </span>
              <span>Click here to generate cover letter (1 credit)</span>
            </button>
          </div>
        </Transition>
      </div>

      <div v-if="tabToShow=='job'">
        <div style="white-space: pre-line" class="box">
          {{ cover?.job_description }}
        </div>
      </div>

      <div v-if="tabToShow=='resume'">
        <div style="white-space: pre-line" class="box">
          {{ cover?.resume_content }}
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  .cover-content,
  .content-box {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .content-box {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
</style>