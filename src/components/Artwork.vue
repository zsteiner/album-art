<template>
  <div>
    <figure class="artwork">
      <img :src="album.coverMedRes" :alt="album.title" loading="lazy" />
    </figure>
    <time class="album-date" :datetime="album.releaseDate">
      {{ formatDate(album.releaseDate) }}
    </time>
    <h2 class="album-title">{{ album.title }}</h2>
    <p class="artist">{{ album.artist }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Album } from '@/types/album';

defineProps<{
  album: Album;
}>();

function formatDate(releaseDate: string): string {
  return new Date(releaseDate).toLocaleDateString('en-us', { year: 'numeric' });
}
</script>

<style>
.artwork {
  background-color: silver;
  border: 0.0625rem solid silver;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  padding-top: 100%;
  position: relative;
}

.artwork img {
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
}

@media (width >= 70rem) {
  .artwork {
    font-size: 1.5rem;
  }
}

.album-title {
  font-size: 0.875em;
  margin: 0 0 0.5rem;
}

.album-date {
  display: block;
  font-size: 0.625em;
  margin: 0 0 0.5rem;
  opacity: 0.75;
}

.artist {
  font-size: 0.75em;
  margin: 0.5rem 0;
}
</style>
