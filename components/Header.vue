<template>
  <header class="bg-gray-800 xl:bg-500 lg:bg-700 md:bg-400 sm:bg-600">
    <div class="md:flex justify-center py-16">
      <div class="p-8 my-auto">
        <h1 class="text-orange-100 text-3xl text-center">
          {{ article.title }}
        </h1>
        <p class="text-white-600 text-sm text-center">
          {{ formatDate(article.createdAt) }}
        </p>
      </div>
    </div>
    <div>
      <p>
        Also available in:
        <nuxt-link
              class="uppercase text-teal-600 hover:text-teal-800"
              v-for="lang in otherLanguages"
              :key="lang.locale"
              :to="lang.path"
            >
              {{ lang.locale }}
            </nuxt-link>
      </p>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  },
  computed: {
    otherLanguages() {
      return this.article.otherLanguages || []
    }
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
