<template>
  <ul class="albums">
    <li
      v-for="(album, index) in albums"
      :key="`${index}-${album.id}`"
      class="album-item"
    >
      <Artwork :album="album" />
    </li>
  </ul>
</template>

<script>
import Artwork from './Artwork.vue';

export default {
  name: 'Albums',
  components: {
    Artwork,
  },
  props: {
    albums: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
.albums {
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 3rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  inline-size: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
