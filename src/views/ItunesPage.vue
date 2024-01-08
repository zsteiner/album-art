<template>
  <article>
    <Search :title="title" />
  </article>
</template>

<script>
import { mapActions } from 'vuex';

import Search from '@/components/Search.vue';

export default {
  name: 'ItunesPage',
  data() {
    return {
      title: 'iTunes Search',
    };
  },
  methods: {
    ...mapActions(['setService']),
  },
  created() {
    this.setService('itunes');
  },
  components: {
    Search,
  },
};
</script>
