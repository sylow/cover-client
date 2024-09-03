<script setup lang="ts">
  import { type Resume } from '~/types/all'

  definePageMeta({
    middleware: 'auth',
  })

  const resumes = ref<Resume[]>([])

  onMounted(async () => {
    const { data, status } = await useCustomFetch('/api/v1/resumes', { dedupe: 'defer'})
    if (status.value === 'success') {
      console.log(data.value)
      resumes.value = data.value
    }
  })

</script>
<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="title is-1">Resumes</h1>
      </div>
      <div class="column is-narrow" style="padding-top: 17px;">
        <router-link to="/resumes/new" class="button is-dark">
          <span class="icon">
            <i class="fab fa-plus"></i>
          </span>
          <span>New</span>
      </router-link>
      </div>
    </div>
    <article class="media" v-for="{ title,  id, content, created_at } in resumes" :key="id" style="margin: 1em 0">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ title }}</strong> <small>{{ created_at }}</small>
            <br />
            <div class="max-lines">{{ content }}</div>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<style scoped>
.max-lines {
   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 4; /* number of lines to show */
           line-clamp: 4;
   -webkit-box-orient: vertical;
}
</style>