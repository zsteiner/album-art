<template>
  <footer v-if="show">
    <p v-if="showSuccess" v-bind:class="{ active: showSuccess }" class="success">✅ image copied</p>
    <button class="copy" @click="onClick">✂️ copy image</button>
  </footer>
</template>

<script>
export default {
  name: 'ArtworkControls',
  props: {
    showSuccess: Boolean,
    onClick: Function,
    show: Boolean,
  },
};
</script>
