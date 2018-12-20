<template>
  <button @click="getSpotifyAuth">Login to Spotify</button>
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
