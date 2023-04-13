<template>
  <article class="spotify-success">
    <h1 class="heading">
      Now logged in to Spotify.
    </h1>
    <h2>Getting to those sweet, sweet pictures ...</h2>
    <p class="message">
      Still sitting here?
    </p>
    <router-link to="/spotify">
      Search Spotify
    </router-link>
  </article>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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

  mounted() {
    this.setSpotifyAuth(this.accessToken);
    this.setService('spotify');

    setTimeout(() => {
      this.$router.push({ name: 'spotify' });
    }, 2000);
  },

  methods: {
    ...mapActions(['setSpotifyAuth', 'setService']),
  },
};
</script>

<style scoped>
.spotify-success {
  text-align: center;
}

.heading {
  font-size: 2.5rem;
}

.message {
  margin-block-end: 1rem;
}
</style>
