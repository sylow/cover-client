<script setup lang="ts">
  import type { CoverApi } from '~/types/all'
  definePageMeta({
    middleware: 'auth',
  })

  const route = useRoute()
  const coverStore = useCoverStore()
  const cover = ref(coverStore.covers.find((cover:CoverApi) => cover.id === Number(route.params.id)))
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Cover Letter Details</p>
        <p class="subtitle">View and manage your cover letter.</p>
      </div>
    </section>
    <div class="container">
      <div  v-if="cover">
        <h3 class="title is-3">Cover Letter</h3>
        <div style="white-space: pre-line" class="notification is-light">
          {{ cover.cover }}
        </div>
        <hr/>
        <h3 class="title is-3">Job Description</h3>
        <div style="white-space: pre-line" class="notification is-light scrollable">
          {{ cover.job_description }}
        </div>
        <hr/>
        <h3 class="title is-3">Resume</h3>
        <div style="white-space: pre-line" class="notification is-light scrollable">
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
