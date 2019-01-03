<template>
  <header class="header">
    <h1 class="heading">
      <Icon :icon="service"/>
      {{ title }}
    </h1>
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
    <TypeSelector v-if="service === 'itunes'" :onChange="submitSearch"></TypeSelector>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Icon from '@/components/Icon.vue';
import TypeSelector from '@/components/TypeSelector.vue';

export default {
  name: 'SearchHeader',
  computed: { ...mapState(['searchTerm', 'madeSearch', 'media', 'service']) },
  methods: {
    ...mapActions(['getAppleAlbums', 'getSpotifyAlbums']),
    submitSearch() {
      if (this.service === 'spotify') {
        this.getSpotifyAlbums();
      } else {
        this.getAppleAlbums();
      }
    },
    updateSearch(event) {
      this.$store.commit('search', event.target.value);
    },
  },
  mounted() {
    if (this.searchTerm) {
      this.submitSearch();
    }
  },
  props: {
    title: String,
  },
  components: {
    Icon,
    TypeSelector,
  },
};
</script>

<style scoped lang="scss">
@import './SearchHeader';
</style>
