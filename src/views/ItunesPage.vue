<template>
  <article>
    <Search :title="title" />
  </article>
</template>

<script setup lang="ts">
import { useAlbumStore } from '@/stores/albumStore';
import Search from '@/components/Search.vue';

const store = useAlbumStore();
const title = 'iTunes Search';

store.setService('itunes');
</script>
