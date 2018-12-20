<template>
  <article>
    <h1>Spotify is go.</h1>
  </article>
</template>

<script>
export default {
  data() {
    return {
      accessToken: this.$route,
    };
  },
  mounted() {
    console.log('accessToken', this.accessToken);
  },
};
</script>
