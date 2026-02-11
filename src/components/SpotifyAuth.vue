<template>
  <section class="spotify">
    <p class="auth-help">To search Spotify you need to login.</p>
    <button class="spotify-button" @click="store.getSpotifyAuth">Login to Spotify</button>
  </section>
</template>

<script setup lang="ts">
import { useAlbumStore } from '@/stores/albumStore';

const store = useAlbumStore();
</script>

<style scoped>
.spotify {
  margin: 2rem;
  text-align: center;
}

.auth-help {
  margin: 1rem 0;
}

.spotify-button {
  background: var(--spotify);
  border: 0;
  color: white;
  font-size: 1rem;
  padding: 1rem;
}
</style>
