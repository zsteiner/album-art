<template>
  <main class="app">
    <nav class="nav">
      <router-link
        class="link"
        to="/"
        exact
      >
        <Icon :icon="'home'" />Home
      </router-link>
      <router-link
        to="/itunes"
        class="link itunes"
      >
        <Icon :icon="'itunes'" />iTunes
      </router-link>
      <router-link
        to="/spotify"
        class="link spotify"
      >
        <Icon :icon="'spotify'" />Spotify
      </router-link>
    </nav>
    <router-view />
  </main>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon,
  },
};
</script>

<style>
:root {
  --font-family: -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen, ubuntu, cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  --blue: hsl(200deg 60% 30%);
  --green: hsl(120deg 60% 50%);
  --itunes: #f25f77;
  --spotify: #1ed760;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  margin: 0;
}

figure {
  margin: 0;
  padding: 0;
}

object {
  display: none;
}

p {
  margin: 0;
}

.itunes .icon {
  color: var(--itunes);
}

.spotify .icon {
  color: var(--spotify);
}
</style>

<style scoped>
.app {
  color: var(--blue);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}

.nav {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 1.5rem 0;
  text-align: center;
}

.link {
  color: var(--blue);
  opacity: 0.35;
  text-decoration: none;
}
.link:not(:last-child) {
  margin-inline-end: 2rem;
}

.link.router-link-active,
.link.router-link-exact-active {
  font-weight: 700;
  opacity: 1;
}

.link .icon {
  font-size: 1.25em;
  inset-block-end: -0.25em;
  margin-inline-end: 0.25em;
}
</style>
