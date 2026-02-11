<template>
  <section>
    <SearchHeader :has-query-param="hasQueryParam" :title="title" />
    <Albums v-if="albums.length > 0" :albums="albums" />
    <NoResults v-else />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
const { albums, searchTerm } = storeToRefs(store);
const hasQueryParam = ref(false);

onMounted(() => {
  if (searchTerm.value) {
    store.updateRoutes();
  } else {
    const { q, media } = route.query as { q?: string; media?: string };
    store.getQueryStrings(q, media);
    if (q) hasQueryParam.value = true;
  }
});
</script>
