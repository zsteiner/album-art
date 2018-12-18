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
    <TypeSelector></TypeSelector>
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
    }),
  },
  methods: {
    ...mapActions(['getAppleAlbums']),
    submitSearch() {
      this.getAppleAlbums();
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
