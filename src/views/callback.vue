<template>
  <article>
    <h1>Spotify is go.</h1>
  </article>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      accessToken: this.$route.hash,
    };
  },
  methods: {
    ...mapActions(['setSpotifyAuth']),
  },
  mounted() {
    this.setSpotifyAuth(this.accessToken);
  },
};
</script>
