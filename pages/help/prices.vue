<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Purchase Plans</p>
        <p class="subtitle">Each purchase is a one-time order with no subscription or recurring fees.</p>
      </div>
    </section>

    <div class="columns">
      <div class="card column">
        <header class="card-header">
          <p class="card-header-title" style="font-size: 150%">
            Try Out
          </p>

        </header>
        <div class="card-content">
          <div class="content">
            <p>Test our cover letter service with one credit to generate a single tailored cover letter.</p>
            <p class="title has-text-centered">US$2</p>
            <p>This includes:</p>
            <ul>
              <li><span class="icon has-text-success"><i class="fas fa-check"></i></span> 1 credit</li>
            </ul>
          </div>
        </div>

      </div>

      <div class="card column">
        <header class="card-header">
          <p class="card-header-title" style="font-size: 150%">
            Pro Pack
          </p>
          <span class="tag is-info card-header-icon">Recommended</span>

        </header>
        <div class="card-content">
          <div class="content">
            <p>Create 25 customized cover letters for a variety of job applications and industries.</p>
            <p class="title has-text-centered">US$20</p>
            <p>This includes:</p>
            <ul>
              <li><span class="icon has-text-success"><i class="fas fa-check"></i></span> 25 credits</li>
            </ul>
          </div>
        </div>

      </div>

    <!-- Career Booster -->
      <div class="card column">
        <header class="card-header">
          <p class="card-header-title" style="font-size: 150%">
            Career Booster
          </p>

        </header>
        <div class="card-content">
          <div class="content">
            <p>Supercharge your job search with 50 credits to generate cover letters for numerous opportunities.</p>
            <p class="title has-text-centered">US$35</p>
            <p>This includes:</p>
            <ul>
              <li><span class="icon has-text-success"><i class="fas fa-check"></i></span> 50 credits</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// You can add any logic or data fetch here if needed
</script>

<style scoped>
.columns{
  margin: 2em;
}
.card-header-icon {
  margin-left: auto;
}
</style>
