<template>
  <UModal v-model="isOpen" :overlay="false">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Error
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <Placeholder class="h-32">      {{ props.error}}        </Placeholder>
      </UCard>
    </UModal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    error: any
  }>()
  const isOpen = ref(props.error !== null)
</script>

<style>

</style>