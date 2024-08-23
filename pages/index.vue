<template>
  <div class="columns">
    <div class="column">
      <section>
        <h2 class="title is-1">
          Your Journey Starts Here
        </h2>
        <p>
          Welcome, where job seekers elevate their resumes and cover letters. Our tools are designed to help you stand out and land your dream job with ease.
        </p>
      </section>
    </div>
    <div class="column">
      <section class="aligned-buttons">
        <h2 class="title is-3">Cover Letter in Minutes</h2>
        <p>
          Our user-friendly cover letter generator transforms the challenge of writing into a simple, accessible experience. Enhance your interview prospects, distinguish yourself from the competition, and confidently apply for your dream job—let your professional journey shine through and captivate potential employers!
        </p>
        <NuxtLink to="/covers/new" class="button is-success is-light">Create Cover Letter</NuxtLink>
      </section>

    </div>
    <div class="column">
      <section class="aligned-buttons">
        <h2 class="title is-3">Enhance Your Resume</h2>
        <p>
          Our intuitive resume builder simplifies the process of crafting a polished, professional resume. Boost your chances of landing interviews, stand out in a crowded job market, and showcase your skills and experience with a beautifully designed resume that leaves a lasting impression on employers!
        </p>
        <button class="button is-info is-light">Enhance Your Resume</button>
      </section>

    </div>
  </div>
</template>

<style scoped lang="scss">
.is-1{
  margin-top: 15px !important;
}
.column{
  margin: 2em;
  section {
    height: 100%;
    display: flex;
    flex-direction: column;
    > * {
      margin: 20px 0;
    }
  }

  // Align buttons to the bottom of the section
  section.aligned-buttons{
    justify-content: space-between;

    > .button {
    margin-top: auto;
    }
  }
}

</style>