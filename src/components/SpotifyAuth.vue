<template>
  <section class="spotify">
    <p class="auth-help">To search Spotify you need to login.</p>
    <button @click="getSpotifyAuth" class="spotify-button">Login to Spotify</button>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SpotifyAuth',
  methods: {
    ...mapActions(['getSpotifyAuth']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.spotify {
  margin: 2rem;
  text-align: center;
}

.auth-help {
  margin: 1rem 0;
}

.spotify-button {
  padding: 1rem;
  background: $spotify;
  color: white;
  font-size: 1rem;
  border: 0;
}
</style>
