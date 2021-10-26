<template>
  <div class="flex justify-between">
    <NuxtLink
      v-if="prev"
      :to="prev.path"
      class="font-bold text-primary hover:underline"
    >
      <button class="btn">Previous: {{ prev.title }}</button>
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="font-bold hover:underline"
    >

    <button class="btn">Next: {{ next.title }}</button>

    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>
<script>
  export default {
    props: {
      prev: {
        type: Object,
        default: () => null
      },
      next: {
        type: Object,
        default: () => null
      }
    }
  }
</script>
