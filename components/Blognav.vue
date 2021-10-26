<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="px-2 mx-2 navbar-start">
      <NuxtLink v-if="prev" :to="getPrevPath">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current text-success"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </button>

        <span class="text-lg font-bold">
          {{ prev.title }}
        </span>
      </NuxtLink>
    </div>
    <div class="hidden px-2 mx-2 navbar-center lg:flex">
      <div class="flex items-stretch">
        <a href="/" class="btn btn-ghost btn-sm rounded-btn"> Home </a>
      </div>
    </div>
    <div class="navbar-end">
      <NuxtLink v-if="next" :to="getNextPath">
        <span class="text-lg font-bold"> {{ next.title }} </span>

        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current text-success mirror"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
<style>
.mirror {
  transform: scaleX(-1);
}
</style>
<script>
const head = function () {
  return {
    title: this.post.title,
    htmlAttrs: {
      lang: this.$i18n.locale,
    },
    meta: [
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.post.description,
      },
      {
        property: 'og:title',
        hid: 'og:title',
        content: this.post.title,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: this.post.media,
      },
    ],
  }
}

export default {
  head,
  computed: {
    getPrevPath(){
      if(this.prev!=null){
        return this.prev.path.replace(`/${this.$i18n.locale}`,'')
      }
    },
    getNextPath(){
      if(this.next!=null){
        return this.next.path.replace(`/${this.$i18n.locale}`,'')
      }
    }
  },
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
