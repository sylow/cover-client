<script setup lang="ts">
import type { CoverState } from '~/types/all';

  definePageMeta({
    middleware: 'auth',
  })

  const toast = useToast()
  const api = useCoverApi()
  const { data: covers, refresh } = api.fetch()

  const pay = async (id: number) => {
    const { error } = await api.pay(id)
    if (error.value)
      toast.add({ title: 'Oppps!', description: error?.value?.data, class: 'red' })
    else {
      toast.add({ title: 'Success!', description: 'Cover Letter has been paid.', class: 'green' })
      refresh()
    }
  }

</script>
<template>
    <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Manage Your Cover Letters</p>
        <p class="subtitle">Easily manage and update your cover letters.</p>
      </div>
    </section>
    <div class="container">
      <div>
        <table class="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Job Description</th>
              <th></th>
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
            <tr v-for="cover in covers" :key="cover.id">
              <td><div class="summary">{{ cover.job_description }}</div></td>
              <td>{{ cover }}</td>
              <td class="nowrap">{{ cover.resume_title }}</td>
              <td class="nowrap">{{ cover.created_at }}</td>
              <td><CoverStatus v-model:state="cover.aasm_state" v-model:id="cover.id" @pay="(id) => pay(id)"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
