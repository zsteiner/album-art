<template>
  <article>
    <Search v-bind:title="title"></Search>
  </article>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';

export default {
  name: 'spotify',
  data() {
    return {
      title: 'Spotify Search',
    };
  },
  components: {
    Search,
  },
};
</script>
