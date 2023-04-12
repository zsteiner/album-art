<template>
  <header class="header">
    <h1 :class="'heading ' + service">
      <Icon :icon="service" />
      {{ title }}
    </h1>
    <label
      for="search"
      class="input-label"
      aria-label="search"
    >Search</label>
    <input
      id="search"
      class="input"
      :value="searchTerm"
      type="text"
      placeholder="Search for album"
      aria-labelledby="search"
      @input="updateSearch"
      @keyup.enter="submitSearch"
    >
    <button
      type="button"
      class="button"
      @click="submitSearch"
    >
      search
    </button>
    <TypeSelector
      v-if="service === 'itunes'"
      :on-change="submitSearch"
    />
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
  display: grid;
  grid-column-gap: 1rem;
  grid-template:
    'header-heading header-heading header-heading' auto
    'header-label . .' auto
    'header-input header-input header-button' auto
    'header-selector header-selector header-selector' auto /
    auto 1fr 5rem;
  margin-block-end: 2rem;
}

@media (min-width: 52rem) {
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

  .icon {
    inset-block-end: -0.125em;
    margin-inline-end: 0.25em;
  }
}

.input {
  border: 0.0625rem solid lightgrey;
  box-shadow: none;
  grid-area: header-input;
  grid-column-gap: 1rem;
  inline-size: 100%;
  padding: 0.75rem;
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
