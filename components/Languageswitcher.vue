<template>
<div class="dropdown">
  <div tabindex="0" class="m-1 btn" >{{$i18n.locale.toUpperCase() }}</div>
  <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
    <nuxt-link v-for="locale in availableLocales" :key="locale.code" class="navbar-item" :to="switchLocalePath(locale.code)">
      <li><a>{{ locale.code.toUpperCase() }}</a></li>
    </nuxt-link>
  </ul>
</div>
</template>

<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(locale => locale.code !== this.$i18n.locale)
    }
  }
}
</script>
