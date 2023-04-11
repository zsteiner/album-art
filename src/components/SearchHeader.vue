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
    <button @click="submitSearch" type="button" class="button">search</button>
    <TypeSelector v-if="service === 'itunes'" :onChange="submitSearch" />
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Icon from '@/components/Icon.vue';
import TypeSelector from '@/components/TypeSelector.vue';

export default {
  name: 'SearchHeader',

  components: {
    Icon,
    TypeSelector,
  },
  props: {
    hasQueryParam: Boolean,
    title: { type: String, default: '' },
  },

  computed: {
    ...mapState(['searchTerm', 'madeSearch', 'media', 'service']),
  },

  mounted() {
    if (this.shouldUpdate && this.searchTerm) {
      this.submitSearch();
    }
  },

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

  watch: {
    hasQueryParam: function watch(value) {
      if (value) {
        this.submitSearch();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: grid;
  margin-bottom: 2rem;
  align-items: start;
  grid-template:
    'header-heading header-heading header-heading' auto
    'header-label . .' auto
    'header-input header-input header-button' auto
    'header-selector header-selector header-selector' auto /
    auto 1fr 5rem;
  grid-column-gap: 1rem;

  @include respond-to(medium) {
    grid-template:
      'header-heading header-heading header-heading header-heading header-heading' auto
      'header-label header-input header-button . header-selector' auto /
      auto minmax(15rem, 1fr) 5rem 1fr auto;
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
  width: 100%;
  padding: 0.75rem;
  border: 0.0625rem solid lightgrey;
  grid-column-gap: 1rem;
  box-shadow: none;
  grid-area: header-input;

  &-label {
    margin: 0.625rem 0;
    grid-area: header-label;
  }
}

.button {
  padding: 0.75rem 1rem;
  background: none;
  background: $blue;
  color: white;
  font-size: 1rem;
  line-height: 1;
  border: 0;
  grid-area: header-button;
}
</style>
