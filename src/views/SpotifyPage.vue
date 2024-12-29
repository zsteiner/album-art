<template>
  <article>
    <Search v-if="spotifyAuth" :title="title" />
    <SpotifyAuth v-else />
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Search from '@/components/Search.vue';
import SpotifyAuth from '@/components/SpotifyAuth.vue';

export default {
  name: 'SpotifyPage',
  components: {
    Search,
    SpotifyAuth,
  },
  data() {
    return {
      title: 'Spotify Search',
    };
  },
  computed: {
    ...mapState(['spotifyAuth']),
  },
  created() {
    this.setService('spotify');
    this.checkLocalStorageAuth();
    const { q, media } = this.$route.query;
    this.getQueryStrings({ q, media });
  },
  methods: {
    ...mapActions(['checkLocalStorageAuth', 'setService', 'getQueryStrings']),
  },
};
</script>
