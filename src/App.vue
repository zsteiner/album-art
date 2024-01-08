<template>
  <main class="app">
    <router-view />
  </main>
</template>

<script lang="ts">
export default {
  name: 'App',
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
  --small: 24rem;
  --medium: 52rem;
  --large: 70rem;
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

.nav a {
  color: var(--blue);
  opacity: 0.35;
  text-decoration: none;
}

.nav a:not(:last-child) {
  margin-right: 2rem;
}

.nav a.router-link-active,
.nav a.router-link-exact-active {
  font-weight: 700;
  opacity: 1;
}

nav a .icon {
  bottom: -0.25em;
  font-size: 1.25em;
  margin-right: 0.25em;
}

.itunes .icon {
  color: var(--itunes);
}

.spotify .icon {
  color: var(--spotify);
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
