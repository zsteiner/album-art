<template>
  <article>
    <Search v-bind:title="title"></Search>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

import Search from '@/components/Search.vue';

export default {
  name: 'itunes',
  data() {
    return {
      title: 'iTunes Search',
    };
  },
  methods: {
    ...mapActions(['setService']),
  },
  mounted() {
    this.setService('itunes');
  },
  components: {
    Search,
  },
};
</script>
