<template>
  <header class="header">
    <h1 class="heading">{{ title }}</h1>
    <section class="input">
      <label for="search" class="input-label" aria-label="search">Search</label>
      <input
        id="search"
        class="input-input"
        :value="searchTerm"
        @input="this.updateSearch"
        v-on:keyup.enter="submitSearch"
        type="text"
        placeholder="Search for album"
        aria-labelledby="search"
      >
    </section>
    <button @click="submitSearch" class="button">search</button>
    <TypeSelector :onChange="submitSearch"></TypeSelector>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TypeSelector from '@/components/TypeSelector.vue';

export default {
  name: 'SearchHeader',
  computed: {
    ...mapState({
      searchTerm: state => state.searchTerm,
      media: state => state.media,
    }),
  },
  methods: {
    ...mapActions(['getAppleAlbums', 'getQueryStrings']),
    submitSearch() {
      this.getAppleAlbums();
    },
    updateSearch(event) {
      this.$store.commit('search', event.target.value);
    },
  },
  created() {
    const { q, media } = this.$route.query;
    this.getQueryStrings({ q, media });

    if (this.$route.query.q) {
      this.submitSearch();
    }
  },
  props: {
    title: String,
    searchType: String,
  },
  components: {
    TypeSelector,
  },
};
</script>

<style scoped lang="scss">
@import './SearchHeader';
</style>
