<template>
  <section class="spotify">
    <p class="auth-help">
      To search Spotify you need to login.
    </p>
    <button
      type="button"
      class="spotify-button"
      @click="getSpotifyAuth"
    >
      Login to Spotify
    </button>
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

<style scoped>
.spotify {
  margin: 2rem;
  text-align: center;
}

.auth-help {
  margin: 1rem 0;
}

.spotify-button {
  background: var(--spotify);
  border: 0;
  color: white;
  font-size: 1rem;
  padding: 1rem;
}
</style>
