<template>
  <article class="spotify-success">
    <h1 class="spotify-success__heading">Now logged in to Spotify.</h1>
    <h2>Getting to those sweet, sweet pictures ...</h2>
    <p>Still sitting here?</p>
    <router-link to="/spotify">Search Spotify</router-link>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CallBackPage',
  data() {
    return {
      accessToken: this.$route.hash,
    };
  },
  computed: {
    ...mapState({
      searchTerm: (state) => state.searchTerm,
      media: (state) => state.media,
    }),
  },
  methods: {
    ...mapActions(['setSpotifyAuth', 'setService']),
  },
  mounted() {
    this.setSpotifyAuth(this.accessToken);
    this.setService('spotify');

    setTimeout(() => {
      this.$router.push({ name: 'spotify' });
    }, 2000);
  },
};
</script>

<style scoped>
.spotify-success {
  text-align: center;
}

.spotify-success__heading {
  font-size: 2.5rem;
}

.spotify-success p {
  margin-bottom: 1rem;
}
</style>
