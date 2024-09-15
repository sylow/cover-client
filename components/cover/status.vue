<template>
  <div>
    <button class="button" @click='emit("pay", id)' v-if="state == 'created'">{{ label }}</button>
    <span v-else>
      <span class="tag is-light is-medium">{{ label }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, defineEmits, computed } from 'vue'
import type { CoverState }  from '~/types/all'

// Define the translations object with strict typing
const translations: Record<CoverState, string> = {
  'created': 'Run for 1 credit',
  'paid': 'Payment received',
  'running': 'Creating ...',
  'completed': 'Ready to view',
  'failed': 'Failed'
};

const state = defineModel<CoverState>('state', {
  required: true,
  default: 'created'
});

const id = defineModel<number>('id', {
  required: true,
  default: 0
});

const emit = defineEmits(['pay']);
const label = computed( () => translations[state.value] || state.value )

</script>

<style>

</style>