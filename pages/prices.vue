<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">One-Time Purchase Plans</p>
        <p class="subtitle">Choose the credit package that fits your needs. Each purchase is a one-time order with no subscription or recurring fees.</p>
      </div>
    </section>


    <section class="container box" ref="stripePricingSection">
      <ClientOnly>
        <stripe-pricing-table
          pricing-table-id="prctbl_1Q13EXFTqj5rp0OS96Yu5ncA"
          publishable-key="pk_test_51NtYw7FTqj5rp0OSLqQXkrBRxCK5MQqVCCJXbhf6vgaryzgXRB1KLAALiewnmmtqaL4hYFvxDJ2lUcmJ9Wn5Oc7T00bcgFjk7w"
          :client-reference-id="user.id">
        </stripe-pricing-table>
      </ClientOnly>
      <ScriptStripePricingTable
          pricing-table-id="prctbl_1Q13EXFTqj5rp0OS96Yu5ncA"
          publishable-key="pk_test_51NtYw7FTqj5rp0OSLqQXkrBRxCK5MQqVCCJXbhf6vgaryzgXRB1KLAALiewnmmtqaL4hYFvxDJ2lUcmJ9Wn5Oc7T00bcgFjk7w"
      />
    </section>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'user',
  })

  const user = useUserStore()

  useHead(
    {
      script: [
        { src: 'https://js.stripe.com/v3/pricing-table.js', async: true, body: true }
      ]
    }
  )
</script>