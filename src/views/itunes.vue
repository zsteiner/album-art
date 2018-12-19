<template>
  <article>
    <Search v-bind:title="title"></Search>
  </article>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
  name: 'itunes',
  data() {
    return {
      title: 'iTunes Search',
    };
  },
  components: {
    Search,
  },
};
</script>
