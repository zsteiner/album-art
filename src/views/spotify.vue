<template>
  <article>
    <Search v-bind:title="title" v-if="spotifyAuth"></Search>
    <SpotifyAuth v-else></SpotifyAuth>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Search from '@/components/Search.vue';
import SpotifyAuth from '@/components/SpotifyAuth.vue';

export default {
  name: 'spotify',
  computed: {
    ...mapState(['spotifyAuth']),
  },
  data() {
    return {
      title: 'Spotify Search',
    };
  },
  methods: {
    ...mapActions(['checkLocalStorageAuth', 'setService', 'getQueryStrings']),
  },
  mounted() {
    this.setService('spotify');
    this.checkLocalStorageAuth();
    const { q, media } = this.$route.query;
    this.getQueryStrings({ q, media });
  },
  components: {
    Search,
    SpotifyAuth,
  },
};
</script>
