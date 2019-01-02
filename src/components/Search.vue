<template>
  <section>
    <SearchHeader :title="title"></SearchHeader>
    <Albums v-if="albums.length > 0" :albums="albums"></Albums>
    <NoResults v-else></NoResults>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Albums from '@/components/Albums.vue';
import NoResults from '@/components/NoResults.vue';
import SearchHeader from '@/components/SearchHeader.vue';

export default {
  name: 'Search',
  computed: {
    ...mapState(['albums', 'searchTerm', 'media']),
  },
  methods: {
    ...mapActions(['getQueryStrings', 'updateRoutes']),
  },
  props: {
    title: String,
  },
  mounted() {
    if (this.searchTerm) {
      const { searchTerm, media } = this;
      this.updateRoutes({ searchTerm, media });
    } else {
      const { q, media } = this.$route.query;
      this.getQueryStrings({ q, media });
    }
  },
  components: {
    Albums,
    NoResults,
    SearchHeader,
  },
};
</script>
