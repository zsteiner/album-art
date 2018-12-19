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

<style lang="sass">
@import './Albums'
</style>
