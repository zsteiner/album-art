<template>
  <header class="header">
    <h1 class="heading itunes">
      <Icon icon="itunes" aria-hidden="true" />
      {{ title }}
    </h1>
    <label for="search" class="input-label">Search</label>
    <input
      id="search"
      class="input"
      :value="searchTerm"
      type="text"
      placeholder="Search for album"
      @input="updateSearch"
      @keyup.enter="submitSearch"
    />
    <button class="button" @click="submitSearch">search</button>
    <TypeSelector />
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAlbumStore } from '@/stores/albumStore';
import Icon from '@/components/Icon.vue';
import TypeSelector from '@/components/TypeSelector.vue';

defineProps<{
  title: string;
}>();

const store = useAlbumStore();
const { searchTerm } = storeToRefs(store);

function submitSearch() {
  store.getAlbums();
}

function updateSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  store.setSearchTerm(target.value);
}
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
  background-color: var(--input-bg);
  border: 0.0625rem solid var(--input-border);
  box-shadow: none;
  color: var(--text);
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
  background: var(--blue);
  border: 0;
  color: var(--button-text);
  font-size: 1rem;
  grid-area: header-button;
  line-height: 1;
  padding: 0.75rem 1rem;
}
</style>
