<template>
  <header class="header">
    <h1 class="heading">{{ title }}</h1>
    <input
      :value="searchTerm"
      @input="updateSearch"
      v-on:keyup.enter="submitSearch"
      type="text"
      class="input"
      placeholder="Search for album"
    >
    <button @click="submitSearch" class="button">search</button>
    <TypeSelector :onChange="submitSearch"></TypeSelector>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import encodeQuery from '@/utils/encodeQuery';

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
    ...mapActions(['getAppleAlbums']),
    submitSearch() {
      const query = encodeQuery(this.searchTerm);

      this.getAppleAlbums();
      console.log('query Header', query); // eslint-disable-line
      this.$router.push({ query: { q: query, media: this.media } });
    },
    updateSearch(event) {
      this.$store.commit('search', event.target.value);
    },
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
