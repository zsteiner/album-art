<template>
  <svg class="icon" viewBox="0 0 24 24">
    <use :xlink:href="`symbol-defs.svg#icon-${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: String,
  },
};
</script>

<style scoped>
.icon {
  fill: currentcolor;
  height: 1em;
  position: relative;
  width: 1em;
}
</style>
