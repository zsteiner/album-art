<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
  >
    <use :xlink:href="'symbol-defs.svg#icon-' + icon" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: '' },
  },
};
</script>

<style scoped>
.icon {
  block-size: 1em;
  fill: currentColor;
  inline-size: 1em;
  position: relative;
}
</style>
