<template>
  <svg class="icon" viewBox="0 0 24 24">
    <use v-bind:xlink:href="'symbol-defs.svg#icon-' + icon"></use>
  </svg>
</template>

<script>
export default {
  props: {
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  height: 1em;
  width: 1em;
  fill: currentColor;
}
</style>
