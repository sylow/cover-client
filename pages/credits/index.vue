<script setup lang="ts">
  definePageMeta({
    middleware: 'auth',
  })

  const api = useTransactionApi()
  const userStore = useUserStore()
  const { data: transactions } = api.fetch()

</script>
<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Manage Your Credits</p>
        <p class="subtitle">Easily purchase, track, and use your credits. (You have {{  userStore.credits}} credits)</p>
      </div>
    </section>
    <main>
      <div class="table-container">
        <table class="table is-hoverable is-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, description, created_at } in transactions" :key="id">
              <td class="nowrap">
                <router-link :to="`/resumes/${id}`">{{ id }}</router-link>
              </td>
              <td><div class="summary">{{ description }}</div></td>
              <td>{{ created_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
