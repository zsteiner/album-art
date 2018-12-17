<template>
  <ul class="albums">
    <li v-for="album in albums" :key="album.id" class="album-item">
      <Artwork :album="album"></Artwork>
    </li>
  </ul>
</template>

<script>
import Artwork from './Artwork';

export default {
  name: 'Albums',
  props: {
    albums: Array
  },
  components: {
    Artwork
  }
};
</script>

<style lang="sass">
@import './Albums'
</style>
