<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">iTunes</router-link>|
      <router-link to="/spotify">Spotify</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/variables";

#app {
  color: #2c3e50;
  text-align: center;
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 2rem;

  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
