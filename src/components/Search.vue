<template>
  <section>
    <SearchHeader :title="title" />
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <p v-if="loading" class="loading" aria-live="polite">Searching...</p>
    <Albums v-if="albums.length > 0" :albums="albums" />
    <NoResults v-else />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAlbumStore } from '@/stores/albumStore';
import Albums from '@/components/Albums.vue';
import NoResults from '@/components/NoResults.vue';
import SearchHeader from '@/components/SearchHeader.vue';

defineProps<{
  title: string;
}>();

const store = useAlbumStore();
const route = useRoute();
const { albums, searchTerm, error, loading } = storeToRefs(store);

onMounted(() => {
  const q = typeof route.query.search === 'string' ? route.query.search : undefined;
  const media = typeof route.query.media === 'string' ? route.query.media : undefined;

  if (q) {
    store.getQueryStrings(q, media);
    store.getAlbums();
  } else if (searchTerm.value) {
    store.getAlbums();
  }
});
</script>

<style scoped>
.error {
  color: #c00;
  font-weight: 700;
  margin: 1rem 0;
}

.loading {
  margin: 1rem 0;
  opacity: 0.75;
}
</style>
