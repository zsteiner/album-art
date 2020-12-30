<template>
  <main class="app">
    <nav class="nav">
      <router-link to="/" exact> <Icon :icon="'home'" />Home </router-link>
      <router-link to="/itunes" class="itunes"> <Icon :icon="'itunes'" />iTunes </router-link>
      <router-link to="/spotify" class="spotify"> <Icon :icon="'spotify'" />Spotify </router-link>
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

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  margin: 0;
}

.app {
  padding: 1rem;
  color: $blue;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.itunes .icon {
  color: $itunes;
}

.spotify .icon {
  color: $spotify;
}

.nav {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 1.5rem 0;
  text-align: center;

  a {
    color: $blue;
    opacity: 0.35;
    text-decoration: none;

    &:not(:last-child) {
      margin-right: 2rem;
    }

    &.router-link-active,
    &.router-link-exact-active {
      font-weight: 700;
      opacity: 1;
    }

    .icon {
      bottom: -0.25em;
      margin-right: 0.25em;
      font-size: 1.25em;
    }
  }
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
</style>
