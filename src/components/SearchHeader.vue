<template>
  <header class="header">
    <h1 v-bind:class="'heading ' + service">
      <Icon :icon="service" />
      {{ title }}
    </h1>
    <label for="search" class="input-label" aria-label="search">Search</label>
    <input
      id="search"
      class="input"
      :value="searchTerm"
      @input="this.updateSearch"
      v-on:keyup.enter="submitSearch"
      type="text"
      placeholder="Search for album"
      aria-labelledby="search"
    />
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
@import '../styles/variables';

.header {
  display: grid;
  margin-bottom: 2rem;
  align-items: start;
  grid-template-columns: auto 1fr 5rem;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  grid-template-rows: auto auto 1fr;

  @include respond-to(medium) {
    grid-template-columns: auto 1fr auto 1fr;
    grid-template-rows: auto 1fr;
  }
}

.itunes .icon {
  color: $itunes;
}

.spotify .icon {
  color: $spotify;
}

.heading {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  grid-column: 1 / 4;

  .icon {
    bottom: -0.125em;
    margin-right: 0.25em;
  }
}

.input {
  grid-row: 2 / 2;
  width: 100%;
  padding: 0.75rem;
  box-shadow: none;
  border: 1px solid lightgrey;

  @include respond-to(medium) {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-column-gap: 1rem;
  }

  &-label {
    grid-row: 2 / 2;
    margin: 0.625rem 0;
  }
}

.button {
  border: 0;
  background: none;
  background: $blue;
  color: white;
  font-size: 1rem;
  grid-row: 2 / 2;
  line-height: 1;
  padding: 0.75rem 1rem;
}
</style>
