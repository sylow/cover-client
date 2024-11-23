<script lang="ts" setup>
  const toast = useToast()
  const { isAuthenticated } = useAuth()
  const { user } = useUserStore()
  const sentEmail = useCookie<boolean>('sentEmail',
    {
      default: () => false
    }
  ) as Ref<boolean>

  const showMessage = computed(() => {
    return isAuthenticated.value && ( !user.email_confirmed || !sentEmail )
  })

  const confirm = async () => {
    try {
      const message = await useUserApi().sendVerificationEmail()
      toast.add({ description: message, color: 'green' })
      sentEmail.value = true
    } catch (error) {
      toast.add({ description: (error as Error).message, color: 'red' })
    }
  }
</script>

<template>
  <div class="notification is-warning" v-if="showMessage">
     {{ isAuthenticated }} && ( {{ !user.email_confirmed }} || {{ sentEmail }} )
    <a @click="confirm">Click here</a> to verify your email address to receive a free credit!
  </div>
</template>

