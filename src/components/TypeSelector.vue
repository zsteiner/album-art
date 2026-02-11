<template>
  <fieldset class="type-selector" aria-label="Media type">
    <label
      v-for="selector in mediaTypes"
      :key="selector.value"
      :for="selector.value"
      class="selector"
    >
      <input
        :id="selector.value"
        v-model="media"
        class="sr-only"
        type="radio"
        name="entities"
        :value="selector.value"
      />
      <span :title="selector.label">
        <Icon :icon="selector.value" />
        <small class="icon-label">{{ selector.label }}</small>
      </span>
    </label>
  </fieldset>
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
  border: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  grid-area: header-selector;
  margin-top: 1rem;
  padding: 0;
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


.sr-only {
  clip-path: inset(50%);
  height: 0.0625rem;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 0.0625rem;
}

.sr-only:checked + span {
  color: var(--green);
}

.sr-only:focus-visible + span {
  outline: 0.125rem solid var(--blue);
  outline-offset: 0.25rem;
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
