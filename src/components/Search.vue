<template>
  <section>
    <SearchHeader :title="title"></SearchHeader>
    <Albums v-if="albums.length > 0" :albums="albums"></Albums>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Albums from '@/components/Albums';
import SearchHeader from '@/components/SearchHeader';

export default {
  name: 'Search',
  computed: {
    ...mapState({
      albums: state => state.albums,
    }),
  },
  props: {
    title: String,
  },
  components: {
    Albums,
    SearchHeader,
  },
};
</script>
