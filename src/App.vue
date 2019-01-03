<template>
  <main class="app">
    <nav class="nav">
      <router-link to="/" exact>
        <Icon :icon="'home'"/>Home
      </router-link>
      <router-link to="/itunes" class="itunes">
        <Icon :icon="'itunes'"/>iTunes
      </router-link>
      <router-link to="/spotify" class="spotify">
        <Icon :icon="'spotify'"/>Spotify
      </router-link>
    </nav>
    <router-view/>
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
@import './styles/variables';

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
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
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  a {
    display: inline-block;
    margin: 0 0.5rem;
    color: $blue;
    opacity: 0.35;
    text-decoration: none;

    &.router-link-active,
    &.router-link-exact-active {
      font-weight: 700;
      opacity: 1;
    }

    .icon {
      bottom: -0.25em;
      margin-right: 0.3em;
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
