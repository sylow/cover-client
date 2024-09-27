<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const store = useCoverStore()
</script>
<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Manage Your Cover Letters</p>
        <p class="subtitle">Easily manage and update your cover letters.</p>
      </div>
    </section>
    <main>
      <div class="table-container">
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Job Description</th>
              <th>Resume</th>
              <th>Date</th>
              <th class="has-text-right">
                <router-link to="/covers/new" class="button is-primary">
                  <span class="icon">
                    <i class="fab fa-plus"></i>
                  </span>
                  <span>New Cover Letter</span>
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cover in store.covers" :key="cover.id">
              <td><div class="summary">{{ cover.job_description }}</div></td>
              <td class="nowrap">{{ cover.resume_title }}</td>
              <td class="nowrap">{{ cover.created_at }}</td>
              <td>
                <button @click="navigateTo({ name: 'covers-id', params: { id: cover.id } })" class="button">
                  <span class="icon"><i class="fa-solid fa-envelope-open"></i></span>
                  <span>View Cover</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
