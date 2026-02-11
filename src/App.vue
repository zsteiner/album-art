<template>
  <main class="app">
    <router-view />
  </main>
</template>

<script setup lang="ts"></script>

<style>
:root {
  --font-family:
    -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen, ubuntu, cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  --blue: hsl(200deg 60% 30%);
  --green: hsl(120deg 60% 50%);
  --itunes: #f25f77;
  --bg: #fff;
  --input-bg: #fff;
  --input-border: lightgrey;
  --button-text: #fff;
  --text: var(--blue);
  --small: 24rem;
  --medium: 52rem;
  --large: 70rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a2e;
    --blue: hsl(200deg 60% 70%);
    --green: hsl(120deg 60% 50%);
    --itunes: #f78a9a;
    --input-bg: hsl(200deg 20% 15%);
    --input-border: hsl(200deg 20% 30%);
    --button-text: hsl(200deg 20% 10%);
    --text: hsl(200deg 20% 85%);
  }
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  background-color: var(--bg);
  box-sizing: border-box;
  margin: 0;
}

.app {
  color: var(--text);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}

.itunes .icon {
  color: var(--itunes);
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
