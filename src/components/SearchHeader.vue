<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <input
      :value="searchTerm"
      @input="updateSearch"
      v-on:keyup.enter="submitSearch"
      type="text"
      class="input"
      placeholder="Search for album"
    >
    <button @click="submitSearch" class="button">search</button>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SearchHeader',
  computed: {
    ...mapState({
      searchTerm: state => state.searchTerm
    })
  },
  methods: {
    ...mapActions(['getAppleAlbums']),
    submitSearch(event) {
      this.getAppleAlbums({ type: 'album' });
    },
    updateSearch(event) {
      this.$store.commit('search', event.target.value);
    }
  },
  props: {
    title: String,
    searchType: String
  }
};
</script>

<style scoped lang="scss">
@import "./SearchHeader";
</style>

</style>