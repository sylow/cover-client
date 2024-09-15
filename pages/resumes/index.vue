<script setup lang="ts">
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
      <div>
        <SiteLoading v-if="store.isLoading" />
        <table class="table is-fullwidth is-striped" v-if="!store.isLoading">
          <thead>
            <tr>
              <th>Title</th>
              <th>Resume</th>
              <th class="has-text-right">
                <router-link to="/resumes/new" class="button is-primary">
                  <span class="icon">
                    <i class="fab fa-plus"></i>
                  </span>
                  <span>New Resume</span>
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, title, resume } in store.resumes" :key="id">
              <td class="nowrap">
                <router-link :to="`/resumes/${id}`">{{ title }}</router-link>
              </td>
              <td><div class="summary">{{ resume }}</div></td>
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