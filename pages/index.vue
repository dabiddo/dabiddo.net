<template>
  <div class="mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div class="max-h-96 md:h-screen">
        <div
          class="
            md:h-screen
            flex flex-col
            items-center
            justify-center
            m-10
            md:m-0
          "
        >
          <div class="avatar">
            <div class="mb-8 rounded-full w-32 h-32">
              <img src="/dabiddo__.jpg" alt="me" />
            </div>
          </div>
          <div>
            <p>
              Hi, I'm David Torres a PHP Backend Developer, welcome to my blog
            </p>
          </div>
          <div>
            <a href="https://www.twitter.com/dabiddokun" class="btn btn-circle btn-ghost">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="https://www.github.com/dabiddo" class="btn btn-circle btn-ghost">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
          </div>
          <!--<languageswitcher/>-->
        </div>
      </div>
      <div class="flex bg-gray-100 p-10 md:col-span-2">
        <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div
                class="py-8 flex flex-wrap md:flex-nowrap"
                v-for="article of posts"
                :key="article.slug"
              >
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700"
                    ><div class="badge ml-2">new</div></span
                  >
                  <span class="mt-1 text-gray-500 text-sm">{{
                    formatDate(article.createdAt)
                  }}</span>
                </div>
                <NuxtLink :to="article.path">
                  <div class="md:flex-grow">
                    <h2
                      class="text-2xl font-medium text-gray-900 title-font mb-2"
                    >
                      {{ article.title }}
                    </h2>
                    <p class="leading-relaxed">
                      {{ article.description }}
                    </p>
                    <a class="text-indigo-500 inline-flex items-center mt-4"
                      >Learn More
                      <svg
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import Languageswitcher from '~/components/Languageswitcher.vue'
export default {
  components: { Languageswitcher },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  async asyncData(context) {
    const { $content, app } = context
    const defaultLocale = app.i18n.locale
    const posts = await $content(`${defaultLocale}/blog`).sortBy('createdAt', 'desc').fetch()

    return {
      posts: posts.map((post) => ({
        ...post,
        path: post.path.replace(`/${defaultLocale}`, ''),
      })),
    }
  },
}
</script>
