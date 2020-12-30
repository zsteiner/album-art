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
  align-items: start;
  grid-template:
    'header-heading header-heading header-heading' auto
    'header-label . .' auto
    'header-input header-input header-button' auto
    'header-selector header-selector header-selector' auto /
    auto 1fr 5rem;
  grid-column-gap: 1rem;
  margin-bottom: 2rem;

  @include respond-to(medium) {
    grid-template:
      'header-heading header-heading header-heading header-heading' auto
      'header-label header-input header-button header-selector' auto /
      auto 1fr 5rem 1fr;
  }
}

.itunes .icon {
  color: $itunes;
}

.spotify .icon {
  color: $spotify;
}

.heading {
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 900;
  grid-area: header-heading;

  .icon {
    bottom: -0.125em;
    margin-right: 0.25em;
  }
}

.input {
  box-shadow: none;
  border: 1px solid lightgrey;
  grid-area: header-input;
  grid-column-gap: 1rem;
  padding: 0.75rem;
  width: 100%;

  &-label {
    grid-area: header-label;
    margin: 0.625rem 0;
  }
}

.button {
  border: 0;
  background: none;
  background: $blue;
  color: white;
  font-size: 1rem;
  grid-area: header-button;
  line-height: 1;
  padding: 0.75rem 1rem;
}
</style>
