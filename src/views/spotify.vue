<template>
  <article>
    <Search v-bind:title="title" v-if="spotifyAuth"></Search>
    <SpotifyAuth v-else></SpotifyAuth>
  </article>
</template>

<script>
import { mapState } from 'vuex';

import Search from '@/components/Search.vue';
import SpotifyAuth from '@/components/SpotifyAuth.vue';

export default {
  name: 'spotify',
  computed: {
    ...mapState({
      spotifyAuth: state => state.spotifyAuth,
    }),
  },
  data() {
    return {
      title: 'Spotify Search',
    };
  },
  components: {
    Search,
    SpotifyAuth,
  },
};
</script>
