<template>
  <div class="mx-auto">

    <Header :article="article"></Header>
    <div class="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div class="flex md:col-span-2">
        <div class="grid place-items-center h-screen m-8">
          <article>
            <nuxt-content :document="article" />
            <author :author="article.author"></author>
          </article>
        </div>
      </div>
      <div class="flex p-10">
        <nav>
            <ul>
              <li
                v-for="link of article.toc"
                :key="link.id"
                :class="{
                  'py-2': link.depth === 2,
                  'ml-2 pb-2': link.depth === 3,
                }"
              >
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  </div>
</template>
<style>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.nuxt-content p {
  margin-bottom: 20px;
}
</style>

<script>
import Blognav from '~/components/Blognav.vue';

const head = function () {
  return {
    title: this.article.title,
    htmlAttrs: {
      lang: this.$i18n.locale,
    },
    meta: [
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.article.description,
      },
      {
        property: 'og:title',
        hid: 'og:title',
        content: this.article.title,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: this.article.media,
      },
    ],
  }
}

export default {
  head,
  components: { Blognav },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    replaceClass(){

      document.querySelectorAll('.nuxt-content-highlight').forEach(function(element) {
          element.classList.replace('nuxt-content-highlight','mockup-code')
          element.classList.add('mb-2')
          element.childNodes[0].classList.remove('language-text')
          element.childNodes[0].classList.remove('line-numbers')
      });

    }
  },
  mounted() {
    this.replaceClass()
  },
  async asyncData(context) {

    const { $content, params, app, route, redirect } = context
    const slug = params.slug
    const article = await $content(`${app.i18n.locale}/blog`, slug).fetch()

    const [prev, next] = await $content(`${app.i18n.locale}/blog`)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return {
      article,
      prev,
      next,
    }
  },
}
</script>
