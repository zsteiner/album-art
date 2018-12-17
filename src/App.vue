<template>
  <div id="app">
    <div id="nav">
      <router-link to="/itunes">iTunes</router-link>
      <router-link to="/spotify">Spotify</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/variables";

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
}

#app {
  width: 100%;
  padding: 1rem;
  color: $blue;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  a {
    display: inline-block;
    margin: 0 0.5rem;
    color: $blue;
    text-decoration: none;

    &.router-link-exact-active {
      color: $green;
    }
  }
}

figure {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
}
</style>
