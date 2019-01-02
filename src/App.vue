<template>
  <main class="app">
    <nav class="nav">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/itunes">iTunes</router-link>
      <router-link to="/spotify">Spotify</router-link>
    </nav>
    <router-view/>
  </main>
</template>

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

.nav {
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  a {
    display: inline-block;
    margin: 0 0.5rem;
    color: $blue;
    text-decoration: none;

    &.router-link-active,
    &.router-link-exact-active {
      color: $green;
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
