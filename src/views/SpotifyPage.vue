<template>
  <article>
    <Search v-if="spotifyAuth" :title="title" />
    <SpotifyAuth v-else />
  </article>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAlbumStore } from '@/stores/albumStore';
import Search from '@/components/Search.vue';
import SpotifyAuth from '@/components/SpotifyAuth.vue';

const store = useAlbumStore();
const route = useRoute();
const { spotifyAuth } = storeToRefs(store);
const title = 'Spotify Search';

store.setService('spotify');
store.checkLocalStorageAuth();

const { q, media } = route.query as { q?: string; media?: string };
store.getQueryStrings(q, media);
</script>
