<script setup>
  const menu = [
    {name: 'Resumes', path: 'resumes'},
    {name: 'Covers', path: 'covers'},
  ]
</script>
<template>
  <div class="tabs is-medium is-centered">
    <ul>
      <li v-for="item in menu" :key="item.name" :class="{'is-active': $route.path.includes(item.path)}">
        <NuxtLink :to="{name: item.path}">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>