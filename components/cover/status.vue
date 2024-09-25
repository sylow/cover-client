<template>
  <div>
    <button class="button" @click='emit("run", id)' v-if="state == 'created'">
      <span class="icon">
        <i class="fa-solid fa-play"></i>
      </span>
      <span>Run for 1 credit</span>
    </button>
    <button class="button" disabled v-if="state == 'running'">Writing Cover...</button>
    <button @click="navigateTo({ name: 'covers-id', params: { id } })" class="button" v-if="state == 'completed'">
      <span class="icon"><i class="fa-solid fa-envelope-open"></i></span>
      <span>View Cover</span>
    </button>

    <button class="button is-danger" disabled v-if="state == 'failed'">Failed to write</button>
  </div>
</template>

<script lang="ts" setup>
  import type { CoverState } from '~/types/all';

  const emit = defineEmits<{
              (event: 'run', id: number): void;
              (event: 'view', id: number): void;
              }>();

  const state = defineModel<CoverState>('state', {
    required: true,
    default: 'created'
  });

  const id = defineModel<number>('id', {
    required: true,
    default: 0
  });

</script>

<style>

</style>