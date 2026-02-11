<template>
  <h2 v-if="madeSearch" class="no-results">Sorry Can't Find Anything</h2>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAlbumStore } from '@/stores/albumStore';

const { madeSearch } = storeToRefs(useAlbumStore());
</script>

<style>
.no-results {
  margin: 2rem 0;
  opacity: 0.75;
}
</style>
