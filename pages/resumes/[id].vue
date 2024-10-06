<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const route = useRoute()
  const resumeStore = useResumeStore()
  const resume = computed(() => resumeStore.get(Number(route.params.id)))

  const enhancedResume = computed(() => resume.value?.enhanced_resume)

  const tabToShow = ref('resume')
  const api = useResumeApi()

  const { copy, copied } = useClipboard()

  const tabs = [
    { name: 'resume', icon: 'fa-file', title: 'Your Resume' },
    { name: 'enhance', icon: 'fa-cog', title: 'AI Enhanced Resume' },
  ]

    const run = async (id: number) => {
    await api.enhance(id)
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
          <li v-for="tab in tabs" :key="tab.name"
              :class="{'is-active': tabToShow == tab.name}"
              @click="tabToShow = tab.name">
            <a>
              <span class="icon is-small"><i :class="`fa-solid ${tab.icon}`"></i></span>
              <span>{{ tab.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="tabToShow=='resume'">
        <div style="white-space: pre-line" class="box">
          {{ resume?.content }}
        </div>
      </div>

      <div v-if="tabToShow=='enhance'">
        <Transition name="fade" mode="out-in">
          <div v-if="enhancedResume">
            <div style="white-space: pre-line" class="box">
              <span v-if="enhancedResume?.aasm_state == 'running'">Working on your resume now. It will show here when completed.</span>
              <div v-if="enhancedResume?.aasm_state == 'completed'">
                <button class="button is-pulled-right is-small" @click="copy(enhancedResume.content)">
                  <span class="icon">
                    <i  v-if="!copied" class="fa-solid fa-copy"></i>
                    <i v-else class="fa-solid fa-check"></i>
                  </span>
                  <span v-if="!copied">Copy</span>
                  <span v-else>Copied!</span>
                </button>
                {{ enhancedResume.content }}
              </div>
            </div>
          </div>
          <div v-else>
            <br/>
            <button class="button" @click="run(resume?.id)" v-if="!enhancedResume">
              <span class="icon">
                <i class="fa-solid fa-play"></i>
              </span>
              <span>Click here to enhance your resume (1 credit)</span>
            </button>
          </div>
        </Transition>
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