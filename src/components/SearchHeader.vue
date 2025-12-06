<template>
  <header class="header">
    <h1 :class="`heading ${service}`">
      <Icon :icon="service" />
      {{ title }}
    </h1>
    <label for="search" class="input-label" aria-label="search">Search</label>
    <input
      id="search"
      class="input"
      :value="searchTerm"
      type="text"
      placeholder="Search for album"
      aria-labelledby="search"
      @input="updateSearch"
      @keyup.enter="submitSearch"
    />
    <button class="button" @click="submitSearch">search</button>
    <TypeSelector v-if="service === 'itunes'" :on-change="submitSearch" />
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
    title: { type: String, required: true },
  },

  computed: {
    ...mapState(['searchTerm', 'madeSearch', 'media', 'service']),
  },
  watch: {
    hasQueryParam: function watch(value) {
      if (value) {
        this.submitSearch();
      }
    },
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
};
</script>

<style scoped>
.header {
  align-items: start;
  column-gap: 1rem;
  display: grid;
  grid-template:
    'header-heading header-heading header-heading' auto
    'header-label . .' auto
    'header-input header-input header-button' auto
    'header-selector header-selector header-selector' auto /
    auto 1fr 5rem;
  margin-bottom: 2rem;
}

@media (width >= 52rem) {
  .header {
    grid-template:
      'header-heading header-heading header-heading header-heading header-heading' auto
      'header-label header-input header-button . header-selector' auto /
      auto minmax(15rem, 1fr) 5rem 1fr auto;
  }
}

.itunes .icon {
  color: var(--itunes);
}

.spotify .icon {
  color: var(--spotify);
}

.heading {
  font-size: 2rem;
  font-weight: 900;
  grid-area: header-heading;
  margin: 0 0 1rem;
}

.heading .icon {
  bottom: -0.125em;
  margin-right: 0.25em;
}

.input {
  border: 0.0625rem solid lightgrey;
  box-shadow: none;
  column-gap: 1rem;
  grid-area: header-input;
  padding: 0.75rem;
  width: 100%;
}

.input-label {
  grid-area: header-label;
  margin: 0.625rem 0;
}

.button {
  background: none;
  background: var(--blue);
  border: 0;
  color: white;
  font-size: 1rem;
  grid-area: header-button;
  line-height: 1;
  padding: 0.75rem 1rem;
}
</style>
