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

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Icon from '@/components/Icon.vue';

const route = useRoute();
const router = useRouter();

const query = { ...route.query };
delete query.q;
delete query.media;
router.replace({ query });
</script>

<style scoped>
.home {
  justify-content: space-around;
  margin: 3rem 0;
  text-align: center;
}

@media (width >= 52rem) {
  .home {
    display: flex;
  }
}

.home-icon {
  border: 0;
  color: grey;
  display: block;
  font-size: 8rem;
  margin: 3rem 0;
  padding: 0 2rem;
  text-decoration: none;
}

.label {
  cursor: pointer;
  display: block;
  font-size: 1.25rem;
}
</style>
