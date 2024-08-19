<template>
  <div class="container">
    <div class="job-seeker-tools" >
      <section>
        <h2 class="title is-3">
          Your Journey Starts Here
        </h2>
        <p>
          Welcome, where job seekers elevate their resumes and cover letters. Our tools are designed to help you stand out and land your dream job with ease.
        </p>
      </section>
      <section>
        <h2 class="title is-3">Cover Letter in Minutes</h2>
        <p>
          Our user-friendly cover letter generator transforms the challenge of writing into a simple, accessible experience. Enhance your interview prospects, distinguish yourself from the competition, and confidently apply for your dream job—let your professional journey shine through and captivate potential employers!
        </p>
        <button class="button is-success is-light">Create Cover Letter</button>
      </section>
      <section>
        <h2 class="title is-3">Enhance Your Resume</h2>
        <p>
          Our intuitive resume builder simplifies the process of crafting a polished, professional resume. Boost your chances of landing interviews, stand out in a crowded job market, and showcase your skills and experience with a beautifully designed resume that leaves a lasting impression on employers!
        </p>
        <button class="button is-link is-light">Enhance Resume</button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.job-seeker-tools{
  display:flex;
  justify-content: center;
  gap: 70px; /* Adds space between each child element */
  section {
    width: 30em;
    display: flex;
    flex-direction: column;
    > * {
      margin: 15px 0;
    }
  }
  // Add flexbox properties to the section except the first one
  section:not(:first-child){
    justify-content: space-between;
  }

  // Align buttons to the bottom of the section
  section:not(:first-child) > .button {
    margin-top: auto;
  }
  @media screen and (max-width: 700px) { /* Adjust the max-width as needed */
    section:first-child {
      display: none;
    }
  }
}
</style>