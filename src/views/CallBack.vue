<template>
  <article class="spotify-success">
    <h1 class="spotify-success__heading">Now logged in to Spotify.</h1>
    <h2>Getting to those sweet, sweet pictures ...</h2>
    <p>Still sitting here?</p>
    <router-link to="/spotify">Search Spotify</router-link>
  </article>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlbumStore } from '@/stores/albumStore';

const route = useRoute();
const router = useRouter();
const store = useAlbumStore();
const accessToken = route.hash;

onMounted(() => {
  store.setSpotifyAuth(accessToken);
  store.setService('spotify');

  setTimeout(() => {
    router.push({ name: 'spotify' });
  }, 2000);
});
</script>

<style scoped>
.spotify-success {
  text-align: center;
}

.spotify-success__heading {
  font-size: 2.5rem;
}

.spotify-success p {
  margin-bottom: 1rem;
}
</style>
