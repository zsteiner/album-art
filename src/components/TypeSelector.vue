<template>
  <div class="type-selector">
    <label
      v-for="selector in mediaTypes"
      :key="selector.value"
      :for="selector.value"
      class="selector"
    >
      <input
        :id="selector.value"
        v-model="media"
        type="radio"
        name="entities"
        :value="selector.value"
      />
      <span :title="selector.label">
        <Icon :icon="selector.value" />
        <small class="icon-label">{{ selector.label }}</small>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumStore } from '@/stores/albumStore';
import type { MediaType } from '@/types/album';
import Icon from '@/components/Icon.vue';

const store = useAlbumStore();

const media = computed({
  get: () => store.media,
  set: (value: MediaType) => store.setMedia(value),
});

const mediaTypes = [
  { value: 'music', label: 'Music' },
  { value: 'movie', label: 'Movies' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'tvShow', label: 'TV Shows' },
  { value: 'ebook', label: 'Ebook' },
  { value: 'all', label: 'All' },
];
</script>

<style>
.type-selector {
  display: flex;
  grid-area: header-selector;
  justify-content: space-between;
  margin-top: 1rem;
}

@media (width >= 52rem) {
  .type-selector {
    margin: 0;
  }
}

.selector {
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  text-align: center;
}

.selector:not(:last-child) {
  margin-right: 2rem;
}

.selector input {
  position: absolute;
  visibility: hidden;
}

.selector input:checked {
  & + span {
    color: var(--green);
  }
}

.icon {
  fill: currentcolor;
  height: auto;
  width: 1em;
}

.icon-label {
  display: block;
  font-size: 0.75rem;
}
</style>
