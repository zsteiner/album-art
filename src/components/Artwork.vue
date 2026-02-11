<template>
  <div>
    <figure class="artwork">
      <img :src="album.coverMedRes" :alt="album.title" loading="lazy" />
      <button
        class="copy-button"
        :aria-label="`Copy ${album.title} artwork to clipboard`"
        :disabled="copyState === 'copying'"
        @click="copyImage"
      >
        {{ copyEmoji }}
      </button>
    </figure>
    <time class="album-date" :datetime="album.releaseDate">
      {{ formatDate(album.releaseDate) }}
    </time>
    <h2 class="album-title">{{ album.title }}</h2>
    <p class="artist">{{ album.artist }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Album } from '@/types/album';
import copyImageToClipboard from '@/utils/copyImageToClipboard';
import formatDate from '@/utils/formatDate';

const props = defineProps<{
  album: Album;
}>();

const copyState = ref<'idle' | 'copying' | 'copied' | 'error'>('idle');

const copyEmoji = computed(() => {
  switch (copyState.value) {
    case 'copying':
      return '\u23F3';
    case 'copied':
      return '\u2705';
    case 'error':
      return '\u274C';
    default:
      return '\uD83D\uDCCB';
  }
});

async function copyImage() {
  copyState.value = 'copying';
  try {
    await copyImageToClipboard(props.album.coverHighRes);
    copyState.value = 'copied';
  } catch {
    copyState.value = 'error';
  } finally {
    setTimeout(() => {
      copyState.value = 'idle';
    }, 2000);
  }
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

.copy-button {
  background: rgb(0 0 0 / 60%);
  border: none;
  border-radius: 0.375rem;
  bottom: 0.5rem;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  opacity: 0;
  padding: 0.375rem;
  position: absolute;
  right: 0.5rem;
  transition: opacity 0.2s;
  z-index: 1;
}

.copy-button:focus-visible,
.artwork:hover .copy-button {
  opacity: 1;
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
