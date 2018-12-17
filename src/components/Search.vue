<template>
  <section>
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
    <Albums v-if="albums.length > 0" :albums="albums"></Albums>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Albums from '@/components/Albums';

export default {
  name: 'Search',
  computed: {
    ...mapState({
      searchTerm: state => state.searchTerm,
      albums: state => state.albums
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
  },
  components: {
    Albums
  }
};
</script>

<style scoped lang="scss">
@import "./Search";
</style>
