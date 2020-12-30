<template>
  <ul class="albums">
    <li v-for="(album, index) in albums" :key="`${index}-${album.id}`" class="album-item">
      <Artwork :album="album"></Artwork>
    </li>
  </ul>
</template>

<script>
import Artwork from './Artwork.vue';

export default {
  name: 'Albums',
  props: {
    albums: Array,
  },
  components: {
    Artwork,
  },
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.albums {
  display: grid;
  width: 100%;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-row-gap: 3rem;
  grid-column-gap: 2rem;
  list-style: none;
}
</style>
