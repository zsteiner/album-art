<template>
  <section>
    <SearchHeader :title="title"></SearchHeader>
    <Albums v-if="albums.length > 0" :albums="albums"></Albums>
    <NoResults v-else></NoResults>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Albums from '@/components/Albums.vue';
import NoResults from '@/components/NoResults.vue';
import SearchHeader from '@/components/SearchHeader.vue';

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
    NoResults,
    SearchHeader,
  },
};
</script>
