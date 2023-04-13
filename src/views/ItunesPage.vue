<template>
  <article>
    <Search :title="title" />
  </article>
</template>

<script>
import { mapActions } from 'vuex';

import Search from '@/components/Search.vue';

export default {
  name: 'Itunes',

  components: {
    Search,
  },

  data() {
    return {
      title: 'iTunes Search',
    };
  },

  created() {
    this.setService('itunes');
  },

  methods: {
    ...mapActions(['setService']),
  },
};
</script>
