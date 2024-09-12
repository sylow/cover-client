<script setup lang="ts">
  import { type Resume } from '~/types/all'
  definePageMeta({
    middleware: 'auth',
  })
  const store = useResumeStore()

</script>
<template>
    <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Manage Your Resumes</p>
        <p class="subtitle">Easily manage and update your resumes from the list below.</p>
      </div>
    </section>
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
      <div>
        <SiteLoading v-if="store.isLoading" />
        <table class="table" v-if="!store.isLoading">
          <thead>
            <tr>
              <th>Title</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, title, resume } in store.resumes" :key="id">
              <td class="cover-link">
                <router-link :to="`/resumes/${id}`">{{ title }}</router-link>
              </td>
              <td><div class="resume">{{ resume }}</div></td>
              <td>
                <nuxt-link :to="`/covers/new?resume_id=${id}`" class="button">
                  <span class="icon">
                    <i class="fa-solid fa-envelope-open-text"></i>
                  </span>
                  <span>New Cover Letter</span>
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
td {
  .resume {
    white-space: pre-wrap;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
            line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}
.cover-link{
    white-space: nowrap;
}
</style>