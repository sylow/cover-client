<template>
  <div>
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
          <NuxtLink to="/covers/new" class="button is-primary">Create Cover Letter</NuxtLink>
        </section>

      </div>
      <div class="column">
        <section class="aligned-buttons">
          <h2 class="title is-3">Enhance Your Resume</h2>
          <p>
            Our intuitive resume builder simplifies the process of crafting a polished, professional resume. Boost your chances of landing interviews, stand out in a crowded job market, and showcase your skills and experience with a beautifully designed resume that leaves a lasting impression on employers!
          </p>
          <NuxtLink to="resumes" class="button is-primary">Enhance Your Resume</NuxtLink>
        </section>
      </div>
    </div>


  <div class="columns" style="margin-top: 4em">
      <div class="column">
        <section>
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
                <img class="is-rounded" src="/images/people/4.jpeg" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Eleanor Hayes</strong>, <small>HR Manager</small>
                <br />
                A great cover letter isn’t just a formality; it’s a chance to see the person behind the resume. I look for individuals who can communicate their value and show they understand the unique needs of our team.
              </p>
            </div>
          </div>
        </article>
        </section>
      </div>

      <hr/>

      <div class="column">
        <section class="aligned-buttons">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
                <img class="is-rounded" src="/images/people/3.jpeg" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Maria Gonzales</strong>, <small>Marketing Manager</small>
                <br />
                A well-written cover letter is my chance to stand out. I need it to show not just my skills, but how my personality and experience can make a real difference for the company.
              </p>
            </div>
          </div>
        </article>
        </section>

      </div>
      <div class="column">
        <section class="aligned-buttons">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
                <img class="is-rounded" src="/images/people/1.jpeg" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>James Parker</strong>, <small>Software developer</small>
                <br />
                In my field, a strong resume isn’t enough. I need a cover letter that explains how my technical background aligns with each role, showing I’m the best fit beyond just what’s on paper.
              </p>
            </div>
          </div>
        </article>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.is-1{
  margin-top: 15px !important;
}
.columns{
  margin-top: 1em;
}
.column{
  margin: 1em 2em;
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