<script setup>
const stream = useStream()
const { token } = useAuth()

stream.connect()
watch(token, () => {
  stream.connect()
})

</script>
<template>
  <div></div>
</template>