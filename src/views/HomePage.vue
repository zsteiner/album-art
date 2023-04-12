<template>
  <article class="home">
    <router-link to="/itunes" class="home-icon itunes">
      <Icon :icon="'itunes'" />
      <span class="label">Search iTunes</span>
    </router-link>
    <router-link to="/spotify" class="home-icon spotify">
      <Icon :icon="'spotify'" />
      <span class="label">Search Spotify</span>
    </router-link>
  </article>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  created() {
    const query = { ...this.$route.query };
    delete query.q;
    delete query.media;
    this.$router.replace({ query });
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.home {
  margin: 3rem 0;
  text-align: center;
  justify-content: space-around;
}

@media (min-width: 52rem) {
  .home {
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
}

.label {
  display: block;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
