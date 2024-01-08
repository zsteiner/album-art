<template>
  <ul class="albums">
    <li v-for="(album, index) in albums" :key="`${index}-${album.id}`" class="album-item">
      <Artwork :album="album" />
    </li>
  </ul>
</template>

<script>
import Artwork from './Artwork.vue';

export default {
  name: 'Albums',
  props: {
    albums: { type: Array, default: () => [] },
  },
  components: {
    Artwork,
  },
};
</script>

<style scoped>
.albums {
  display: grid;
  grid-gap: 3rem 2rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
