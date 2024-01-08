<template>
  <section>
    <SearchHeader :has-query-param="hasQueryParam" :title="title" />
    <Albums v-if="albums.length > 0" :albums="albums" />
    <NoResults v-else />
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Albums from '@/components/Albums.vue';
import NoResults from '@/components/NoResults.vue';
import SearchHeader from '@/components/SearchHeader.vue';

export default {
  name: 'Search',

  data() {
    return {
      hasQueryParam: false,
    };
  },

  computed: {
    ...mapState(['albums', 'searchTerm', 'media']),
  },

  methods: {
    ...mapActions(['getQueryStrings', 'updateRoutes']),
  },

  props: {
    title: { type: String, required: true },
  },

  mounted() {
    if (this.searchTerm) {
      const { searchTerm, media } = this;
      this.updateRoutes({ searchTerm, media });
    } else {
      const { q, media } = this.$route.query;
      this.getQueryStrings({ q, media });
      if (q) this.hasQueryParam = true;
    }
  },

  components: {
    Albums,
    NoResults,
    SearchHeader,
  },
};
</script>
