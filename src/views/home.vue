<template>
  <article class="home">
    <router-link to="/itunes" class="home-icon">
      <svg class="icon" viewBox="0 0 24 24">
        <use xlink:href="symbol-defs.svg#icon-applemusic"></use>
      </svg>
      <label>Search iTunes</label>
    </router-link>
    <router-link to="/spotify" class="home-icon">
      <svg class="icon" viewBox="0 0 24 24">
        <use xlink:href="symbol-defs.svg#icon-spotify"></use>
      </svg>
      <label>Search Spotify</label>
    </router-link>
  </article>
</template>

<script>
export default {
  created() {
    const query = Object.assign({}, this.$route.query);
    delete query.q;
    delete query.media;
    this.$router.replace({ query });
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.home {
  margin: 3rem 0;
  text-align: center;
  justify-content: space-around;

  @include respond-to(medium) {
    display: flex;
  }
}

.home-icon {
  display: block;
  margin: 3rem 0;
  padding: 0 2rem;
  color: grey;
  font-size: 8rem;
  border: 0;
  text-decoration: none;

  label {
    display: block;
    font-size: 1.25rem;
    cursor: pointer;
  }
}
</style>
